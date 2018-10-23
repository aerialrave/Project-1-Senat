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
        }

}

//goal set up board, players pieces,  gameState of no win or loss
/*gameState.startBoard();
 console.log(gameState.board);
 console.log(gameState.sticks);*/
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
                console.log("1 White!")
              }
              else if (whiteCounter === 2 ) {
                //move 2 spaces
                console.log("2 White!")
              }

              else if (whiteCounter === 3 ) {
                // move 3 spaces
                console.log("3 White!")
              }
              else if(whiteCounter === 4 ){
                //move 4 & re roll
                console.log("All White!")
              }
              else if(whiteCounter === 0){
                //move 6 and re roll
                console.log("All Black!")
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



}


//  can a piece swap places with another piece
const canSwap = () =>{


}

// what to do on a land with a special property
const specialLand = () =>{

}
