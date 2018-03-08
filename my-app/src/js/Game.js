import React from 'react';
import Board from './Board.js';
import TiArrowBack from 'react-icons/lib/ti/arrow-back';
import TiArrowForward from 'react-icons/lib/ti/arrow-forward';
import TiRefresh from 'react-icons/lib/ti/refresh';

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
      xIsNext: Math.random() < 0.5,
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

  goBack() {
    if (this.state.stepNumber > 0) {
      this.setState({
        stepNumber: this.state.stepNumber -1,
        xIsNext: (this.state.stepNumber % 2) === 0
      });
    }
  }

  goForward() {
    if (this.state.stepNumber < this.state.history.length -1 && this.state.stepNumber < 9) {
      this.setState({
        stepNumber: this.state.stepNumber +1,
        xIsNext: (this.state.stepNumber % 2) === 0
      });
    }
  }

  resetGame() {
    this.setState({
      history: [
        {
          squares: Array(9).fill(null),
          position: null
        }
      ],
      stepNumber: 0,
      xIsNext: Math.random() < 0.5,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const draw = current.squares.every(checkForDraw);
    var gameMessage = "game-message";

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
    if (winner) {
      status = "Winner: " + winner[0];
      winner[1].map( (key) => document.getElementsByClassName('square')[key].className += ' winning-move')
      gameMessage += " winner"
    } else if (draw) {
      status = "It's a draw"
    } else {
      status = "Next player : " + (this.state.xIsNext ? "X" : "O");
      Array.from(document.getElementsByClassName('square')).forEach(function(element) {element.className = 'square';});
    }

    return (
      <div className="game">
        <div className={gameMessage}>{status}</div>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="menu-button-row">
          <button id="history-back-button" onClick={() => this.goBack()}><TiArrowBack /></button>
          <button id="history-forward-button" onClick={() => this.goForward()}><TiArrowForward /></button>
          <button id="reset-game-button" onClick={() => this.resetGame()}><TiRefresh /></button>
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
      return [squares[a], lines[i]];
    }
  }
  return null;
}

function getPostionString(position) {
  var counter = -1;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      counter++;
      if (counter === position) {
        return 'col ' + (++j) + ', row ' + (++i);
      }
    }
  }

  return null;
}

