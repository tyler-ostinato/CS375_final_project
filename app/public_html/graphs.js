// Retrieve times from database
// let getTimes = document.getElementById('get-times');

let bestOfThree = [];
let bestOfFive = [];
let bestOfTwelve = [];
let mostRecent = [];

let solve_iter=1;
let iter_array = [];

// function testAlert(){
//     alert("Working");
// }

// getTimes.addEventListener("click", retrieveTimes);

function retrieveTimes(){
    console.log("Retrieving times...");

    iter_array.push(solve_iter);
    // Counter the number of solves that have been done
    solve_iter++;

    fetch('/getTimes')
    .then(function(response){
        return response.json();
    })
    .then(jsonObject => {
        // Get most recent times
        let newObject = jsonObject.slice(0, 1);
        let total=0;
        for(let entry of newObject){
            total += entry.timer;
        }
        mostRecent.push(total.toFixed(2));

        // Get Bo3
        let newObject2 = jsonObject.slice(0, 3);
        let total2=0;
        for(let entry of newObject2){
            total2 += entry.timer;
        }
        bestOfThree.push(total2.toFixed(2));

        // Get Bo5
        let newObject3 = jsonObject.slice(0, 5);
        let total3=0;
        for(let entry of newObject3){
            total3 += entry.timer;
        }
        bestOfFive.push(total3.toFixed(2));

        // Get Bo12
        let newObject4 = jsonObject.slice(0, 12);
        let total4=0;
        for(let entry of newObject4){
            total4 += entry.timer;
        }
        bestOfTwelve.push(total4.toFixed(2));
    });

    // Update graph
    myChart.config.data.labels = iter_array;
    myChart.config.data.datasets[0].data = bestOfThree;
    myChart.config.data.datasets[1].data = bestOfFive;
    myChart.config.data.datasets[2].data = bestOfTwelve;
    myChart.config.data.datasets[3].data = mostRecent;
    myChart.update();
}

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
