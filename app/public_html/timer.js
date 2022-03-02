// const express = require("express");

let sendButton = document.getElementById("send");

sendButton.addEventListener("click", function () {
    let curScramble = document.getElementById("scramble").textContent;
    let time = document.getElementById("time").value;
    let data = {"user": "Test","time": time, "scramble": curScramble, "date": Date.now()};
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
});


// Gen new scramble on button press
let newScramble = document.getElementById('gen-scramble');
let displayScramble = document.getElementById('scramble');

newScramble.addEventListener("click", function(){
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
        let randoTest = blankScramble;
        for(move of jsonObject.scramble){
            randoTest = scrambleStep(move, randoTest);
        }
        drawCubeState(randoTest);
    })
});
