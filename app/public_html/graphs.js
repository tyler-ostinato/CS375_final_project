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

    // console.log(bestOfThree);
    // console.log(bestOfFive);
    // console.log(bestOfTwelve);

//     d3.select("svg").remove(); 
    
//     let xy_chart = d3_xy_chart()
//     .width(960)
//     .height(500)
//     .xlabel("Time (seconds)")
//     .ylabel("Number of Solves");

//     let svg = d3.select("body").append("svg")
//     .datum(data)
//     .call(xy_chart) ;   

//     // console.log(iter_array);
//     // console.log(bestOfThree);

    // Update graph
    myChart.config.data.labels = iter_array;
    myChart.config.data.datasets[0].data = bestOfThree;
    myChart.config.data.datasets[1].data = bestOfFive;
    myChart.config.data.datasets[2].data = bestOfTwelve;
    myChart.config.data.datasets[3].data = mostRecent;
    myChart.update();
});

// // Calculate Best of 3,5,12 and plot
// let data = [
//                 {solve_num: "Best of 3",
//                     x: iter_array,
//                     y: bestOfThree,
//                 },
//                 {solve_num: "Best of 5",
//                     x: iter_array,
//                     y: bestOfFive,
//                 },
//                 {solve_num: "Best of 12",
//                     x: iter_array,
//                     y: bestOfTwelve,
//                 },
//             ]

// // Ref to creating a scatter plot with D3.js: http://bl.ocks.org/crayzeewulf/9719255
// // let xy_chart = d3_xy_chart()
// //     .width(960)
// //     .height(500)
// //     .xlabel("X Axis")
// //     .ylabel("Y Axis") ;
// // let svg = d3.select("body").append("svg")
// //     .datum(data)
// //     .call(xy_chart) ;

// function d3_xy_chart() {
//     let width = 640,  
//         height = 480, 
//         xlabel = "X Axis Label",
//         ylabel = "Y Axis Label" ;
    
//     function chart(selection) {
//         selection.each(function(datasets) {
//         //
//         // Create the plot. 
//         //
//         let margin = {top: 20, right: 80, bottom: 30, left: 50}, 
//             innerwidth = width - margin.left - margin.right,
//             innerheight = height - margin.top - margin.bottom ;
        
//         let x_scale = d3.scale.linear()
//             .range([0, innerwidth])
//             .domain([ d3.min(datasets, function(d) { return d3.min(d.x); }), 
//                     d3.max(datasets, function(d) { return d3.max(d.x); }) ]) ;
        
//         let y_scale = d3.scale.linear()
//             .range([innerheight, 0])
//             .domain([ d3.min(datasets, function(d) { return d3.min(d.y); }),
//                     d3.max(datasets, function(d) { return d3.max(d.y); }) ]) ;

//         let color_scale = d3.scale.category10()
//             .domain(d3.range(datasets.length)) ;

//         let x_axis = d3.svg.axis()
//             .scale(x_scale)
//             .orient("bottom") ;

//         let y_axis = d3.svg.axis()
//             .scale(y_scale)
//             .orient("left") ;

//         let x_grid = d3.svg.axis()
//             .scale(x_scale)
//             .orient("bottom")
//             .tickSize(-innerheight)
//             .tickFormat("") ;

//         let y_grid = d3.svg.axis()
//             .scale(y_scale)
//             .orient("left") 
//             .tickSize(-innerwidth)
//             .tickFormat("") ;

//         let draw_line = d3.svg.line()
//             // .interpolate("basis")
//             .interpolate("linear")
//             .x(function(d) { return x_scale(d[0]); })
//             .y(function(d) { return y_scale(d[1]); }) ;

//         let svg = d3.select(this)
//             .attr("width", width)
//             .attr("height", height)
//             .append("g")
//             .attr("transform", "translate(" + margin.left + "," + margin.top + ")") ;
        
//         svg.append("g")
//             .attr("class", "x grid")
//             .attr("transform", "translate(0," + innerheight + ")")
//             .call(x_grid) ;

//         svg.append("g")
//             .attr("class", "y grid")
//             .call(y_grid) ;

//         // x-axis label
//         svg.append("g")
//             .attr("class", "x axis")
//             .attr("transform", "translate(0," + innerheight + ")") 
//             .call(x_axis)
//             .append("text")
//             .attr("dy", "-.71em")
//             .attr("x", innerwidth)
//             .style("text-anchor", "end")
//             // .style("stroke", "red")
//             .text(xlabel) ;
        
//         // y-axis label
//         svg.append("g")
//             .attr("class", "y axis")
//             .call(y_axis)
//             .append("text")
//             .attr("transform", "rotate(-90)")
//             .attr("y", 6)
//             .attr("dy", "0.71em")
//             .style("text-anchor", "end")
//             .text(ylabel) ;

//         let data_lines = svg.selectAll(".d3_xy_chart_line")
//             .data(datasets.map(function(d) {return d3.zip(d.x, d.y);}))
//             .enter().append("g")
//             .attr("class", "d3_xy_chart_line") ;
        
//         data_lines.append("path")
//             .attr("class", "line")
//             .attr("d", function(d) {return draw_line(d); })
//             .attr("stroke", function(_, i) {return color_scale(i);}) ;
        
//         data_lines.append("text")
//             .datum(function(d, i) { return {name: datasets[i].label, final: d[d.length-1]}; }) 
//             .attr("transform", function(d) { 
//                 return ( "translate(" + x_scale(d.final[0]) + "," + 
//                         y_scale(d.final[1]) + ")" ) ; })
//             .attr("x", 3)
//             .attr("dy", ".35em")
//             .attr("fill", function(_, i) { return color_scale(i); })
//             .text(function(d) { return d.name; }) ;
//         }) ;
//     }

//     chart.width = function(value) {
//         if (!arguments.length) return width;
//         width = value;
//         return chart;
//     };

//     chart.height = function(value) {
//         if (!arguments.length) return height;
//         height = value;
//         return chart;
//     };

//     chart.xlabel = function(value) {
//         if(!arguments.length) return xlabel ;
//         xlabel = value ;
//         return chart ;
//     } ;

//     chart.ylabel = function(value) {
//         if(!arguments.length) return ylabel ;
//         ylabel = value ;
//         return chart ;
//     } ;

//     return chart;
// }

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
