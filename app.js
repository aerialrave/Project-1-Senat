const gameState = {
    board:[
    ['0','1','2','3','4','5','6','7','8','9'],
    ['0','1','2','3','4','5','6','7','8','9'],
    ['0','1','2','3','4','5','6','7','8','9']
      ],
      // 0 is black 1 is color
      sticks:[0,0,0,0],
      //win count
      p1Vics:0,
      p2Vics:0,
      won: false,
      winner: null,
      player:'p1',
      rollCounter:0 ,
          //may need a  value to queue consecutive actions allowed.
          // also to initialize the first action to be player 2 on only the last element on the first array
      startBoard(){
        this.board = [
          ['p1','p2','p1','p2','p1','p2','p1','p2','p1','p2'],
          ['0','1','2','3','4','5','6','7','8','9'],
          ['0','1','2','3','4','5','6','7','8','9']
        ];
        this.sticks = [0,0,0,0];
        this.winner = null;
        this.won = false;
        this.player = 'p2';
        this.rollCounter = 0;
        }

}

//goal set up board, players pieces,  gameState of no win or loss
gameState.startBoard();
 console.log(gameState.board);
console.log(gameState.board[0]);//returns row
console.log(gameState.board[0][0]);//returns element

 //console.log(gameState.sticks)
//functions for gamme piece interactions


//functions for special board interactions

// function for player swapping will use to alter screen
const playerSwap =() =>{
  if (gameState.player === 'p1'){
        gameState.player ='p2';
        }
        else{
          gameState.player ='p1';
        }

}

//functions for stick rolling
const stickRoll = () => {
  gameState.rollCounter -=1;
  if(gameState.rollCounter<0){
    gameState.rollCounter = 0;
  }
  for(let i = 0; i <= 3; i +=1){
    gameState.sticks[i] = Math.floor(Math.random() * Math.floor(2));
  }

}
//  function for evaluating stick rolls

const stickEval = () =>{

        let whiteCounter = 0;
    for (let i =0 ; i <= gameState.sticks.length; i+=1){
            if(gameState.sticks[i] === 1){
              whiteCounter +=1;
            }// end of stick checking
          }// end of loop

              if(whiteCounter=== 1){
                //move 1 space and re throw
                gameState.rollCounter = 1

                console.log("1 White!")
                return 1;
              }
              else if (whiteCounter === 2 ) {
                //move 2 spaces
                console.log("2 White!")
                  return 2;
              }

              else if (whiteCounter === 3 ) {
                // move 3 spaces
                console.log("3 White!")
                return 3;
              }
              else if(whiteCounter === 4 ){
                //move 4 & re roll
                console.log("All White!")
                gameState.rollCounter = 1;
                return 4;
              }
              else if(whiteCounter === 0){
                //move 6 and re roll
                console.log("All Black!")
                gameState.rollCounter = 1;
                return 6;
              }



}
/*
stickRoll();
console.log("gameState of sticks is "+gameState.sticks);
stickEval();

/*
stickRoll()
console.log(gameState.sticks);

*/
// controls movement of pieces on the board ?pass in array index? pass in sticks value
const pieceMove = () =>{

// make move counter equal to sticks

// IF selcted array is the first move across

// if the selcted array is the first array && last element move to last element of the second array

// if the selected array is the second move backwards though the elements.

// if the selected array is the second && first element move to the first element of the third array

// if the seleced array is the third move across until element 5 to 9 where special rules apply
}


//  can a piece swap places with another piece
const canSwap = () =>{

//given a given piece and a target piece

//check if the target piece is the same as the given piece OR check if the target piece has another of the same ahead once

// also check if the spot is a special location

//board [1][5], board[2][5], board[2][7], board[2][8] cant be attacked.

}
// can a piece pass a given row of 3 or more pieces,
const canPass = () =>{
  // if three or more pieces on the same array line are present they cant be passed
  // if it jumped to the next line it is allowed
}

// what to do on a land with a special property
const specialLand = () =>{
    // given a target location enact special rules

    //given


}

const writeBlank = ()=> {

}

// goal of traverseBoard is to be fed in 2 numbers that hold the 2 indexes and a set number of moves, after reaching the location, swap the values from origin to target location.
function traverseBoard(firstIndex, secondIndex, steps){
let stepsCopy = steps;
let plusOne = firstIndex+1;

let path = secondIndex + steps;
// now to use undefined to jump arrays
for (let r = secondIndex;r<= path; r+=1){// loops from 0 to moves one by 1


        if (gameState.board[firstIndex][r]!= undefined){// if the value inside is not undefined
        console.log(gameState.board[firstIndex][r]);// spit out what is inside
              stepsCopy -=1;//decriment the copy of move is by 1
              // if moves copy is equal to one here  swap from origin to  new location
                if (r===steps && gameState.board[firstIndex][r++]!= undefined){// if next spot is NOT undefined and steps is fully looped, log out the current indexes first and second
                  console.log("firstIndex :"+firstIndex +" r:"+ r);
                }

            }

else if (gameState.board[firstIndex][r]=== undefined) {//if we hit an undefined value
            console.log("undefined hit!");//hit confirm
            for(let e = 0;e <=stepsCopy-1; e++){// loop from the start of the next array in line
                console.log("next array is "+ gameState.board[plusOne][e]);//spit out the values contained in the next array
                console.log("the copy of moves is " + stepsCopy);//spit out the value of the copy
                if( e === stepsCopy-1){ // when the loop ends
                    console.log("current value is "+ plusOne + " " +e);
                    console.log("escape!");//console log just before the return statement to not loop again.
                    // swap from origin to array [index+1][e]
                  return 0;
                }
            }
          }

            }
}

//now ot test

traverseBoard(1,1,1);


function swapPiece(firstIndex,secondIndex,targFirst,targSecond){
          //setting temp  holder
        let tempo = gameState.board[targFirst][targSecond];
          //  value from first to target
    gameState.board[targFirst][targSecond] =    gameState.board[firstIndex][secondIndex];
          // value from temo to first
        gameState.board[firstIndex][secondIndex]= tempo;

}



//goal of WinCheck is to go through all 3 arrays for strings of p1 or p2

function winCheck(garray){
  console.log('win check');
let p1Win = false;
let p2Win = false;
debugger;
    if (garray[0].includes('p1') === false  && garray[1].includes('p1') === false && garray[2].includes('p1') === false ){
  p1Win = true;
  console.log (p1Win);
  console.log("P1 Wins");
      }
else if (garray[0].includes ('p2') === false  && garray[1].includes('p2')=== false && garray[2].includes('p2') === false){
  p2Win = true;
  console.log (p2Win);
  console.log("P2 Wins");
  }

}
