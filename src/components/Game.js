import React from "react";
import utils from "../other-components/math-utils";

import StarsDisplay from "./StarsDisplay";
import PlayNumber from "./PlayNumber";
import PlayAgain from "./PlayAgain";


function useInterval(callback, delay) { // big savior from problematic setInterval and setTimeout
    const savedCallback = React.useRef();
  
    // Remember the latest callback.
    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    React.useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
  }


// Custom Hook (use*), don't call hooks inside loop or conditions
const useGameState = (props, ) => {
    const [stars, setStars] = React.useState(utils.random(1, 9)); // number
    const [availableNums, setAvailableNums] = React.useState(utils.range(1, 9)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const [candidateNums, setCandidateNums] = React.useState([]); // empty array []
    const [secondsLeft, setSecondsLeft] = React.useState(20);
  
  
    useInterval(
        () => {
            setSecondsLeft(secondsLeft - 1);
        },
        
        secondsLeft <= 0 ? 
            null : availableNums.length === 0 ?
                null : 1000
    ); // BIG discovery
  
  
  
    const setGameState = (newCandidateNums) => {
        if(utils.sum(newCandidateNums) !== stars) {
            setCandidateNums(newCandidateNums);
        } else {
            const newAvailableNums = availableNums.filter(
                n => !newCandidateNums.includes(n)
            );
            console.log(newAvailableNums);
            setStars(utils.randomSumIn(newAvailableNums, 9)); // redraw stars
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
        }
    }
  
  
    console.log({stars, availableNums, candidateNums, secondsLeft, setGameState});
    return {stars, availableNums, candidateNums, secondsLeft, setGameState};
  };
  
  
  
  
  const Game = (props) => {
    const {stars, availableNums, candidateNums, secondsLeft, setGameState} = useGameState();
  
    console.log("inside Game function");
  
    // candidates are wrong when sum of candidate numbers is greater than the count of stars.
    const candidatesAreWrong = utils.sum(candidateNums) > stars; // true/false
  
  
    const gameStatus = 
        availableNums.length === 0 ? 
        'won' : secondsLeft > 0 ?
            'active' : 'lost'
    ;
  
  
    const numberStatus = (number) => {
        if(!availableNums.includes(number)) {
            return 'used';
        }
        if(candidateNums.includes(number)) {
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }
        // if not used and not candidate, it's available number
        return 'available';
    };
  
  
    const onNumberClick = (number, currentStatus) => {
        if(currentStatus === 'used' || gameStatus !== 'active') {
            return;
        }
        const newCandidateNums = 
            currentStatus === 'available' ? 
            candidateNums.concat(number) : 
            candidateNums.filter(cn => cn !== number)
        ;
  
        setGameState(newCandidateNums);
    };
  
  
    return(
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
  
  
            <div className="body">
                <div className="left">
                    {gameStatus !== 'active' ? (
                        <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
                    ) : (
                        <StarsDisplay stars={stars} />
                    )}
                </div>
  
  
                <div className="right">
                    {utils.range(1, 9).map(itemNum => (
                        <PlayNumber 
                            key={itemNum} 
                            status={numberStatus(itemNum)}
                            number={itemNum} 
                            onClick={onNumberClick}
                        />
                    ))}
                </div>
            </div>
  
  
            <div className="timer">
                Time Remaining: {secondsLeft}
            </div>
        </div>
    );
  };


  export default Game;