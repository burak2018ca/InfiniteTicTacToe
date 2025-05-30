import React, { useState } from 'react';
import Button from './Button'
import InfoTooltip from "./Info";
const buttonIndexes = [0,1,2,3,4,5,6,7,8]

const GameBoard = () => {
    const [turn, setTurn] = useState("X");
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xMoves, setXMoves] = useState([]);
    const [oMoves, setOMoves] = useState([]);
    const [xScore, setXScore] = useState(0);
    const [oScore, setOScore] = useState(0);
    const [winner, setWinner] = useState(null);
   
    function handleClick(index) {
    if (squares[index] || winner) return;

    if (turn === "X") {
        const { newSquares, newMoves } = placeMove(index, xMoves, "X");
        setSquares(newSquares);
        setXMoves(newMoves);

        const newScore = updateScoreAndCheckWin(newMoves, xScore, "X");
        if (newScore !== xScore) setXScore(newScore);
        else setTurn("O");
        } 
    else {
        const { newSquares, newMoves } = placeMove(index, oMoves, "O");
        setSquares(newSquares);
        setOMoves(newMoves);

        const newScore = updateScoreAndCheckWin(newMoves, oScore, "O");
        if (newScore !== oScore) setOScore(newScore);
        else setTurn("X");
        }
    }

    function placeMove(index, playerMoves, playerMark) {
        const newSquares = [...squares];
        const newMoves = [...playerMoves, index];

        if (newMoves.length > 3) {
            const removedIndex = newMoves.shift();
            newSquares[removedIndex] = null;
        }

        newSquares[index] = playerMark;
        return { newSquares, newMoves };
    }

    function updateScoreAndCheckWin(playerMoves, playerScore, playerMark) {
        if (checkWin(playerMoves)) {
            const newScore = playerScore + 1;
            if (newScore === 3) {
            setWinner(playerMark);
            }
            setTimeout(resetBoard, 800);
            return newScore;
        }
        return playerScore;
    }

  function checkWin(moves) {
  const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6],           
  ];

  return winCombos.some(combo =>
    combo.every(index => moves.includes(index))
  );
}

function resetBoard() {
  setSquares(Array(9).fill(null));
  setXMoves([]);
  setOMoves([]);
}

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-900 text-white">
        <div className="fixed top-4 right-4">
            <InfoTooltip />
        </div>
        <h1 className="text-6xl font-bold text-center pt-8 mb-8">
            Infinite <br /> Tic Tac Toe
        </h1>

        <div className="flex justify-between items-start px-8 max-w-6xl mx-auto w-full">
            <div className="text-left">
                <h2 className="text-2xl font-bold text-red-400">Player X</h2>
                <p className="text-lg">Score: {xScore}</p>
            </div>


            <div className="grid grid-cols-3 ">
                {buttonIndexes.map((i) => (
                    <Button
                    key={i}
                    text={squares[i] || ""}
                    onClick={() => handleClick(i)}
                    />
                ))}

            </div>
                <div className="text-right">
                <h2 className="text-2xl font-bold text-green-700">Player O</h2>
                <p className="text-lg">Score: {oScore}</p>
            </div>
        </div>
         {winner && (
            <div className="text-center mt-4 text-3xl font-bold text-yellow-300">
                Player {winner} wins the match!
            </div>
        )}
        <div className='flex items-center justify-center mt-6'>
        {winner && (
            
            <button
                className="mt-4 p-2 bg-yellow-400 text-black rounded"
                onClick={() => {
                setWinner(null);
                setXScore(0);
                setOScore(0);
                resetBoard();
                }}
            >
                Play Again
            </button>
        )}
        </div>
       
    </div>
  )
}

export default GameBoard