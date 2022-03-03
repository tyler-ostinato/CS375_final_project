let startEnabled=false;
let timerID

document.getElementById("start").addEventListener("click",startHandler);
document.getElementById("stop").addEventListener("click",stopHandler);
let timeHolder = document.getElementById("timerHolder");
let time = 0.00;
spaceHeldFor=0;
holdDelay=1; //how long user holds space before timer triggered
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
            timeHolder.textContent="0.00";
            if(!spaceHeld){
                timerDelay();
                spaceHeld=true;
            }
        }
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
        timeHolder.classList.remove("redTimer");
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
    timeHolder.textContent=time.toFixed(2);
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