// Retrieve times from database
let bestOfThree = [NaN, NaN];
let bestOfFive = [NaN, NaN, NaN, NaN];
let bestOfTwelve = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
let mostRecent = [];
let timeArray = [];
let solve_iter=1;
let iter_array = [];
const labels = iter_array;

const data = {
    labels: labels,
    datasets: [
      {
        label: 'Best of 3',
        data: bestOfThree,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'Best of 5',
        data: bestOfFive,
        borderColor: 'rgb(0,191,255)',
        backgroundColor: 'rgb(0,191,255)',
      },
      {
        label: 'Best of 12',
        data: bestOfFive,
        borderColor: 'rgb(75,0,130)',
        backgroundColor: 'rgb(75,0,130)',
      },
      {
        label: 'Most Recent Solve',
        data: mostRecent,
        borderColor: 'rgb(211,211,211)',
        backgroundColor: 'rgb(211,211,211)',
      },
    ]
  };

const config = {
    type: 'line',
    data: data,
    // style: { width: "30%", height: "30%" },
    options: {
        responsive: true,
        scales: {y: { title: { display: true, text: 'seconds' }}},
        plugins: {
        title: {
            display: true,
            text: 'Time Trend',
        },
        },
        scales: {
        y: {
            type: 'linear',
            position: 'left',
            stack: 'demo',
            stackWeight: 2,
        }
        }
    },
};

const myChart = new Chart(
    document.getElementById('myChart'),
    config
);

async function updateChartAsync(){
    const response = await fetch("/getTimes");
    const jsonObject = await response.json();
    return jsonObject
}

// Async functions with fetch: https://dmitripavlutin.com/javascript-fetch-async-await/
function updateChart(){
    console.log("Retrieving times...");
    iter_array.push(solve_iter);
    // Counter the number of solves that have been done
    solve_iter++;
    updateChartAsync().then(jsonObject =>{

        if(mostRecent.length > 30){
            bestOfThree.shift();
            bestOfFive.shift();
            bestOfTwelve.shift();
            mostRecent.shift();
            iter_array.shift();
        }

        // Get most recent times
        let newObject = jsonObject.slice(0, 1);
        mostRecent.push((newObject[0].time).toFixed(2));

        // Get Bo3
        let newObject2 = jsonObject.slice(0, 3);
        let total2=0;
        for(let entry of newObject2){
            total2 += entry.time;
        }
        total2 = total2/3;
        if(jsonObject.length > 2){
            bestOfThree.push(total2.toFixed(2));
        }

        // Get Bo5
        let newObject3 = jsonObject.slice(0, 5);
        let total3=0;
        for(let entry of newObject3){
            total3 += entry.time;
        }
        total3 = total3/5;
        if(jsonObject.length > 4){
            bestOfFive.push(total3.toFixed(2));
        }

        // Get Bo12
        let newObject4 = jsonObject.slice(0, 12);
        let total4=0;
        for(let entry of newObject4){
            total4 += entry.time;
        }
        total4 = total4/12;
        if(jsonObject.length > 11){
            bestOfTwelve.push(total4.toFixed(2));
        }

        console.log("Updating graph...");
        myChart.config.data.labels = iter_array;
        myChart.config.data.datasets[0].data = bestOfThree;
        myChart.config.data.datasets[1].data = bestOfFive;
        myChart.config.data.datasets[2].data = bestOfTwelve;
        myChart.config.data.datasets[3].data = mostRecent;
        myChart.update();
    });
}