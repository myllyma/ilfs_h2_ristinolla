import React from 'react';
import './App.css';
import {useState} from 'react';

const Ristinolla = ({boardState}) => {
  return (
    <div className="board">

    </div>
  );
}

const App = () => {
  const [gameRunning, setGameRunning] = useState(false);
  const [boardState, setboardState] = useState([["empty", "empty", "empty"],["empty", "empty", "empty"],["empty", "empty", "empty"]]);
  const [playerTurn, setPlayerTurn] = useState(1);

  const playerClickedOnBoard = () => {

  }

  return (
    <div className="app">
      <Ristinolla boardState={boardState}/>
    </div>
  );
}

export default App;
