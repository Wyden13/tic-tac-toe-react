import React from 'react';
import Board from './Board';
import { useState, useEffect } from 'react';
import GameOver from './GameOver';
import GameState from './GameState';
import Reset from './Reset';
import Player from './Player';

//initalize two player x and o
const PLAYER_X = "X";
const PLAYER_O = "O";

const winningCombinations = [
    //Rows
    { combo: [0, 1, 2], strikeClass: "strike-row-1" },
    { combo: [3, 4, 5], strikeClass: "strike-row-2" },
    { combo: [6, 7, 8], strikeClass: "strike-row-3" },
    //Columns
    { combo: [0, 3, 6], strikeClass: "strike-column-1" },
    { combo: [1, 4, 7], strikeClass: "strike-column-2" },
    { combo: [2, 5, 8], strikeClass: "strike-column-3" },
    //diagonals
    { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
    { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" }
];



function checkWinner(squares, setStrikeClass, setGameState) {
    //refactor
    for (const { combo, strikeClass } of winningCombinations) {
        const squareValue1 = squares[combo[0]];
        const squareValue2 = squares[combo[1]];
        const squareValue3 = squares[combo[2]];
        if (
            squareValue1 !== null &&
            squareValue1 === squareValue2 &&
            squareValue1 === squareValue3
        ) {
            console.log("winning");
            setStrikeClass(strikeClass);
            if (squareValue1 === PLAYER_O) {
                setGameState(GameState.playerOWins);
            } else if (squareValue1 === PLAYER_X) {
                setGameState(GameState.playerXWins);
            }
            return;
        }
    }
    const areAllSquaresFilledIn = squares.every((square) => square !== null);
    if (areAllSquaresFilledIn) {
        setGameState(GameState.draw);
    }

}
//Main program
const Game = () => {

    //useState()
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
    const [strikeClass, setStrikeClass] = useState();
    //set GameState.inProgress as a default value
    const [gameState, setGameState] = useState(GameState.inProgress);
    //Check winning
    useEffect(() => {
        checkWinner(squares, setStrikeClass, setGameState);
    }, [squares]);
    //Square Click
    const handleSquareClick = (index) => {
        if (gameState !== GameState.inProgress) {
            return;
        }
        if (squares[index] !== null) {
            return;
        }
        const newSquares = [...squares];//copy the squares array
        newSquares[index] = playerTurn; //
        setSquares(newSquares); //update the array
        //check player's turn
        if (playerTurn === PLAYER_X) {
            setPlayerTurn(PLAYER_O);
        }
        else {
            setPlayerTurn(PLAYER_X);
        }
    }

    //Reset CLick
    const handleResetClick = () => {
        console.log("reset button is clicked");
        setGameState(GameState.inProgress);
        setSquares(Array(9).fill(null));
        setPlayerTurn(PLAYER_X);
        setStrikeClass(null);
    }

    return (
        <div>
            <h1>Tic Tac Toe</h1>
            <Player playerName={`wendy`} />
            <Board
                squares={squares}
                onSquareClick={handleSquareClick}
                playerTurn={playerTurn}
                strikeClass={strikeClass}
            />
            <GameOver gameState={gameState} />
            <Reset gameState={gameState} onReset={handleResetClick} />

        </div>
    )
}

export default Game;