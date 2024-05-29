import React from 'react';
// import './MazeGrid.css'; // CSS file for styling

const MazeGrid = ({ maze, start, end, onClick }) => {
  // Rendering the maze grid
  return (
    <div className="maze-grid">
      {maze.map((row, rowIndex) => (
        <div key={rowIndex} className="maze-row">
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`maze-cell ${cell === 1 ? 'wall' : ''} ${start[0] === rowIndex && start[1] === colIndex ? 'start' : ''} ${end[0] === rowIndex && end[1] === colIndex ? 'end' : ''}`}
              onClick={() => onClick(rowIndex, colIndex)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MazeGrid;
