import React, { useState } from 'react';
import '../styles/game.scss';
import Board from './Board';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for(let i=0; i<lines.length; i++){
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [history, setHistory] = useState([
    {squares: Array(9).fill(null)}
  ])

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const jumpTo = step => {
    setStepNumber(step);
    setXIsNext((step%2) === 0);
  }

  const moves = history.map((step, move) => {
    const desc = move? ('Go to #' + move) : 'Start the Game';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    )
  });
  let status;
  if (winner) {
    status = 'Winner is ' + winner;
  } else status = 'Next player is ' + (xIsNext? 'X' : 'O');

  const handleClick = i => {
    const hist = history.slice(0, stepNumber+1);
    const current = hist[hist.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);

    if(winner || squares[i]) return;
    squares[i] = xIsNext? 'X' : 'O';

    setHistory(hist.concat({squares: squares}));
    setXIsNext(!xIsNext);
    setStepNumber(hist.length);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={i => () => handleClick(i)}
          squares={current.squares}
        />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ul>{moves}</ul>
      </div>
    </div>
  );
}

export default Game;