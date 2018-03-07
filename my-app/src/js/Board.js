import React from 'react';
import '../css/index.css';


export default class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}/>
    );
  }

  render() {
    var boardDiv = [];
    var buttonKey = 0;
    console.time('Dauer');
    for (var i = 0; i < 3; i++) {
      var squares = new Array(3);
      for (var j = 0; j < 3; j++) {
        squares[j] = this.renderSquare(buttonKey++);
      }
      boardDiv.push(<div className="board-row">{squares}</div>);
    }
    console.timeEnd('Dauer')
    return (
      <div>
        {boardDiv}
      </div>
    );
  }
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}