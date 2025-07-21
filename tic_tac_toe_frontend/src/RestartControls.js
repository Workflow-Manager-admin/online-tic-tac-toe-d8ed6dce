import React from 'react';

// PUBLIC_INTERFACE
function RestartControls({ onRestart, onNewGame }) {
  /**
   * RestartControls displays buttons for restarting or starting a new game.
   * @param {Function} onRestart - handler for restarting the round (next game, same players)
   * @param {Function} onNewGame - handler for new game (reset scores, fresh start)
   */
  return (
    <div className="ttt-controls">
      <button className="ttt-btn" onClick={onRestart} aria-label="Restart round">
        🔄 Restart Round
      </button>
      <button className="ttt-btn ttt-btn-accent" onClick={onNewGame} aria-label="New game">
        🆕 New Game
      </button>
    </div>
  );
}

export default RestartControls;
