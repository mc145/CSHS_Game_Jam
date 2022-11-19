
let w = 1200; 
let h = 1200;

let openBoundaryColor = [0,0,0]; 
let allLines = []; 
let openLines = []; 
let mazeLines = []; 

let tot = 20; 
let cells = []; 
let visited = []; 
for(let i = 0; i<tot; i++){
    let temp = []; 
    let temp2 = []; 
    for(let j = 0; j<tot; j++){
        temp.push(j); 
        temp2.push(false); 
    }
    cells.push(temp); 
    visited.push(temp2); 
}



function setup(){
    createCanvas(w,h);
    
    background(0); 
    fill(0); 
    stroke(0); 
    strokeWeight(1); 
    for(let i = 0; i<tot; i++){
        for(let j = 0; j<tot; j++){
            rect(w/tot * i, h/tot * j, w/tot, h/tot); 
        }
    }

    stroke(255,0,0); 
    strokeWeight(2);
    for(let i = 0; i<=w-w/tot; i+=w/tot){
        for(let j = 0; j<=h-h/tot; j+=h/tot){
            line(i,j,i + w/tot, j); 
            allLines.push([i/(w/tot),j/(h/tot), (i+w/tot)/(w/tot), j/(h/tot)]); 
        }
    }

    for(let i = 0; i<=h-h/tot; i+=h/tot){
        for(let j = 0; j<=w-w/tot; j+=w/tot){
            line(j,i,j, i + h/tot); 
            allLines.push([j/(w/tot),i/(h/tot),j/(w/tot), (i + h/tot)/(h/tot)]); 
        }
    }

    mazeDriver(); 

    let common = false; 
    for(let i = 0; i<allLines.length; i++){
        common = false; 
        for(let j = 0; j<openLines.length; j++){
            if(allLines[i][0] == openLines[j][0] && allLines[i][1] == openLines[j][1] && allLines[i][2] == openLines[j][2] && allLines[i][3] == openLines[j][3]){
                common = true; 
                break; 
            }
        }
        if(!common){
            mazeLines.push(allLines[i]); 
        }

    }


    
    // save(mazeLines, 'maze.txt')


}

function draw(){
}




function mazeDriver(){

    let startingCellX = 0; 
    let startingCellY = tot-1; 
    generateMaze(startingCellX, startingCellY); 
    
}


function generateMaze(currentCellX, currentCellY){
    visited[currentCellX][currentCellY] = true; 
    while(cellNeighbors(currentCellX, currentCellY).length != 0){
        let allNeighbors = cellNeighbors(currentCellX, currentCellY); 
        let whichNeighbor = Math.floor(random(0, allNeighbors.length)); 

        if(allNeighbors[whichNeighbor][0] == -1){
            stroke(openBoundaryColor); 
            strokeWeight(2); 
            line(currentCellX * w/tot, currentCellY * h/tot, currentCellX * w/tot, (currentCellY+1) * h/tot); 
           openLines.push([currentCellX, currentCellY, currentCellX, currentCellY + 1]); 
        }
       if(allNeighbors[whichNeighbor][0] == 1){
            stroke(openBoundaryColor); 
            strokeWeight(2); 
            line((currentCellX + 1)* w/tot, currentCellY * h/tot, (currentCellX + 1) * w/tot, (currentCellY+1) * h/tot); 
            openLines.push([currentCellX + 1, currentCellY, currentCellX + 1, currentCellY + 1]); 
        }
       if(allNeighbors[whichNeighbor][1] == 1){
            stroke(openBoundaryColor); 
            strokeWeight(2); 
            line((currentCellX)* w/tot, (currentCellY+1) * h/tot, (currentCellX + 1) * w/tot, (currentCellY+1) * h/tot); 
            openLines.push([currentCellX, currentCellY + 1, currentCellX + 1, currentCellY + 1]); 
        }
        if(allNeighbors[whichNeighbor][1] == -1){
            stroke(openBoundaryColor); 
            strokeWeight(2); 
            line((currentCellX)* w/tot, (currentCellY) * h/tot, (currentCellX+1) * w/tot, (currentCellY) * h/tot); 
            openLines.push([currentCellX, currentCellY, currentCellX + 1, currentCellY]); 
        }

        generateMaze(currentCellX + allNeighbors[whichNeighbor][0], currentCellY + allNeighbors[whichNeighbor][1]); 
        visited[currentCellX + allNeighbors[whichNeighbor][0]][currentCellY + allNeighbors[whichNeighbor][1]] = true; 
    }

}


function cellNeighbors(currentCellX, currentCellY){
    let unvisitedNeighbors = []; 
    if((currentCellX - 1 >=0 && visited[currentCellX-1][currentCellY] == false)){
        unvisitedNeighbors.push([-1,0]); 
    }
    if((currentCellX + 1 <=tot-1 && visited[currentCellX+1][currentCellY] == false)){
        unvisitedNeighbors.push([1,0]); 
    }
    if((currentCellY - 1 >= 0 && visited[currentCellX][currentCellY - 1] == false)){
        unvisitedNeighbors.push([0,-1]); 
    }
    if((currentCellY + 1 <= tot-1 && visited[currentCellX][currentCellY + 1] == false)){
        unvisitedNeighbors.push([0,1]); 
    }

    return unvisitedNeighbors; 
}


function mousePressed(){
    console.log(mouseX, mouseY); 
}