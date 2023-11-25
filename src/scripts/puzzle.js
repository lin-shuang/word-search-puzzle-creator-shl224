// puzzle.js
// Class: CSE 264 - Fall 2022
// Author: Shuang Lin
// Usage: node puzzle.js <number of rows and columns in puzzle> <file with list of words>
// The program will read in the words from the file and uppercase them. It will then create a square
// grid of the specified dimensions and place each word in the grid at a random starting point and
// one of eight random directions. It will print the list of words, followed by an answer key with
// just the placed words in the grid and finally the actual puzzle with random letters filled in.

/*
* Update: 11/23/2023
* Independent from node.js and uploadable word files with display in HTML.
*/

/* Node.js
//Loads the node file system module
const fs = require("fs");
const { exit } = require("process");
const { parseArgs, getSystemErrorMap } = require("util");

//Returns the contents of the file filename as a single string
function readTextFile(filename) {
  return fs.readFileSync(filename, "utf-8");
}
*/

//randomNum(1,10) will return a random integer from 1 to 10 inclusive
const randomNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

//8 Directions (indexes for 5674*0321)
const deltaRow = [0, 1, 1, 1, 0, -1, -1, -1];
const deltaColumn = [1, 1, 0, -1, -1, -1, 0, 1];

//Start of program ////////////////////////////////////////////////////////////
//take user input

/* Node.js
let size = 0;
let fileName = 0;
if (process.argv.length === 4) {
  size = parseInt(process.argv[2]);
  fileName = process.argv[3];
}
else {
  console.log("Error, invalid input. Quitting...")
  exit();
}

//split input by new line and sort by length descending
let fileWord = readTextFile(fileName);
let fileLines = fileWord.split("\n").sort((a, b) => b.length - a.length);

//capitalize words, remove lineb breaks, map and replace original
fileLines = fileLines.map(fileLines => fileLines.toUpperCase().replace(/(\r\n|\n|\r)/gm,""));
*/

/* Web input Update */
// Size
let sizeInput = document.getElementById('size');
let sizeValue = document.getElementById('size-value');
// initial size
let size = 10;
sizeValue.textContent = size;
sizeInput.value = size;
sizeInput.addEventListener('input', () => { // Set num to slider
  sizeValue.textContent = sizeInput.value;
  size = sizeInput.value;
});
sizeValue.addEventListener('input', () => { // Set limit on max val
  sizeValue.textContent = sizeInput.value;
  size = sizeInput.value;
});
// Words
let wordsInput = document.getElementById('words');
let fileLines = "";
wordsInput.addEventListener('input', () => {
  fileLines = wordsInput.value
    .replaceAll(',', '') // Remove all commas
    .replace(/[^A-Za-z,]/g, ' ') // Replace non-letter characters w/ spaces
    .replace(/\s+/g, ' ') // Replace spaces with single space
    .toUpperCase() // Uppercase all letters
    .split(' '); // Split by single space
  //console.log(fileLines); // Log the array of words
});

let createButton = document.getElementById('button-create');
let boardElement = document.getElementById('game-board');
let boardInfo = document.getElementById('info-board');
createButton.addEventListener('click', () => {

  // Clear the board
  boardElement.innerHTML = "";

  // check if there are words
  if(fileLines.length > 0){

    // Clear error message
    boardInfo.textContent = ""

    //check if word can fit on board, at least the size
    if(fileLines[0].length-1 > size){
      boardInfo.textContent = "Error, word length exceeding board size.";
      exit(1);
    }

    //create puzzle board with size
    let board = [];
    for (let i = 0; i < size; i++) {
      board[i] = [];

      for(let j = 0; j < size; j++){
        board[i][j] = "*";
      }
    }

    //Inserting Words /////////////////////////////////////////////////////
      let direction = 0;
      let coordRow = 0;
      let coordCol = 0;
      let checkCoordRow = 0;
      let checkCoordCol = 0;
      let wordIndex = 0;
      let wordFit = false;
      let tries = 0;

      //increment through words list
      for(wordIndex = 0; wordIndex < fileLines.length; wordIndex++){
        wordFit = false;
        tries = 0;
        while(!wordFit){
          coordRow = randomNum(0, size-1);
          coordCol = randomNum(0, size-1);
          checkCoordRow = coordRow;
          checkCoordCol = coordCol;
          
          while(!wordFit){

            direction = randomNum(0, 7);

            //pretending to place words
            for(let i = 0; i < fileLines[wordIndex].length; i){

              //check if coordinates exceeds board size, -1 to size because coordiante index start at 0
              if((checkCoordRow > size-1) || (checkCoordRow < 0)){
                //choose new direction and reset coordinates
                direction++;
                checkCoordRow = coordRow;
                checkCoordCol = coordCol;
                i = 0;
              }
              if((checkCoordCol > size-1) || (checkCoordCol < 0)){
                //choose new direction and reset coordinates
                direction++;
                checkCoordRow = coordRow;
                checkCoordCol = coordCol;
                i = 0;
              }

              //if all directions tried, choose new starting point
              if(direction > 7){
                direction = 0;
                coordRow = randomNum(0, size-1);
                coordCol = randomNum(0, size-1);
                checkCoordRow = coordRow;
                checkCoordCol = coordCol;
                tries++;

                //if all coordinates tried, quit and print error
                if(tries == Math.pow(size, 3)){
                  boardInfo.textContent = "Error, all coordinates failed. Try again, or choose a bigger size.";
                  exit(1);
                }
              }
              //continue to next char if empty space or common interception
              if((board[checkCoordRow][checkCoordCol] == "*") ||
              (fileLines[wordIndex][i] == board[checkCoordRow][checkCoordCol])){
                i++;
                //pretend to place letters on the board
                checkCoordRow += deltaRow[direction];
                checkCoordCol += deltaColumn[direction];
              }
              //if uncommon interception or space taken, change direction and reset coordinates
              else{
                direction++;
                checkCoordRow = coordRow;
                checkCoordCol = coordCol;
                i = 0;
              }
            }
            wordFit = true;
          }
        }
      
        //placing word, increment through word, one char at a time
        for(let i = 0; i < fileLines[wordIndex].length; i++){

          board[coordRow][coordCol] = fileLines[wordIndex][i];
          
          //use delta directions to decide whether to add or subtract from original coordinate
          coordRow += deltaRow[direction];
          coordCol += deltaColumn[direction];
        }
    }

    //fill in empty stars, *, with random letters
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for(let i = 0; i < size; i++) {
      for(let j = 0; j < size; j++){
        if(board[i][j] == "*"){
          board[i][j] = alphabet[randomNum(0, alphabet.length-1)];
        }
      }
    }

    /* Node.js
    // finally, print puzzle board with comma separators replaced by spaces
    console.log("Puzzle Board:\n");
    for(let i = 0; i < size; i++) {
      console.log(board[i].join(" "), "\n");
    }
    */

    // Print board
    // Loop through the board array and add each letter to the table element
    for (var i = 0; i < board.length; i++) {
      var rowEl = document.createElement('tr');
      for (var j = 0; j < board[i].length; j++) {
        var cellEl = document.createElement('td');
        cellEl.innerText = board[i][j];
        rowEl.appendChild(cellEl);
      }
      boardElement.appendChild(rowEl);
    }
  }
  else{
    boardInfo.textContent = "Please input words...";
  }
});