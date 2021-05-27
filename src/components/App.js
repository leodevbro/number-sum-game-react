import React from 'react';
import '../App.css';
import rend from '../other-components/Rend';
import Game from "./Game";


// StarGame - gen3
// we unmount and remount component, instead of the game reset function

// Now user can not cheat with timer. the timer just goes down without waiting.

// spliting big components into smaller ones


const StarMatch = (props) => {
  const [gameId, setGameId] = React.useState(1);

  return(
      <Game key={`${props.containerID}-${gameId}`} startNewGame={() => setGameId(gameId + 1)} />
  );
};



const App = (props) => {
    return(
        <button 
            onClick={() => {
                rend(StarMatch, props.containerID);
            }}
            key={props.containerID}
        >
            Start Game 1
        </button>
    );
};



export default App;
