let startEnabled=false;
let timerID

document.getElementById("start").addEventListener("click",startHandler);
document.getElementById("stop").addEventListener("click",stopHandler);
let timeHolder = document.getElementById("timerHolder");
let time = 0.00;

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        spaceHandler();
    }
  })

function startHandler(){
    if(!startEnabled){
        time = 0.00;
        timerID=setInterval(timerUpdate,10);
        startEnabled=true;
    }
}
function stopHandler(){
    if(startEnabled){
        clearInterval(timerID);
        startEnabled=false;
    }
}

function spaceHandler(){
    if(startEnabled){
        clearInterval(timerID);
        startEnabled=false;
    }
    else{
        time = 0.00;
        timerID=setInterval(timerUpdate,10);
        startEnabled=true;
    }
}

function timerUpdate(){
    time+=.01;
    timeHolder.textContent=time.toFixed(2);
}