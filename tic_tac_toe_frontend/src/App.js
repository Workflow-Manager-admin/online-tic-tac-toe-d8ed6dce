import React, { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './GameBoard';
import PlayerStatus from './PlayerStatus';
import ScoreBoard from './ScoreBoard';
import RestartControls from './RestartControls';

// Game utils
const initialBoard = () => Array(3).fill(null).map(() => Array(3).fill(null));
const getWinner = (board) => {
  // Check rows/columns/diags for winner
  for (let i = 0; i < 3; i++) {
    // rows
    if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return board[i][0];
    // cols
    if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) return board[0][i];
  }
  // diags
  if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return board[0][0];
  if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return board[0][2];
  return null;
};
const isDraw = (board) => board.flat().every(cell => cell);

function App() {
  const [theme, setTheme] = useState('light');
  const [board, setBoard] = useState(initialBoard());
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Effect: check for winner or draw every time the board updates
  useEffect(() => {
    const w = getWinner(board);
    if (w) {
      setWinner(w);
      setDraw(false);
      if (w === 'X') setXScore(xs => xs + 1);
      if (w === 'O') setOScore(os => os + 1);
    } else if (isDraw(board)) {
      setWinner(null);
      setDraw(true);
    } else {
      setWinner(null);
      setDraw(false);
    }
  // eslint-disable-next-line
  }, [board]);

  // PUBLIC_INTERFACE
  const handleCellClick = (row, col) => {
    if (winner || draw || board[row][col]) return;
    setBoard(b => {
      const newB = b.map(r => r.slice());
      newB[row][col] = currentPlayer;
      return newB;
    });
    setCurrentPlayer(p => (p === 'X' ? 'O' : 'X'));
  };

  // PUBLIC_INTERFACE
  const handleRestart = () => {
    setBoard(initialBoard());
    setCurrentPlayer(winner === 'O' ? 'X' : 'O'); // Loser starts next
    setWinner(null);
    setDraw(false);
  };

  // PUBLIC_INTERFACE
  const handleNewGame = () => {
    setBoard(initialBoard());
    setCurrentPlayer('X');
    setWinner(null);
    setDraw(false);
    setXScore(0);
    setOScore(0);
  };

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Theme toggle and title */}
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <div className="ttt-title-block">
          <h1 className="ttt-title" style={{color: "#2d89ef"}}>Tic Tac Toe</h1>
          <p className="ttt-subtitle">Minimal, Modern, Two-Player Game</p>
        </div>
        {/* Status & score */}
        <PlayerStatus currentPlayer={currentPlayer} winner={winner} draw={draw} />
        <ScoreBoard xScore={xScore} oScore={oScore} />
        {/* Game board */}
        <GameBoard 
          board={board} 
          onCellClick={handleCellClick} 
          disabled={!!winner || draw}
        />
        {/* Controls */}
        <RestartControls onRestart={handleRestart} onNewGame={handleNewGame} />
      </header>
    </div>
  );
}

export default App;
