import React from 'react';

// PUBLIC_INTERFACE
function PlayerStatus({ currentPlayer, winner, draw }) {
  /** 
   * PlayerStatus shows whose turn it is, or winner/draw status.
   * @param {string} currentPlayer - 'X' or 'O'
   * @param {string|null} winner - null or winner symbol
   * @param {boolean} draw - true if draw
  */
  return (
    <div className="ttt-status">
      {winner
        ? <span className="ttt-winner">🏆 Winner: {winner}</span>
        : draw
          ? <span className="ttt-draw">🤝 Draw!</span>
          : <span className="ttt-turn">Turn: <b>{currentPlayer}</b></span>
      }
    </div>
  );
}

export default PlayerStatus;
