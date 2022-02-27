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
    else if(move==="D"){
        return turnD(cubeState);
    }
    else if(move==="D'"){
        let newCube=cubeState;
        for(let i=0;i<3;i++){
            newCube=turnD(newCube);
        }
        return newCube;
    }
    else if(move==="D2"){
        let newCube=cubeState;
        for(let i=0;i<2;i++){
            newCube=turnD(newCube);
        }
        return newCube;
    }
    else if(move==="F"){
        return turnF(cubeState);
    }
    else if(move==="F'"){
        let newCube=cubeState;
        for(let i=0;i<3;i++){
            newCube=turnF(newCube);
        }
        return newCube;
    }
    else if(move==="F2"){
        let newCube=cubeState;
        for(let i=0;i<2;i++){
            newCube=turnF(newCube);
        }
        return newCube;
    }
    else if(move==="B"){
        return turnB(cubeState);
    }
    else if(move==="B'"){
        let newCube=cubeState;
        for(let i=0;i<3;i++){
            newCube=turnB(newCube);
        }
        return newCube;
    }
    else if(move==="B2"){
        let newCube=cubeState;
        for(let i=0;i<2;i++){
            newCube=turnB(newCube);
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

//R,L,F,B,U,D is all that is needed. 2X is handled by calling the function twice. X' is covered by calling it thrice
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
    for(let cubie=0;cubie<9;cubie++){
        if(cubie===0){
            newBlueFace.push(cubeState[0][8]);
        }
        else if(cubie===3){
            newBlueFace.push(cubeState[0][5]);
        }
        else if(cubie===6){
            newBlueFace.push(cubeState[0][2]);
        }
        else{
            newBlueFace.push(cubeState[4][cubie]);
        }
    }
    for(let cubie=0;cubie<9;cubie++){
        if(cubie===2){
            newYellowFace.push(cubeState[4][6]);
        }
        else if(cubie===5){
            newYellowFace.push(cubeState[4][3]);
        }
        else if(cubie===8){
            newYellowFace.push(cubeState[4][0]);
        }
        else{
            newYellowFace.push(cubeState[5][cubie]);
        }
        // newYellowFace.push(cubeState[5][cubie]);
        // newYellowFace.push(cubeState[5][cubie+1]);
        // newYellowFace.push(cubeState[4][cubie]);
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
    for(let cubie=0;cubie<9;cubie++){
        if(cubie===0){
            newWhiteFace.push(cubeState[4][8]);
        }
        else if(cubie===3){
            newWhiteFace.push(cubeState[4][5]);
        }
        else if(cubie===6){
            newWhiteFace.push(cubeState[4][2]);
        }
        else{
            newWhiteFace.push(cubeState[0][cubie]);
        }
    }
    for(let cubie=0;cubie<9;cubie++){
        if(cubie===2){
            newBlueFace.push(cubeState[5][6]);
        }
        else if(cubie===5){
            newBlueFace.push(cubeState[5][3]);
        }
        else if(cubie===8){
            newBlueFace.push(cubeState[5][0]);
        }
        else{
            newBlueFace.push(cubeState[4][cubie]);
        }
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
    let newYellowFace=cubeState[5];
    for(let cubie=0;cubie<9;cubie++){
        if(cubie<3){
            newOrangeFace.push(cubeState[2][cubie]);
        }
        else{
            newOrangeFace.push(cubeState[1][cubie]);
        }
    }
    for(let cubie=0;cubie<9;cubie++){
        if(cubie<3){
            newGreenFace.push(cubeState[3][cubie]);
        }
        else{
            newGreenFace.push(cubeState[2][cubie]);
        }
    }
    for(let cubie=0;cubie<9;cubie++){
        if(cubie<3){
            newRedFace.push(cubeState[4][cubie]);
        }
        else{
            newRedFace.push(cubeState[3][cubie]);
        }
    }
    for(let cubie=0;cubie<9;cubie++){
        if(cubie<3){
            newBlueFace.push(cubeState[1][cubie]);
        }
        else{
            newBlueFace.push(cubeState[4][cubie]);
        }
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
    return newCube;
}

function turnD(cubeState){
    let newCube=[]
    let yellowFace = cubeState[5];
    let newOrangeFace = [];
    let newYellowFace = [];
    let newBlueFace = [];
    let newRedFace = [];
    let newGreenFace = [];
    let newWhiteFace=cubeState[0];
    for(let cubie=0;cubie<9;cubie++){
        if(cubie<6){
            newOrangeFace.push(cubeState[1][cubie]);
        }
        else{
            newOrangeFace.push(cubeState[4][cubie]);
        }
    }
    for(let cubie=0;cubie<9;cubie++){
        if(cubie<6){
            newGreenFace.push(cubeState[2][cubie]);
        }
        else if(cubie){
            newGreenFace.push(cubeState[1][cubie]);
        }
    }
    for(let cubie=0;cubie<9;cubie++){
        if(cubie<6){
            newRedFace.push(cubeState[3][cubie]);
        }
        else{
            newRedFace.push(cubeState[2][cubie]);
        }
    }
    for(let cubie=0;cubie<9;cubie++){
        if(cubie<6){
            newBlueFace.push(cubeState[4][cubie]);
        }
        else{
            newBlueFace.push(cubeState[3][cubie]);
        }
    }
    for(let cubie=0;cubie<9;cubie++){
        newYellowFace.push(yellowFace[cubie+clockwise[cubie]]);
    }
    newCube.push(newWhiteFace);
    newCube.push(newOrangeFace);
    newCube.push(newGreenFace);
    newCube.push(newRedFace);
    newCube.push(newBlueFace);
    newCube.push(newYellowFace);
    return newCube;
}

function turnF(cubeState){
    let newCube=[]
    let greenFace = cubeState[2];
    let newOrangeFace = [];
    let newWhiteFace = [];
    let newYellowFace = [];
    let newRedFace = [];
    let newGreenFace = [];
    let newBlueFace=cubeState[4];
    for(let cubie=0;cubie<9;cubie++){
        if(cubie===2){
            newOrangeFace.push(cubeState[5][0]);
        }
        else if(cubie===5){
            newOrangeFace.push(cubeState[5][1]);
        }
        else if(cubie===8){
            newOrangeFace.push(cubeState[5][2]);
        }
        else{
            newOrangeFace.push(cubeState[1][cubie]);
        }
    }
    for(let cubie=0;cubie<9;cubie++){
        if(cubie>2){
            newYellowFace.push(cubeState[5][cubie]);
        }
        else if(cubie===0){
            newYellowFace.push(cubeState[3][6]);
        }
        else if(cubie===1){
            newYellowFace.push(cubeState[3][3]);
        }
        else if(cubie===2){
            newYellowFace.push(cubeState[3][0]);
        }
    }
    for(let cubie=0;cubie<9;cubie++){
        if(cubie===0){
            newRedFace.push(cubeState[0][6]);
        }
        else if(cubie===3){
            newRedFace.push(cubeState[0][7]);
        }
        else if(cubie===6){
            newRedFace.push(cubeState[0][8]);
        }
        else{
            newRedFace.push(cubeState[3][cubie]);
        }
    }
    for(let cubie=0;cubie<9;cubie++){
        if(cubie<6){
            newWhiteFace.push(cubeState[0][cubie]);
        }
        else if(cubie===6){
            newWhiteFace.push(cubeState[1][8]);
        }
        else if(cubie===7){
            newWhiteFace.push(cubeState[1][5]);
        }
        else if(cubie===8){
            newWhiteFace.push(cubeState[1][2]);
        }
    }
    for(let cubie=0;cubie<9;cubie++){
        newGreenFace.push(greenFace[cubie+clockwise[cubie]]);
    }
    newCube.push(newWhiteFace);
    newCube.push(newOrangeFace);
    newCube.push(newGreenFace);
    newCube.push(newRedFace);
    newCube.push(newBlueFace);
    newCube.push(newYellowFace);
    return newCube;
}

function turnB(cubeState){
    let newCube=[]
    let blueFace = cubeState[4];
    let newOrangeFace = [];
    let newWhiteFace = [];
    let newYellowFace = [];
    let newRedFace = [];
    let newBlueFace = [];
    let newGreenFace=cubeState[2];
    for(let cubie=0;cubie<9;cubie++){
        if(cubie===0){
            newOrangeFace.push(cubeState[0][2]);
        }
        else if(cubie===3){
            newOrangeFace.push(cubeState[0][1]);
        }
        else if(cubie===6){
            newOrangeFace.push(cubeState[0][0]);
        }
        else{
            newOrangeFace.push(cubeState[1][cubie]);
        }
    }
    for(let cubie=0;cubie<9;cubie++){
        if(cubie<6){
            newYellowFace.push(cubeState[5][cubie]);
        }
        else if(cubie===6){
            newYellowFace.push(cubeState[1][0]);
        }
        else if(cubie===7){
            newYellowFace.push(cubeState[1][3]);
        }
        else if(cubie===8){
            newYellowFace.push(cubeState[1][6]);
        }
    }
    for(let cubie=0;cubie<9;cubie++){
        if(cubie===2){
            newRedFace.push(cubeState[5][8]);
        }
        else if(cubie===5){
            newRedFace.push(cubeState[5][7]);
        }
        else if(cubie===8){
            newRedFace.push(cubeState[5][6]);
        }
        else{
            newRedFace.push(cubeState[3][cubie]);
        }
    }
    for(let cubie=0;cubie<9;cubie++){
        if(cubie>2){
            newWhiteFace.push(cubeState[0][cubie]);
        }
        else if(cubie===0){
            newWhiteFace.push(cubeState[3][2]);
        }
        else if(cubie===1){
            newWhiteFace.push(cubeState[3][5]);
        }
        else if(cubie===2){
            newWhiteFace.push(cubeState[3][8]);
        }
    }
    for(let cubie=0;cubie<9;cubie++){
        newBlueFace.push(blueFace[cubie+clockwise[cubie]]);
    }
    newCube.push(newWhiteFace);
    newCube.push(newOrangeFace);
    newCube.push(newGreenFace);
    newCube.push(newRedFace);
    newCube.push(newBlueFace);
    newCube.push(newYellowFace);
    return newCube;
}