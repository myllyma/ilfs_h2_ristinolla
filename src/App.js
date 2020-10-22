import React from 'react';
import './App.css';
import {useState} from 'react';

//----------------------------------------------------------
// Displays the current state of the board
//----------------------------------------------------------
const Ristinolla = ({boardState, handleBoardClick}) => {
  const displayBoard = boardState.board.flat().map((element, index) => {
    let boardPiece;
    switch (element) {
      case "empty":
        boardPiece = <div key={index} onClick={handleBoardClick(index)} className="boardElement"></div>; break;
      case "cross":
        boardPiece = <div key={index} onClick={handleBoardClick(index)} className="boardElement"><img src="cross.svg" className="boardPiece" alt="cross"></img></div>; break;
      case "zero":
        boardPiece = <div key={index} onClick={handleBoardClick(index)} className="boardElement"><img src="circle.svg" className="boardPiece" alt="circle"></img></div>; break;
      default:
        console.log("ERROR: board state corrupted");
      }
      return boardPiece;
  });

  return (
    <div className="board">
      {displayBoard}
    </div>
  );
}

//----------------------------------------------------------
// Displays the current state of the game at the top of the screen
//----------------------------------------------------------
const GameStateDisplay = ({playerTurn, gameHasBeenWon}) => {
  let displayPlayer = "";
  switch (playerTurn) {
    case 1:
      displayPlayer = "risti";
      break;
    case 2:
      displayPlayer = "nolla";
      break;
    default:
      console.log("ERROR: active player state corrupted");
  }

  const output = gameHasBeenWon ? <p>Peli lopussa, {displayPlayer} voitti</p> : <p>Pelaajan {displayPlayer} vuoro</p>;
  return(output);
}

//----------------------------------------------------------
// Main
//----------------------------------------------------------
const App = () => {
  const [gameRunning, setGameRunning] = useState(false);
  const [gameHasBeenWon, setGameHasBeenWon] = useState(false);
  const [boardState, setboardState] = useState({board: [["empty", "empty", "empty"],["empty", "empty", "empty"],["empty", "empty", "empty"]], columns: 3});
  const [playerTurn, setPlayerTurn] = useState(1);

  const initializeGame = () => {
    setGameRunning(true);
    setGameHasBeenWon(false);
    setboardState({board: [["empty", "empty", "empty"],["empty", "empty", "empty"],["empty", "empty", "empty"]], columns: 3});
    setPlayerTurn(1);
  }

  const handleBoardClick = (location) => () => {
    if (gameHasBeenWon) {
      return;
    }

    const x = location % boardState.columns;
    const y = Math.floor(location / boardState.columns);
    console.log(`player clicked on location x:${x} y:${y}`);
    
    if (boardState.board[y][x] === "empty") {
      const newBoard = JSON.parse(JSON.stringify(boardState.board));
      newBoard[y][x] = playerTurn === 1 ? "cross" : "zero";
      const newBoardState = {...boardState, board:newBoard};
      setboardState(newBoardState);
    } else {
      return;
    }

    checkForGameOver();

    if (!gameHasBeenWon) {
      setPlayerTurn(playerTurn === 1 ? 2 : 1);
    }
  }

  const checkForGameOver = () => {
    if (!gameRunning) {
      return;
    }
  }

  const gameOver = () => {
    setGameHasBeenWon(true);
  }

  return (
    <div className="app">
      <GameStateDisplay playerTurn={playerTurn} gameHasBeenWon={gameHasBeenWon}/>
      <Ristinolla boardState={boardState} handleBoardClick={handleBoardClick}/>
    </div>
  );
}

export default App;
