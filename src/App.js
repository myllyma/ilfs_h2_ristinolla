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
const GameStateDisplay = ({activePlayerTurn, gameHasBeenWon}) => {
  return(
    <p>Pelaajan, {activePlayerTurn === 1 ? "risti" : "nolla"} vuoro</p>
  );
}

//----------------------------------------------------------
// Main
//----------------------------------------------------------
const App = () => {
  const [gameHasBeenWon, setGameHasBeenWon] = useState(false);
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const [boardState, setboardState] = useState({board: [["empty", "empty", "empty"],["empty", "empty", "empty"],["empty", "empty", "empty"]], columns: 3});
  const [activePlayerTurn, setActivePlayerTurn] = useState(1);

  const startNewGame = () => {
    setGameHasBeenWon(false);
    setGameIsRunning(true);
    setboardState({board: [["empty", "empty", "empty"],["empty", "empty", "empty"],["empty", "empty", "empty"]], columns: 3});
    setActivePlayerTurn(1);
  }

  const handleBoardClick = (location) => () => {
    if (gameHasBeenWon) {
      return;
    }

    const x = location % boardState.columns;
    const y = Math.floor(location / boardState.columns);
    console.log(`player clicked on location x:${x} y:${y}`);
    
    // Update the board.
    if (boardState.board[y][x] === "empty") {
      const newBoard = JSON.parse(JSON.stringify(boardState.board));
      newBoard[y][x] = activePlayerTurn === 1 ? "cross" : "zero";
      const newBoardState = {...boardState, board:newBoard};
      setboardState(newBoardState);
    } else {
      return;
    }

    // TODO: handle game ending check.
    let gameWon = false;

    setGameHasBeenWon(gameWon);

    // Change active player.
    if (!gameWon) {
      setActivePlayerTurn(activePlayerTurn === 1 ? 2 : 1);
    }
  }

  // First game state, splash screen/welcome screen.
  if (!gameIsRunning) {
    return (
      <div className="app">
        <p>Tervetuloa ristinolla-peliin</p>
        <button onClick={startNewGame}>Aloita peli</button>
      </div>
    );
  
  // Game is running, but not over.
  } else {
    if (!gameHasBeenWon) {
      return(
        <div className="app">
          <GameStateDisplay activePlayerTurn={activePlayerTurn} gameHasBeenWon={gameHasBeenWon}/>
          <Ristinolla boardState={boardState} handleBoardClick={handleBoardClick}/>
        </div>
      );
    
    // Game is running and over.
    } else {
      return(
        <div className="app">
          <GameStateDisplay activePlayerTurn={activePlayerTurn} gameHasBeenWon={gameHasBeenWon}/>
          <Ristinolla boardState={boardState} handleBoardClick={handleBoardClick}/>
          <p>Pelaaja {activePlayerTurn === 1 ? "risti" : "nolla"} voitti!</p>
          <button onClick={startNewGame}>Aloita uusi peli</button>
        </div>
      );
    }
  }
}

export default App;
