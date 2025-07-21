import React from 'react';

// PUBLIC_INTERFACE
function ScoreBoard({ xScore, oScore }) {
  /**
   * ScoreBoard displays the scores for X and O players.
   * @param {number} xScore - Score for X
   * @param {number} oScore - Score for O
   */
  return (
    <div className="ttt-scoreboard">
      <span className="ttt-score ttt-x">X: {xScore}</span>
      <span className="ttt-score ttt-o">O: {oScore}</span>
    </div>
  );
}

export default ScoreBoard;
