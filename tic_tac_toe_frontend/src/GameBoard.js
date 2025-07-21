import React from 'react';

// PUBLIC_INTERFACE
function GameBoard({ board, onCellClick, disabled }) {
  /** 
   * GameBoard displays the 3x3 Tic Tac Toe grid and handles cell clicks.
   * @param {Array} board - 2D array [ [cell, ...], ...] representing the board
   * @param {Function} onCellClick - callback for when a cell is clicked
   * @param {Boolean} disabled - disables clicks if true
  */
  return (
    <div className="ttt-board" aria-label="Tic Tac Toe board">
      {board.map((row, rowIdx) =>
        row.map((cell, colIdx) => (
          <button
            key={`${rowIdx}-${colIdx}`}
            className={`ttt-cell${cell ? ' filled' : ''}`}
            aria-label={`cell ${rowIdx * 3 + colIdx + 1}${cell ? `, occupied by ${cell}` : ''}`}
            onClick={() => !disabled && onCellClick(rowIdx, colIdx)}
            disabled={!!cell || disabled}
            tabIndex="0"
          >{cell}</button>
        ))
      )}
    </div>
  );
}

export default GameBoard;
