//This program handles the visual drawing of a 2d flat cube, as well as the logic for moving the cube.
//For those unfamiliar with terminology used for variable naming and comments this page may be useful to view:
//https://rubikscube.info/concepts.php

let clockwise = [6,2,-2,4,0,-4,2,-2,-6];

function scrambleStep(move,cubeState){

    if(move==="R"){
        return turnR(cubeState);
    }
    else if(move==="R'"){
        let newCube=cubeState;
        for(let i=0;i<3;i++){
            newCube=turnR(newCube);
        }
        return newCube;
    }
    else if(move==="R2"){
        let newCube=cubeState;
        for(let i=0;i<2;i++){
            newCube=turnR(newCube);
        }
        return newCube;
    }
    else if(move==="L"){
        return turnL(cubeState);
    }
    else if(move==="L'"){
        let newCube=cubeState;
        for(let i=0;i<3;i++){
            newCube=turnL(newCube);
        }
        return newCube;
    }
    else if(move==="L2"){
        let newCube=cubeState;
        for(let i=0;i<2;i++){
            newCube=turnL(newCube);
        }
        return newCube;
    }
    else if(move==="U"){
        return turnU(cubeState);
    }
    else if(move==="U'"){
        let newCube=cubeState;
        for(let i=0;i<3;i++){
            newCube=turnU(newCube);
        }
        return newCube;
    }
    else if(move==="U2"){
        let newCube=cubeState;
        for(let i=0;i<2;i++){
            newCube=turnU(newCube);
        }
        return newCube;
    }

}
function initialState(){
    let faceColors=["W","O","G","R","B","Y"];
    let cube=[];
    for(let faces=0;faces<6;faces++){
        let curFace=[];
        for(let cubies=0;cubies<9;cubies++){
            curFace.push(faceColors[faces])
        }
        cube.push(curFace);
    }
    console.log(cube);
    return cube;
}
function drawCubeState(inputScramble){
    let white = "white"
    let orange = "orange"
    let green = "green"
    let red = "red"
    let blue = "blue"
    let yellow = "yellow"

    let cube=[];

    //color converter. potentially users can change face colors without incident. Allows HEX values (I'd imagine)
    for(const face of inputScramble){
        let curFace=[];
        for(const color of face){
            if(color==="W"){
                curFace.push(white)
            }
            else if(color==="O"){
                curFace.push(orange)
            }
            else if(color==="G"){
                curFace.push(green)
            }
            else if(color==="R"){
                curFace.push(red)
            }
            else if(color==="B"){
                curFace.push(blue)
            }
            else if(color==="Y"){
                curFace.push(yellow)
            }
        }
        cube.push(curFace);
    }
    // console.log(cube);
    let canvas = document.getElementById('2dCube');

    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        let cubieSize=35;
        let buffer = 10;

        //outline
        ctx.beginPath();
        ctx.rect(0, 0, (12*cubieSize)+(5*buffer), (9*cubieSize)+(4*buffer));
        ctx.stroke();
        ctx.lineWidth = 3;


        //white face
        let faceIndex=0;
        let cubieIndex=0
        for(let row=0;row<3;row++){
            for(let col=0;col<3;col++){
                ctx.beginPath();
                ctx.rect((2*buffer)+((col+3)*cubieSize), (row*cubieSize)+buffer, cubieSize, cubieSize);
                ctx.stroke();
                ctx.fillStyle = cube[faceIndex][cubieIndex];
                ctx.fill();
                cubieIndex++;
            }
        }
        faceIndex++;
        cubieIndex=0
        //orange face
        for(let row=0;row<3;row++){
            for(let col=0;col<3;col++){
                ctx.beginPath();
                ctx.rect((1*buffer)+((col+0)*cubieSize), ((row+3)*cubieSize)+(2*buffer), cubieSize, cubieSize);
                ctx.stroke();
                ctx.fillStyle = cube[faceIndex][cubieIndex];
                ctx.fill();
                cubieIndex++;
            }
        }

        faceIndex++;
        cubieIndex=0
        //green face
        for(let row=0;row<3;row++){
            for(let col=0;col<3;col++){
                ctx.beginPath();
                ctx.rect((2*buffer)+((col+3)*cubieSize), ((row+3)*cubieSize)+(2*buffer), cubieSize, cubieSize);
                ctx.stroke();
                ctx.fillStyle = cube[faceIndex][cubieIndex];
                ctx.fill();
                cubieIndex++;
            }
        }

        faceIndex++;
        cubieIndex=0
        //red face
        for(let row=0;row<3;row++){
            for(let col=0;col<3;col++){
                ctx.beginPath();
                ctx.rect((3*buffer)+((col+6)*cubieSize), ((row+3)*cubieSize)+(2*buffer), cubieSize, cubieSize);
                ctx.stroke();
                ctx.fillStyle = cube[faceIndex][cubieIndex];
                ctx.fill();
                cubieIndex++;
            }
        }

        faceIndex++;
        cubieIndex=0
        //blue face
        for(let row=0;row<3;row++){
            for(let col=0;col<3;col++){
                ctx.beginPath();
                ctx.rect((4*buffer)+((col+9)*cubieSize), ((row+3)*cubieSize)+(2*buffer), cubieSize, cubieSize);
                ctx.stroke();
                ctx.fillStyle = cube[faceIndex][cubieIndex];
                ctx.fill();
                cubieIndex++;
            }
        }

        faceIndex++;
        cubieIndex=0
        //yellow face
        for(let row=0;row<3;row++){
            for(let col=0;col<3;col++){
                ctx.beginPath();
                ctx.rect((2*buffer)+((col+3)*cubieSize), ((row+6)*cubieSize)+(3*buffer), cubieSize, cubieSize);
                ctx.stroke();
                ctx.fillStyle = cube[faceIndex][cubieIndex];
                ctx.fill();
                cubieIndex++;
            }
        }
        

        

        

        
    }

}

function turnR(cubeState){
    let newCube=[]
    let redFace = cubeState[3];
    let newRedFace = [];
    let newWhiteFace = [];
    let newBlueFace = [];
    let newYellowFace = [];
    let newGreenFace = [];
    let newOrangeFace=cubeState[1];
    for(let cubie=0;cubie<9;cubie+=3){
        newWhiteFace.push(cubeState[0][cubie]);
        newWhiteFace.push(cubeState[0][cubie+1]);
        newWhiteFace.push(cubeState[2][cubie+2]);
    }
    for(let cubie=0;cubie<9;cubie+=3){
        newBlueFace.push(cubeState[4][cubie]);
        newBlueFace.push(cubeState[4][cubie+1]);
        newBlueFace.push(cubeState[0][cubie+2]);
    }
    for(let cubie=0;cubie<9;cubie+=3){
        newYellowFace.push(cubeState[5][cubie]);
        newYellowFace.push(cubeState[5][cubie+1]);
        newYellowFace.push(cubeState[4][cubie+2]);
    }
    for(let cubie=0;cubie<9;cubie+=3){
        newGreenFace.push(cubeState[2][cubie]);
        newGreenFace.push(cubeState[2][cubie+1]);
        newGreenFace.push(cubeState[5][cubie+2]);
    }
    for(let cubie=0;cubie<9;cubie++){
        newRedFace.push(redFace[cubie+clockwise[cubie]]);
    }
    newCube.push(newWhiteFace);
    newCube.push(newOrangeFace);
    newCube.push(newGreenFace);
    newCube.push(newRedFace);
    newCube.push(newBlueFace);
    newCube.push(newYellowFace);
    console.log(newCube);
    return newCube;
}

function turnL(cubeState){
    let newCube=[]
    let orangeFace = cubeState[1];
    let newOrangeFace = [];
    let newWhiteFace = [];
    let newBlueFace = [];
    let newYellowFace = [];
    let newGreenFace = [];
    let newRedFace=cubeState[3];
    for(let cubie=0;cubie<9;cubie+=3){
        newWhiteFace.push(cubeState[4][cubie]);
        newWhiteFace.push(cubeState[0][cubie+1]);
        newWhiteFace.push(cubeState[0][cubie+2]);
    }
    for(let cubie=0;cubie<9;cubie+=3){
        newBlueFace.push(cubeState[5][cubie]);
        newBlueFace.push(cubeState[4][cubie+1]);
        newBlueFace.push(cubeState[4][cubie+2]);
    }
    for(let cubie=0;cubie<9;cubie+=3){
        newYellowFace.push(cubeState[2][cubie]);
        newYellowFace.push(cubeState[5][cubie+1]);
        newYellowFace.push(cubeState[5][cubie+2]);
    }
    for(let cubie=0;cubie<9;cubie+=3){
        newGreenFace.push(cubeState[0][cubie]);
        newGreenFace.push(cubeState[2][cubie+1]);
        newGreenFace.push(cubeState[2][cubie+2]);
    }
    for(let cubie=0;cubie<9;cubie++){
        newOrangeFace.push(orangeFace[cubie+clockwise[cubie]]);
    }
    newCube.push(newWhiteFace);
    newCube.push(newOrangeFace);
    newCube.push(newGreenFace);
    newCube.push(newRedFace);
    newCube.push(newBlueFace);
    newCube.push(newYellowFace);
    console.log(newCube);
    return newCube;
}

function turnU(cubeState){
    let newCube=[]
    let whiteFace = cubeState[0];
    let newOrangeFace = [];
    let newWhiteFace = [];
    let newBlueFace = [];
    let newRedFace = [];
    let newGreenFace = [];
    let newYellowFace=cubeState[3];
    for(let cubie=0;cubie<9;cubie++){
        if(cubie<3){
            newOrangeFace.push(cubeState[2][cubie]);
        }
        newOrangeFace.push(cubeState[1][cubie]);
        newOrangeFace.push(cubeState[1][cubie+1]);
        newOrangeFace.push(cubeState[1][cubie+2]);
    }
    for(let cubie=0;cubie<9;cubie++){
        newWhiteFace.push(whiteFace[cubie+clockwise[cubie]]);
    }
    newCube.push(newWhiteFace);
    newCube.push(newOrangeFace);
    newCube.push(newGreenFace);
    newCube.push(newRedFace);
    newCube.push(newBlueFace);
    newCube.push(newYellowFace);
    console.log(newCube);
    return newCube;
}