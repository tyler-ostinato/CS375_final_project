let resultsTable = document.getElementById("resultsTable");
let AOT12holder = document.getElementById("AO12");

function sendData(){
    let curScramble = document.getElementById("scramble").textContent;
    // Need to update this to actually use user values and shit
    let data = {"name": "", "time": time.toFixed(2), "date": Date.now(), "scramble": curScramble};
    console.log("Client sending this data to /timer:", data);
    fetch('/timer', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(function (response) {
        console.log(response);
    });
}

// Gen new scramble on button press
let displayScramble = document.getElementById('scramble');

function generateNewScramble(){
    console.log("Generating new scramble...");
    fetch('/scramble')
    .then(function(response){
        return response.json();
    })
    .then(jsonObject => {
        // Update scramble string on page
        let scrambleString = jsonObject.scramble;
        displayScramble.textContent = scrambleString.join(" ");

        // Update visualiser on page
        let blankScramble = initialState();
        let randoTest = blankScramble;  //we need better variable names lol
        for(move of jsonObject.scramble){
            randoTest = scrambleStep(move, randoTest);
        }
        drawCubeState(randoTest);
        console.log("Scramble generated");
    })
}

//logic for timer updating and send/receive 
let startEnabled=false;
let timerID

let timeHolder = document.getElementById("timerHolder");
let timerWhole = document.getElementById("timerWhole");
let timerDecimal = document.getElementById("timerDecimal");
let time = 0.00;
spaceHeldFor=0;
holdDelay=.55; //how long user holds space before timer triggered
spaceHeld=false;


document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        clearInterval(delayID);
        spaceHandler();
    }
  })
document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        if(!startEnabled){
            timerWhole.textContent="0";
            timerDecimal.textContent="00";
            if(!spaceHeld){
                timerDelay();
                spaceHeld=true;
            }
        }
        event.preventDefault();
    }
  })


function spaceHandler(){
    if(startEnabled){
        clearInterval(timerID);
        startEnabled=false;
        timeHolder.classList.remove("redTimer");
        generateNewScramble();
        sendData();
        updateChart();
        getLastTwelve();
    }
    else{
        if(spaceHeldFor.toFixed(2)==holdDelay){
            time = 0.00;
            timerID=setInterval(timerUpdate,10);
            startEnabled=true;
        }
        timeHolder.classList.remove("redTimer");
        timeHolder.classList.remove("greenTimer");
        spaceHeldFor=0;
        spaceHeld=false;
    }
}

function timerUpdate(){
    time+=.01;
    let newTime=time.toFixed(2).split(".");
    timerWhole.textContent=newTime[0];
    timerDecimal.textContent=newTime[1];
}

function timerDelay(){
    delayID=setInterval(colorUpdate,10);
}

function colorUpdate(){
    timeHolder.classList.add("redTimer");
    spaceHeldFor+=.01;
    if(spaceHeldFor.toFixed(2)==holdDelay){ //must be ==, not ===
        timeHolder.classList.remove("redTimer");
        timeHolder.classList.add("greenTimer");
        clearInterval(delayID);
    }
}


function removeChildren(element) { //This function, as well as code skeleton, from 5a solutions
	while (element.hasChildNodes()) {
		element.lastChild.remove();
	}
}

function getLastTwelve(){
    fetch('/getLastTwelve')
    .then(function(response){
        return response.json();
    }).then(function (response) {
        console.log(response);
        removeChildren(resultsTable);
        let index=1;
        let runningTot=0;
		for (let row of response) {
            console.log(row);
			let tableRow = document.createElement("tr");
            let cell1 = document.createElement("td");
            let cell2 = document.createElement("td");
            cell1.textContent = index;
            cell2.textContent = row["time"];
            tableRow.append(cell1);
            tableRow.append(cell2);
            index++;
            runningTot+=row["time"];
			
			resultsTable.append(tableRow);
		}
        
        AOT12holder.textContent=(runningTot/12).toFixed(2)/1;
    })
}

generateNewScramble();
getLastTwelve();
