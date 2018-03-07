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
    /*
    return (
      <div>
        <div className="board-row">
          {gridIds.map( (id) => {return this.renderSquare(id);})}
        </div>
      </div>
    );
    */
    var buttonKeys = Array.from(Array(9).keys());
    var buttonArray = 
      buttonKeys.map( (key) => {return this.renderSquare(key);}).reduce(function (rows, key, index) {
        return (index % 3 == 0 ? rows.push([key]) : rows[rows.length-1].push(key)) && rows;
      } , []);
    var boardDiv = [];
    for (var i = 0; i < 3; i++) {
      boardDiv.push(<div className="board-row">{buttonArray[i]}</div>);
    }
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