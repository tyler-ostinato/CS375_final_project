// Retrieve times from database
let getTimes = document.getElementById('get-times');

let bestOfThree = [];
let bestOfFive = [];
let bestOfTwelve = [];
let mostRecent = [];

let solve_iter=1;
let iter_array = [];

getTimes.addEventListener("click", function(){
    console.log("Retrieving times...");

    iter_array.push(solve_iter);
    // Counter the number of solves that have been done
    solve_iter++;

    fetch('/getBestOfThree')
    .then(function(response){
        return response.json();
    })
    .then(jsonObject => {
        let total=0;

        // Get rid of the zero placeholder to prevent errors
        if(jsonObject.length == 1 && jsonObject[0] == 0){
            bestOfThree.shift();
        }

        if(jsonObject.length > 2){
            for(let entry of jsonObject){
                total += entry.timer;
            }
            total = total/3;
            bestOfThree.push(total.toFixed(2));
        }
        else{
            console.log("Not enough entries for Bo3");
        }
    })

    fetch('/getBestOfFive')
    .then(function(response){
        return response.json();
    })
    .then(jsonObject => {
        let total=0;
        if(jsonObject.length > 4){
            for(let entry of jsonObject){
                total += entry.timer;
            }
            total = total/5;
            bestOfFive.push(total.toFixed(2));
        }
        else{
            console.log("Not enough entries for Bo5");
        }
    })

    fetch('/getBestOfTwelve')
    .then(function(response){
        return response.json();
    })
    .then(jsonObject => {
        let total=0;
        if(jsonObject.length > 11){
            for(let entry of jsonObject){
                total += entry.timer;
            }
            total = total/12;
            bestOfTwelve.push(total.toFixed(2));
        }
        else{
            console.log("Not enough entries for Bo11");
        }
    })

    fetch('/getMostRecent')
    .then(function(response){
        return response.json();
    })
    .then(jsonObject => {
        // console.log(jsonObject[0].timer);
        mostRecent.push((jsonObject[0].timer).toFixed(2));
    })

    // Update graph
    myChart.config.data.labels = iter_array;
    myChart.config.data.datasets[0].data = bestOfThree;
    myChart.config.data.datasets[1].data = bestOfFive;
    myChart.config.data.datasets[2].data = bestOfTwelve;
    myChart.config.data.datasets[3].data = mostRecent;
    myChart.update();
});

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
