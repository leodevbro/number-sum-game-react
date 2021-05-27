import React from "react";

// Color Theme
const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
  };


const PlayNumber = props => (
    <button // don't need key here "key={item}". only needed in imediate element in loop (down there)
        className="number" 
        style={{backgroundColor: colors[props.status], }}
        onClick={() => props.onClick(props.number, props.status)}
    >                                           
        {props.number}
    </button>
  );


  export default PlayNumber;