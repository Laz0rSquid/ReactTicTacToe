import React from 'react';
import Board from './Board.js';
import '../css/index.css';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          position: null
        }
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          position: i
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const draw = current.squares.every(checkForDraw);
    var gameEndColorChange = "";

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move + ' @ ' + getPostionString(step.position) :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (draw) {
      status = "It's a draw"
    } else if (winner) {
      status = "Winner: " + winner;
      gameEndColorChange += " winner"
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className={gameEndColorChange}>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function checkForDraw(square) {
  return square ? true : false;
}

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
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function getPostionString(position) {
  var col, row;
  var counter = -1;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      counter++;
      if (counter == position) {
        return 'col ' + (++j) + ', row ' + (++i);
      }
    }
  }

  return null;
}

