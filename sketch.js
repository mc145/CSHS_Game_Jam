let w =  1400; 
let h = 1400;

let tot = 20; 

let curX = 0; 
let curY = tot-1; 
let allMazeLines = mazeVals; 
let correctMazeLines; 
let linesforCollision = []; 

let addedBoundaries = []; 
let clack, goldCoins;  

let amount = 7; 
let totalScore = 0; 

let checkOnce = false; 

let goldCoords = []; 
let top3Gold = []; 
let goldValues = []; 
function preload(){
    soundFormats('wav');
    clack = loadSound('clack');
    goldCoins = loadImage('gold_coins.png'); 
}



function setup(){
    createCanvas(w+500,h); 

    outputVolume(2); 
    for(let i = 0; i<amount; i++){
        goldCoords.push([Math.floor(random(0,tot)),Math.floor(random(0,tot))]); 
        goldValues.push(Math.floor(random(-10, 20))); 
    }

    for(let i = 0; i<goldValues.length; i++){
        top3Gold.push(goldValues[i]); 
    }
    top3Gold.sort(function(a, b){return a - b}); 
    console.log(top3Gold); 
    top3Gold.splice(0,amount-3); 
    console.log(top3Gold); 


}

function draw(){

    background(255); 
    fill(255,0,0); 
    correctMazeLines = processMazeLines(); 

    fill(0); 
    textSize(40); 
    text("Score: " + totalScore, w + 50, 100)
    stroke(0,0,0); 
    strokeWeight(2); 
    fill(255,0,0); 


    for(let i = 0; i<correctMazeLines.length; i++){
        line(correctMazeLines[i][0] * w/tot, correctMazeLines[i][1] * h/tot, correctMazeLines[i][2] * w/tot, correctMazeLines[i][3] * h/tot); 
        linesforCollision.push([correctMazeLines[i][0] * w/tot, correctMazeLines[i][1] * h/tot, correctMazeLines[i][2] * w/tot, correctMazeLines[i][3] * h/tot]); 
    }
    stroke(128,0,0); 
    strokeWeight(4); 
    for(let i = 0; i<addedBoundaries.length; i++){
        line(addedBoundaries[i][0] * w/tot,addedBoundaries[i][1] * h/tot, addedBoundaries[i][2] * w/tot, addedBoundaries[i][3] * h/tot); 
        linesforCollision.push([addedBoundaries[i][0] * w/tot, addedBoundaries[i][1] * h/tot, addedBoundaries[i][2] * w/tot, addedBoundaries[i][3] * h/tot]); 

    }

    noStroke(); 
    ellipse(convertCoord(curX,curY)[0] + 0.5 * w/tot, convertCoord(curX,curY)[1] + 0.5 * h/tot, w/tot - 30, h/tot - 30); 

    // let bla = checkGoldCollision(curX, curY);

    // if(bla){
    //     punishGreed(bla); 
    // }
    checkGoldCollision(curX, curY); 

    drawGold(); 
    drawFog(curX, curY); 
    if(!checkOnce){
    checkWin(curX, curY); 
}
}


function checkWin(x,y){
    if(x == tot - 1 && y == 0){
        totalScore+=8; 
        alert("YOU MADE IT, TOTAL SCORE IS " + totalScore); 
        checkOnce = true; 
        return; 
    }
}
function checkGoldCollision(curX, curY){
    let collided = false ;
    let whichCollided; 
    for(let i = 0; i<goldCoords.length; i++){
        if(goldCoords[i][0] == curX && goldCoords[i][1] == curY){
            collided = true; 
            whichCollided = i; 
        }

    } 

    if(!collided) return; 
    totalScore+=goldValues[whichCollided]; 
    
    let thingsToReturn = goldCoords[whichCollided]; 
    for(let i = 0; i<top3Gold.length; i++){
        if(top3Gold[i] == goldValues[whichCollided]){
            punishGreed(goldCoords[whichCollided], goldValues[whichCollided]); 
            break; 
        }
    }

    goldCoords.splice(whichCollided, 1); 
    goldValues.splice(whichCollided, 1);
    // return thingsToReturn; 
    
    
}

function punishGreed(coord){
    let leftOpen = true; 
    let rightOpen = true; 
    let upOpen = true; 
    let downOpen = true; 
    for(let i = 0; i<correctMazeLines.length; i++){
        if(correctMazeLines[i][0] == coord[0] && correctMazeLines[i][1] == coord[1] && correctMazeLines[i][2] == coord[0] && correctMazeLines[i][3] == coord[1] + 1){
            leftOpen = false; 
        }
        if(correctMazeLines[i][0] == coord[0] + 1 && correctMazeLines[i][1] == coord[1] && correctMazeLines[i][2] == coord[0] + 1  && correctMazeLines[i][3] == coord[1] + 1){
            rightOpen = false; 
        }
        if(correctMazeLines[i][0] == coord[0] && correctMazeLines[i][1] == coord[1] && correctMazeLines[i][2] == coord[0] + 1 && correctMazeLines[i][3] == coord[1]){
            upOpen = false; 
        }
        if(correctMazeLines[i][0] == coord[0] && correctMazeLines[i][1] == coord[1] + 1 && correctMazeLines[i][2] == coord[0] + 1 && correctMazeLines[i][3] == coord[1] + 1){
            downOpen = false; 
        }
    }
    let allParody = [leftOpen, rightOpen, upOpen, downOpen]; 

    let allOpen = []; 
    for(let i = 0; i< allParody.length; i++){
        if(allParody[i]){
            allOpen.push(i); 
        }
    }
    // 0 = left, 1 = right, 2 = up, 3 - down 
    let ranParody = Math.floor(random(0, allOpen.length)); 
    console.log(allOpen[ranParody])

    let convertedCoord = [coord[0], coord[1]]; 

    if(allOpen[ranParody] == 0){
        addedBoundaries.push([convertedCoord[0], convertedCoord[1], convertedCoord[0], convertedCoord[1] + 1]);
    }
    else if(allOpen[ranParody] == 1){
        addedBoundaries.push([convertedCoord[0] + 1, convertedCoord[1], convertedCoord[0] + 1, convertedCoord[1] + 1]);

    }
    else if(allOpen[ranParody] == 2){
       addedBoundaries.push([convertedCoord[0], convertedCoord[1], convertedCoord[0] + 1, convertedCoord[1]]);

    }
    else if(allOpen[ranParody] == 3){
       addedBoundaries.push([convertedCoord[0], convertedCoord[1] + 1, convertedCoord[0] + 1, convertedCoord[1] + 1]);
        
    }
    
}

function drawGold(){

    for(let i = 0; i<goldCoords.length; i++){
        let goldCoord = convertCoord(goldCoords[i][0], goldCoords[i][1]); 
        // image(goldCoins, goldCoord[0], goldCoord[1], w/tot, h/tot); 
        // rectMode(CENTER); 
        textSize(32); 
        textFont('Georgia'); 
        stroke(0,80,181); 
        fill(0,80,181); 
        text(goldValues[i], goldCoord[0] + 0.5 * w/tot - 20 , goldCoord[1] + 0.5 * h/tot, w/tot, h/tot); 
    }

}


function drawFog(curX, curY){
    // draw fog from 0 -> curX - 5, curX + 5 -> tot 
    noStroke(); 
    let boundaryDist = 6; 

    if(curX - boundaryDist >= 0){
        for(let i = 0; i<=curX - boundaryDist; i++){
            for(let j = 0; j<tot; j++){

           
            fill(0,0,0); 
            rect(convertCoord(i, j)[0] + 0.5 * w/tot, convertCoord(i, j)[1] + 0.5 * h/tot, w/tot, h/tot); 
        }
    } 
    }
    if(tot - curX >= boundaryDist){
        for(let i = curX + boundaryDist; i<tot; i++){
            for(let j = 0; j<tot; j++){
                fill(0);  
                rect(convertCoord(i,j)[0] + 0.5 * w/tot, convertCoord(i,j)[1] + 0.5 * h/tot, w/tot, h/tot); 
            }
        }
    }
    if(tot - curY >= boundaryDist){
        for(let i = curY + boundaryDist; i < tot; i++){
            for(let j = 0; j<tot; j++){

            fill(0); 
            rect(convertCoord(j,i )[0] + 0.5 * w/tot, convertCoord(j, i)[1] + 0.5 * h/tot, w/tot, h/tot); 
           }
        }
    }

    if(curY - boundaryDist >= 0){
        for(let i = 0; i<=curY - boundaryDist; i++){
            for(let j = 0; j<tot; j++){
                fill(0); 
                rect(convertCoord(j,i)[0] + 0.5 * w/tot, convertCoord(j, i)[1] + 0.5 * h/tot, w/tot, h/tot); 

            }
        }
    }
}


function keyPressed(){
    if(keyCode === UP_ARROW){
        if(!checkOuterCollisions(curX, curY, 0, -1)){
            curY-=1; 
        } 
        else{
            //play sound 
            clack.play(); 
        }
    }
    else if(keyCode === DOWN_ARROW){
        if(!checkOuterCollisions(curX, curY, 0, 1)){
            curY+=1; 
        }
        else{
            clack.play(); 
        }
    }
    else if(keyCode === LEFT_ARROW){
        if(!checkOuterCollisions(curX, curY, -1, 0)){
            curX-=1; 
        }
        else{
            clack.play(); 
        }
    }
    else if(keyCode === RIGHT_ARROW){
        if(!checkOuterCollisions(curX, curY, 1, 0)){
            curX+=1; 
        }
        else{
            clack.play(); 
        }
    }
}

function checkOuterCollisions(curX, curY, dx, dy){
    if(curX + dx < 0 || curX + dx >= tot){
        return true; 
    }
    if(curY + dy < 0 || curY + dy >= tot){
        return true; 
    }
    let potentialLine = []; 

    if(dx == 1){
        potentialLine.push((curX + 1) * w/tot, curY * h/tot, (curX + 1) * w/tot, (curY + 1) * h/tot); 

    }
    else if(dx == -1){
        potentialLine.push((curX) * w/tot, curY * h/tot, (curX) * w/tot, (curY + 1) * h/tot); 
    }
    else if(dy == 1){
        potentialLine.push((curX) * w/tot, (curY+1) * h/tot, (curX+1) * w/tot, (curY + 1) * h/tot); 
    }
    else if(dy == -1){
        potentialLine.push((curX) * w/tot, (curY) * h/tot, (curX+1) * w/tot, (curY) * h/tot); 
    }

    for(let i = 0; i<linesforCollision.length; i++){
        if(linesforCollision[i][0] == potentialLine[0] && linesforCollision[i][1] == potentialLine[1] && linesforCollision[i][2] == potentialLine[2] && linesforCollision[i][3] == potentialLine[3]){
            return true; 
        }
    }

    return false; 
}



function processMazeLines(){
    let temp = []; 
    for(let i = 0; i<allMazeLines.length; i+=4){
        temp.push([allMazeLines[i], allMazeLines[i+1], allMazeLines[i+2], allMazeLines[i+3]]); 

    }
    return temp; 
}

function convertCoord(x,y){
    return [x * w/tot, y * h/tot];
}

function mousePressed(){
    console.log(mouseX, mouseY); 
}
