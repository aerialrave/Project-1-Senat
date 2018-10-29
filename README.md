# Project-1-Senat
WDI Project 1 of the egyptian board game Senat

# MVP
Board game of Senat that is functional with a click interface to end turns, place pieces, throw sticks and reset the board


# Specs
3 x 10 board 
2 colors of pieces representing players
5 for each player.
pieces are initialy set to be in alternating colors along the top most Row.
pieces of two colors move horizontally left to right then down from the top line. 
horiontally right to left then down on the second line
horizontally left to right on the third line.
4 sticks with color side and dark side.

6 spots have special rules

house of happiness- All pices must land on this house to win and must land on it exactly, if you overshoot, you will stay in place

house of water - land on it and get placed on  house of rebirth one row up. Piece is placed there till it is moved by player

house of three truths- If landed on throw  sticks again, if 3 color sides, remove piece from board.

house of re-atoum - If landed on throw sticks, if 2 color sticks can remove piece from board

last house - toss sticks till one colored stick remains to remove piece

Only one piece can stay on each square at a time. If you land on another players piece you can "Capture" it by swapping places with it 
If 2+ pieces are next to one another, they are protected and you cannot complete your turn.

The goal of the game is to move all of the pieces for the player off of the board

#Technonogies used
Css Html5 Vanilla Javascript

#Approach taken

Senat is a ancient and unfamiliar game to me, so I secided first to break up the rules of the game into three phases

The start

The switch over

The end of turn

the beginning of the game starts from the piece on the top rignt and it's moves are dictated by rolling sticks

after that point player choice enters the picture after rolls for movement is made.

then I have effects occur at the end of a turn, while a turn can be repeated in the game with correct rolls, the consequences happen after the coices are made.

the data representation was chosen as a string array because only positioning within the play grid and piece interaction is simple with no memory occuring on the pieces them selves

the goal of the game is to release all of your pieces for the board, so I chose to make my win condition the removal of all strings of either player

# Resources

The wikiHow article on the game helped my understanding greatly
https://www.wikihow.com/Play-Senet

The Brandeis university paper Made the rules and gameflow much more concrete

http://www.cs.brandeis.edu/~storer/JimPuzzles/GAMES/Senet/Senet.pdf
