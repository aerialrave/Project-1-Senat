const bannerControl = document.getElementById("banner");
let viewBoard = document.querySelector("#board");

let firstRow = document.querySelectorAll(".firstrow");
let secondRow = document.querySelectorAll(".secondrow");
let thirdRow = document.querySelectorAll(".thirdrow");

const diceControl = document.getElementById("highRoller");
const forceTurnend = document.getElementById("forceEnd");
const resetGame = document.getElementById("resetGame");
const bantxt = document.getElementById("bantxt");
const gameState = {
  board: [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  ],
  // 0 is black 1 is color // used for determining moves
  sticks: [0, 0, 0, 0],
  moves: 0,
  rollCounter: 0,
  //win count
  p1Vics: 0,
  p2Vics: 0,
  won: false,
  winner: null,
  player: 'p1',
  // deal with source and target locations
  sourceRow: 0,
  sourceCol: 0,
  targRow: 0,
  targCol: 0,
  // Bool for listener controls
  rollBool: true,
  boardBool: false,
  rollActive: true,
  boardActive: false,

  //may need a  value to queue consecutive actions allowed.
  // also to initialize the first action to be player 2 on only the last element on the first array
  startBoard() {
    this.board = [
      ['p1', 'p2', 'p1', 'p2', 'p1', 'p2', 'p1', 'p2', 'p1', 'p2'],
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    ];
    this.sticks = [0, 0, 0, 0];
    this.winner = null;
    this.won = false;
    this.player = 'p2';
    this.sourceCol = 9;
    this.sourceRow = 0;
    this.rollCounter = 1;
    this.moves = 0;
    this.rollBool = true;
    this.boardBool = false;

    this.rollActive = true;
    this.boardActive = false;

  }

}

debugger;
//goal set up board, players pieces,  gameState of no win or loss
gameState.startBoard();
console.log(gameState.board);
console.log(gameState.board[0]); //returns row
console.log(gameState.board[0][0]); //returns element

updateBoard();

//event listeners for stick button and force end of turn button
diceControl.addEventListener("click", function() {

  if (gameState.rollBool === true) {
    stickRoll();
    updateStickroll();
    stickEval();
    gameState.rollBool = false;
  }
});
// ends the turn and adds turns roll boolean to true, allopwing the event listener to run
forceTurnend.addEventListener("click", function() {
  playerSwap();
  gameState.rollActive = true;
  gameState.boardActive = false;


});
//console.log(gameState.sticks)
//functions for gamme piece interactions

//Testing if a game state is altered, listen  for a value
resetGame.addEventListener("click", function() {

    gameState.startBoard();
    updateBoard();
    bantxt.innerHTML = (`purple piece on the right most side moves first`);
    bannerControl.style.backgroundColor = "violet";
    // add function call for game here
    //playGame();
  })
  //
viewBoard.addEventListener("click", function(e) {
  // ok so I get how it works not to make a logic rule for turns then updateBoard
  debugger;
  if (gameState.boardBool === true) {

    let testRow = e.target.dataset.row;
    let testCol = e.target.dataset.col;

    if (gameState.player === 'p1' && gameState.board[testRow][testCol] ===
      'p2' || gameState.player === 'p2' && gameState.board[testRow][testCol] ===
      'p1') {
      gameState.boardBool = true;
      // use ME!! for messages about misplacesd clicks on pieces
      bantxt.innerHTML = (
        `${gameState.player} choose one of your own pieces to move, movement will occur atomatically`
      );
      return 0;
    } else if (gameState.player === 'p1' && gameState.board[testRow][
        testCol
      ] === 'p1' || gameState.player === 'p2' && gameState.board[testRow][
        testCol
      ] === 'p2') {
      gameState.sourceRow = testRow;
      gameState.sourceCol = testCol;
      gameState.boardBool = false;
      // maybe highlight the border?
      console.log("gameState sourceRow " + gameState.sourceRow +
        " gameState sourceCol " + gameState.sourceCol);
      bantxt.innerHTML = (
        `${gameState.player} selected their own piece at ${gameState.sourceRow}, ${gameState.sourceCol} sucessfully `
      );
    } else {
      gameState.boardBool = true;
      bantxt.innerHTML = (
        `${gameState.player} choose a spot with one of your own pieces to move, movement will occur atomatically`
      );
      return 0;
    }

  }


});

//altering the banner depending on turn



//functions for special board interactions

// function for player swapping will use to alter screen
const playerSwap = () => {
  if (gameState.player === 'p1') {
    gameState.player = 'p2';
    gameState.sticks = [0, 0, 0, 0];
    updateStickroll();
    resetTargeting();
    moveAndRollreset();
    gameState.rollBool = true;
    gameState.boardBool = false;
    bannerControl.style.backgroundColor = "violet";
    bantxt.innerHTML = "Player 2 turn to roll"
  } else {
    gameState.player = 'p1';
    gameState.sticks = [0, 0, 0, 0];
    updateStickroll();
    resetTargeting();
    moveAndRollreset();
    gameState.rollBool = true;
    gameState.boardBool = false;
    bannerControl.style.backgroundColor = "yellow";
    bantxt.innerHTML = "Player 1 turn to roll"
  }

}

//functions for stick rolling
const stickRoll = () => {
  gameState.rollCounter -= 1;
  if (gameState.rollCounter < 0) {
    gameState.rollCounter = 0;
  }
  for (let i = 0; i <= 3; i += 1) {
    gameState.sticks[i] = Math.floor(Math.random() * Math.floor(2));
  }

}

function updateStickroll() {
  let button = document.querySelector("#highRoller");
  button.addEventListener('click', stickRoll);
  let sticksEL = document.querySelectorAll(".stick");
  let sticks = gameState.sticks;
  for (let i = 0; i <= 3; i += 1) {
    let stickEL = sticksEL[i];
    let stick = sticks[i];
    if (stick === 0) {
      stickEL.style.backgroundColor = "black";
    } else {
      stickEL.style.backgroundColor = "white";
    }
  }
}



//  function for evaluating stick rolls

function stickEval() {

  let whiteCounter = 0;
  for (let i = 0; i <= gameState.sticks.length; i += 1) {
    if (gameState.sticks[i] === 1) {
      whiteCounter += 1;
    } // end of stick checking
  } // end of loop

  if (whiteCounter === 1) {
    //move 1 space and re throw
    gameState.rollCounter += 1
    gameState.moves = 1;
    bantxt.innerHTML = (
      `${gameState.player} 1 White! Can move one space and roll again after moving`
    )
    return 1;
  } else if (whiteCounter === 2) {
    //move 2 spaces
    gameState.moves = 2;
    bantxt.innerHTML = (`${gameState.player} 2 White! Can move 2 spaces`)
    return 2;
  } else if (whiteCounter === 3) {
    // move 3 spaces
    gameState.moves = 3;
    bantxt.innerHTML = (`${gameState.player} 3 White! Can move 3 spaces`)
    return 3;
  } else if (whiteCounter === 4) {
    //move 4 & re roll
    gameState.moves = 4;
    bantxt.innerHTML = (
      `${gameState.player} All White! Can move 4 spaces and roll again after moving`
    )
    gameState.rollCounter += 1;
    return 4;
  } else if (whiteCounter === 0) {
    //move 6 and re roll
    gameState.moves = 6;
    bantxt.innerHTML = (
      `${gameState.player} All Black! Can move 6 spaces and roll again after moving`
    )
    gameState.rollCounter += 1;
    return 6;
  }
}


// goal of traverseBoard is to be fed in 2 numbers that hold the 2 indexes and a set number of moves, after reaching the location, swap the values from origin to target location.
function traverseBoard(firstIndex, secondIndex, steps) {

  if (firstIndex === 2 && secondIndex === 9) {
    // do nothing maybe? reload the targeting selector?
    if (exitCheck() === true) {
      return 0;
    } else {
      bantxt.innerHTML = (
        `${gameState.player} cant move past the end of the board, but can remove the piece with 1 white, choose another piece`
      );
      gameState.boardBool = true;
      gameState.moves = steps;
      //acts as a "refund"
      return 1;
    }
  }


  let stepsCopy = steps;
  let plusOne = firstIndex + 1;
  let path = secondIndex + steps;
  // now to use undefined to jump arrays
  for (let r = secondIndex; r <= path; r += 1) { // loops from 0 to moves one by 1

    if (gameState.board[firstIndex][r] != undefined) { // if the value inside is not undefined
      console.log(gameState.board[firstIndex][r]); // spit out what is inside
      stepsCopy -= 1; //decriment the copy of move is by 1
      // if moves copy is equal to one here  swap from origin to  new location
      if (r === steps && gameState.board[firstIndex][r++] != undefined) { // if next spot is NOT undefined and steps is fully looped, log out the current indexes first and second

        // conditions  Go HERE!!
        if (exitCheck === true) {
          return 0;
        } else {
          if (defCheck(firstIndex, r) === false && noAttack(gameState.sourceRow,
              gameState.sourceCol, firstIndex, r) === false && blockadeCheck() ===
            false) {

            swapPiece(firstIndex, secondIndex, firstIndex, r);
            bantxt.innerHTML = (`sucessfull move ${gameState.player} !`);
            return 0;
            console.log("firstIndex :" + firstIndex + " r:" + r);
          } else {
            bantxt.innerHTML = (
              `${gameState.player} gave an improper move, choose another piece`
            );
            gameState.boardBool = true;
            gameState.moves = steps;
            return 1;
          }
        }

      }

    } else if (gameState.board[firstIndex][r] === undefined) { //if we hit an undefined value

      console.log("undefined hit!"); //hit confirm
      for (let e = 0; e <= stepsCopy - 1; e++) { // loop from the start of the next array in line
        console.log("next array is " + gameState.board[plusOne][e]); //spit out the values contained in the next array
        console.log("the copy of moves is " + stepsCopy); //spit out the value of the copy
        if (e === stepsCopy - 1) { // when the loop ends

          if (exitCheck === true) {
            return 0;
          } else {

            if (defCheck(plusOne, e) === false && noAttack(gameState.sourceRow,
                gameState.sourceCol, plusOne, e) === false && blockadeCheck() ===
              false) {
              swapPiece(firstIndex, secondIndex, plusOne, e);
              bantxt.innerHTML = (`sucessfull move ${gameState.player} !`);
              console.log("current value is " + plusOne + " " + e);
              console.log("escape!"); //console log just before the return statement to not loop again.
              // swap from origin to array [index+1][e]
              return 0;
            } else {
              bantxt.innerHTML = (
                `${gameState.player} gave an improper move, choose another piece`
              );
              gameState.boardBool = true;
              gameState.moves = steps;
              return 1;
            }
          }

        }
      }
    }

  }
}

//now ot test



function swapPiece(firstIndex, secondIndex, targFirst, targSecond) {
  //setting temp  holder
  let tempo = gameState.board[targFirst][targSecond];
  //  value from first to target
  gameState.board[targFirst][targSecond] = gameState.board[firstIndex][
    secondIndex
  ];
  // value from temo to first
  gameState.board[firstIndex][secondIndex] = tempo;

}



//goal of WinCheck is to go through all 3 arrays for strings of p1 or p2

function winCheck(garray) {
  console.log('win check');
  let p1Win = false;
  let p2Win = false;
  if (garray[0].includes('p1') === false && garray[1].includes('p1') === false &&
    garray[2].includes('p1') === false) {
    p1Win = true;
    bantxt.innerHTML = "Player 1 Wins! Reset game to play again"
    gameState.boardBool = false;
    gameState.rollBool = false;
    console.log(p1Win);
    gameState.won = true;
    console.log("P1 Wins");
  } else if (garray[0].includes('p2') === false && garray[1].includes('p2') ===
    false && garray[2].includes('p2') === false) {
    p2Win = true;
    bantxt.innerHTML = "Player 2 Wins! Reset game to play again"
    gameState.boardBool = false;
    gameState.rollBool = false;
    console.log(p2Win);
    gameState.won = true;
    console.log("P2 Wins");
  }

}

// replaces piece on board with a string for 0
function removePiece(firstIndex, secondIndex) {
  gameState.board[firstIndex][secondIndex] = '0';
}

// goal of defCheck is to look "around" a targeted array index for neighbors, if neighbors are found return true, else return false
function defCheck(targFirst, targSecond) {
  //check if the target second element is not equal to array .length minus 1 OR 0
  if (targSecond != 0 && targSecond != gameState.board[0].length - 1) {
    // then just check ahead and behind
    if (gameState.board[targFirst][targSecond] === gameState.board[targFirst][
        targSecond + 1
      ] || gameState.board[targFirst][targSecond] === gameState.board[targFirst]
      [targSecond - 1]) {
      console.log("found the match!")
      return true;
    } else {
      console.log("no match");
      return false;
    }
  } // end IN middle Array check
  else if (targSecond === 0) {
    if (gameState.board[targFirst][targSecond] === gameState.board[targFirst][
        targSecond + 1
      ] || gameState.board[targFirst][targSecond] === gameState.board[targFirst -
        1][gameState.board[0].length - 1]) {
      console.log("found the match!");
      return true;
    } else {
      console.log("no match");
      return false;
    }
  } //array check for the begining of array
  else if (targSecond === gameState.board[0].length - 1) {
    if (gameState.board[targFirst][targSecond] === gameState.board[targFirst][
        targSecond - 1
      ] || gameState.board[targFirst][targSecond] === gameState.board[targFirst +
        1][0]) {
      console.log("found the match!");
      return true;
    } else {
      console.log("no match");
      return false;
    }
  } // check for the end of arrays


}


// feature complete
function updateBoard() {
  let arr = [firstRow, secondRow, thirdRow];

  for (var i = 0; i < gameState.board.length; i += 1) {
    let row = gameState.board[i];
    for (var j = 0; j < row.length; j += 1) {
      if (row[j] === 'p1') {

        let position = arr[i][j];
        // has the if there arent child nodes append a child
        if (position.hasChildNodes() === false) {
          let p1Piece = document.createElement('div');
          p1Piece.className = 'player1Piece';
          position.appendChild(p1Piece);
        }

        // if there are child nodes if the same is there  dont add any, if different remove and rewrite
        else if (position.hasChildNodes() === true) {
          if (position.children[0].className === 'player1Piece') {} else if (
            position.children[0].className === 'player2Piece') {
            let p1Piece = document.createElement('div');
            p1Piece.className = 'player1Piece';
            position[0].replaceChild(p1piece, position.childNodes[0]);
          }
        }

      } else if (row[j] === 'p2') {
        let position = arr[i][j];
        if (position.hasChildNodes() === false) {
          let p2Piece = document.createElement('div');
          p2Piece.className = 'player2Piece';
          position.appendChild(p2Piece);
        }

        // if there are child nodes if the same is there  dont add any, if different remove and rewrite
        else if (position.hasChildNodes() === true) {
          if (position.children[0].className === 'player2Piece') {} else if (
            position.children[0].className === 'player1Piece') {
            let p2Piece = document.createElement('div');
            p2Piece.className = 'player2Piece';
            position[0].replaceChild(p2piece, position.childNodes[0]);
          }
        }
      }
      // neither pieces present
      else if (row[j] != 'p2' || row[j] != 'p1') {
        let position = arr[i][j];
        if (position.hasChildNodes() === false) {}
        if (position.hasChildNodes() === true) {
          position.removeChild(position.childNodes[0]);
        }
      }
    }
  }
} // end of updateBoard

// to determine if a swap of opposing pieces can take place
function noAttack(firstIndex, secondIndex, targFirst, targSecond) {
  if (targFirst === 1 && targSecond === 4 || targFirst === 2 && targSecond ===
    6 || targFirst === 2 && targSecond === 8 || targFirst === 2 && targSecond ===
    9) {
    return true;

  } else if (gameState.board[firstIndex][secondIndex] === 'p1' && gameState.board[
      targFirst][targSecond] === 'p2' || gameState.board[firstIndex][
      secondIndex
    ] === 'p2' && gameState.board[targFirst][targSecond] === 'p1') {

    return false;
  } else {
    return true
  }

}

//reset moves and rolls
function moveAndRollreset() {
  gameState.board.rollCounter = 1;
  gameState.board.moves = 0;
}
//reset resetTargeting

function resetTargeting() {
  gameState.sourceRow = 0;
  gameState.sourceCol = 0;
  gameState.targRow = 0;
  gameState.targCol = 0;
}
// needed
function writeSource(srow, scol) {
  gameState.sourceRow = srow;
  gameState.sourceCol = scol;
}

// may not be needed
function writeTarget(trow, tcol) {
  gameState.targRow = trow;
  gameState.targCol = tcol;
}

function waterTrap() {
  // check the board to see if the trap is activated
  if (gameState.board[2][6] === 'p1' || 'p2') {
    // if there are no player pieces on the slot, swapPiece back up
    if (gameState.board[1][3] != 'p1' || 'p2' || undefined) {
      setTimeout(function() {
        swapPiece(2, 6, 1, 3)
      }, 200);
      updateBoard();

    }
    // if the spot is occupied then  go to the next open spot
    else if (gameState.board[1][3] === 'p1' || 'p2') {


      for (let k = 12; k === 0; k--) {
        if (k > 9) {
          let revwater = 2;
          if (gameState.board[1][revwater] === 'p1' || 'p2') {
            revwater -= 1;
          } else {

            setTimeout(function() {
              swapPiece(2, 6, 1, revwater)
            }, 200);
            updateBoard();

            return 0;
          }

        } // end of the first array check
        //
        else {

          for (let a = 10; a <= 0; a++) {
            if (gameState.board[0][a] != 'p1' || 'p2' || undefined) {

              setTimeout(function() {
                swapPiece(2, 6, 0, a)
              }, 200);
              updateBoard();
              return 0;
            }

          }
        }
      }
    }

  }

}

// exit check
function exitCheck() {
  if (gameState.sourceRow === 2) {
    if (gameState.sourceCol === 7 && gameState.moves === 1) {
      bantxt.innerHTML = (
        `${gameState.player}'s piece has moved on and is removed from play' `
      );
      removePiece(gameState.board[2][7]);
      updateBoard();
      //set timmeout for  playerSwap
      setTimeout(function() {
        playerSwap()
      }, 200);

      return true;
    } else if (gameState.sourceCol = 8 && gameState.moves === 2) {
      bantxt.innerHTML = (
        `${gameState.player}'s piece has moved on and is removed from play' `
      );
      removePiece(gameState.board[2][8]);
      updateBoard();
      setTimeout(function() {
        playerSwap()
      }, 200);
      return true;
    } else if (gameState.sourceCol = 9 && gameState.moves === 3) {
      bantxt.innerHTML = (
        `${gameState.player}'s piece has moved on and is removed from play' `
      );
      removePiece(gameState.board[2][9]);
      updateBoard();
      setTimeout(function() {
        playerSwap()
      }, 200);
      return true;
    } else {
      return false;
    }
  }

}

function blockadeCheck() {

  if (gameState.moves >= 3) {

    let blockade = 0
    let blockrun = gameState.sourceCol;

    for (let i = 0; i <= 3; i += 1) {
      gameState.board[gameState.sourceRow][blockrun++];


      if (gameState.player === 'p1' && gameState.board[gameState.sourceRow][
          blockrun
        ] === 'p2' || gameState.player === 'p2' && gameState.board[gameState.sourceRow]
        [blockrun] === 'p1') {
        blockade += 1;
        if (blockade === 3) {
          return true;
        } else {
          return false;
        }
      }
    }

    blockrun = gameState.sourceCol;
    for (let i = 3; i <= 0; i -= 1) {
      gameState.board[gameState.sourceRow][blockrun--];


      if (gameState.player === 'p1' && gameState.board[gameState.sourceRow][
          blockrun
        ] === 'p2' || gameState.player === 'p2' && gameState.board[gameState.sourceRow]
        [blockrun] === 'p1') {
        blockade += 1;
        if (blockade === 3) {
          return true;
        } else {
          return false;
        }

      }
    }
  }
}
/*
function playGame() {
  while (gameState.won != true) {
    debugger;

    let turnFirst = false;
    while (turnFirst != true) {

      while (gameState.rollCounter >= 0) {
        while (gameState.rollActive === true) {
          //open roll listener
          gameState.rollBool = true;
          //evaluate roll -in event listener
          // update roll -in event listener

          //close roll Listener

          if (gameState.rollBool === false) {
            gameState.rollActive = false;
          }
        }

        while (gameState.boardActive === false) {
          // open board listener
          gameState.boardBool = true;
          // wait for input to board
          if (gameState.boardBool === false)
            gameState.boardActive = true;
        }
        //feed sourceRow and sourceCol to

        traverseBoard(gameState.sourceRow, gameState.sourceCol, gameState.moves);
        while (traverseBoard(gameState.sourceRow, gameState.sourceCol,
            gameState.moves) != 0) {
          gameState.boardBool = true;
          // feed another set of inputs
          while (gameState.boardActive === false) {
            // open board listener
            gameState.boardBool = true;
            // wait for input to board
            if (gameState.boardBool === false) {
              traverseBoard(gameState.sourceRow, gameState.sourceCol, gameState
                .moves);
            }

          }
          // get a new source row and column

        }

        //if false open listener again -- handled

        //if traverseBoard returns true
        //close board Listener
        gameState.rollActive = true,
          gameState.boardActive = false,

          // resetting moves col and row to have new valid values chosen
          gameState.moves = 0;
        gameState.sourceCol = 0;
        gameState.sourceRow = 0;
        updateBoard();
        gameState.rollCounter -= 1;
      }
      turnFirst = true;
    }

    let currplayer = gameState.player;

    while (gameState.rollCounter <= 0 || gameState.player != currplayer) {

      while (gameState.rollActive === true) {
        //open roll listener
        gameState.rollBool = true;
        //evaluate roll -in event listener
        // update roll -in event listener

        //close roll Listener

        if (gameState.rollBool === false) {
          gameState.rollActive = false;
        }
      }

      while (gameState.boardActive === false) {
        // open board listener
        gameState.boardBool = true;
        // wait for input to board
        if (gameState.boardBool === false)
          gameState.boardActive = true;
      }
      //feed sourceRow and sourceCol to

      traverseBoard(gameState.sourceRow, gameState.sourceCol, gameState.moves);
      while (traverseBoard(gameState.sourceRow, gameState.sourceCol, gameState.moves) !=
        0) {
        gameState.boardBool = true;
        // feed another set of inputs
        switch (gameState.boardActive === false) {
          // open board listener
          gameState.boardBool = true;
          // wait for input to board
          if (gameState.boardBool === false) {
            traverseBoard(gameState.sourceRow, gameState.sourceCol, gameState.moves);
          }

        }
        // get a new source row and column

      }

      //if false open listener again -- handled

      //if traverseBoard returns true
      //close board Listener
      gameState.rollActive = true,
        gameState.boardActive = false,
        // resetting moves col and row to have new valid values chosen
        gameState.moves = 0;
      gameState.sourceCol = 0;
      gameState.sourceRow = 0;
      updateBoard();
      waterTrap();
      winCheck(gameState.board);

      // decriment roll counter here?
      gameState.rollCounter -= 1;
    }
    if (gameState.player != currplayer) {
      currplayer = gameState.player;
    } else {
      playerSwap();
    }

  }
  // win message plays
  //turn off event listeners
  gameState.rollBool = false;
  gameState.boardBool = false;

}

playGame();
*/
