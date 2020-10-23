import React from 'react';
import './App.css';
import {useState} from 'react';

//----------------------------------------------------------
// Displays the current state of the board
//----------------------------------------------------------
const Ristinolla = ({boardState, handleBoardClick}) => {
  const displayBoard = boardState.flat().map((element, index) => {
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
  if (gameHasBeenWon) {
    return(<p>Peli loppu, pelaaja {activePlayerTurn === 1 ? "risti" : "nolla"} voitti!</p>);
  } else {
    return(<p>Pelaajan, {activePlayerTurn === 1 ? "risti" : "nolla"} vuoro</p>);
  }
}

//----------------------------------------------------------
// Main
//----------------------------------------------------------
const App = () => {
  const [gameHasBeenWon, setGameHasBeenWon] = useState(false);
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const [boardState, setboardState] = useState([["empty", "empty", "empty"],["empty", "empty", "empty"],["empty", "empty", "empty"]]);
  const [activePlayerTurn, setActivePlayerTurn] = useState(1);

  const startNewGame = () => {
    setGameHasBeenWon(false);
    setGameIsRunning(true);
    setboardState([["empty", "empty", "empty"],["empty", "empty", "empty"],["empty", "empty", "empty"]]);
    setActivePlayerTurn(1);
    console.log("uusi peli alustettu")
  }

  const handleBoardClick = (location) => () => {
    if (gameHasBeenWon) {
      return;
    }

    const x = location % boardState[0].length;
    const y = Math.floor(location / boardState[0].length);
    console.log(`player clicked on location x:${x} y:${y}`);
    
    // Update the board.
    if (boardState[y][x] === "empty") {
      const newBoardState = JSON.parse(JSON.stringify(boardState));
      newBoardState[y][x] = activePlayerTurn === 1 ? "cross" : "zero";
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
  
  // Game is running, but not finished.
  } else {
    if (!gameHasBeenWon) {
      return(
        <div className="app">
          <GameStateDisplay activePlayerTurn={activePlayerTurn} gameHasBeenWon={gameHasBeenWon}/>
          <Ristinolla boardState={boardState} handleBoardClick={handleBoardClick}/>
        </div>
      );
    
    // Game is running and finished.
    } else {
      return(
        <div className="app">
          <GameStateDisplay activePlayerTurn={activePlayerTurn} gameHasBeenWon={gameHasBeenWon}/>
          <Ristinolla boardState={boardState} handleBoardClick={handleBoardClick}/>
          <br></br>
          <button onClick={startNewGame}>Aloita uusi peli</button>
        </div>
      );
    }
  }
}

export default App;
