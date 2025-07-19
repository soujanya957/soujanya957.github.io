// src/pages/RightSection.tsx
import React, { useState, useEffect } from 'react';

interface RightSectionProps {
  boxColors: string[];
  setBoxColors: React.Dispatch<React.SetStateAction<string[]>>;
  clearColors: () => void;
}

const HIDE_WIDTH = 900; // px

const getRandomPastelColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 85%)`;
};

const DEFAULT_COLOR = '#ffffff';

const RightSection: React.FC<RightSectionProps> = ({ boxColors, setBoxColors, clearColors }) => {
  const [rows, setRows] = useState(8);
  const [columns, setColumns] = useState(8);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const total = rows * columns;
    if (boxColors.length !== total) {
      setBoxColors((prev) => {
        const arr = prev.slice(0, total);
        while (arr.length < total) arr.push(DEFAULT_COLOR);
        return arr;
      });
    }
    // eslint-disable-next-line
  }, [rows, columns]);

  if (windowWidth < HIDE_WIDTH) {
    return null;
  }

  // Drag to draw and single click to color
  const handleMouseDown = (index: number) => {
    const colorToApply = boxColors[index] === DEFAULT_COLOR ? getRandomPastelColor() : DEFAULT_COLOR;
    setIsDrawing(true);
    setDrawColor(colorToApply);
    setBoxColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = colorToApply;
      return newColors;
    });
  };

  const handleMouseEnter = (index: number) => {
    if (isDrawing && drawColor) {
      setBoxColors((prevColors) => {
        const newColors = [...prevColors];
        newColors[index] = drawColor;
        return newColors;
      });
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setDrawColor(null);
  };

  const increaseGridSize = () => {
    setRows((prevRows) => prevRows + 1);
    setColumns((prevColumns) => prevColumns + 1);
  };

  const decreaseGridSize = () => {
    if (rows > 2 && columns > 2) {
      setRows((prevRows) => prevRows - 1);
      setColumns((prevColumns) => prevColumns - 1);
    }
  };

  const handleClearColors = () => {
    setBoxColors(Array(rows * columns).fill(DEFAULT_COLOR));
  };

  const fillAllRandom = () => {
    setBoxColors(Array(rows * columns).fill('').map(getRandomPastelColor));
  };

  // Responsive grid size
  const gridSize = Math.min(420, Math.max(220, window.innerWidth / 2.5));
  const cellSize = gridSize / Math.max(rows, columns);

  // The smaller the grid, the rounder the corners (max 50% for 2x2, min 6px for 16x16+)
  const getCellRadius = () => {
    const minDim = Math.min(rows, columns);
    if (minDim <= 2) return '50%';
    if (minDim <= 4) return '30%';
    if (minDim <= 8) return '16px';
    if (minDim <= 12) return '10px';
    return '6px';
  };

  return (
    <div className="md:w-1/2 mt-12 md:mt-0 p-4 relative">
      <div
        className="border-2 border-black p-8 transition-transform hover:translate-x-2 hover:translate-y-2 relative shadow-xl rounded-xl bg-white"
        style={{
          background: '#fff',
        }}
      >
        <div
          className="w-full select-none"
          style={{
            height: gridSize,
            border: '2px solid #000',
            borderRadius: 16,
            position: 'relative',
            overflow: 'hidden',
            background: '#f8fafc',
            transition: 'background 0.5s',
            userSelect: 'none',
          }}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="absolute inset-0 grid"
            style={{
              gridTemplateRows: `repeat(${rows}, 1fr)`,
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gap: 2,
            }}
          >
            {boxColors.slice(0, rows * columns).map((color, index) => (
              <div
                key={index}
                className="border border-black transition-all duration-200 cursor-pointer hover:scale-110"
                style={{
                  backgroundColor: color,
                  borderRadius: getCellRadius(),
                  boxShadow: color !== DEFAULT_COLOR ? '0 2px 8px 0 rgba(0,0,0,0.08)' : undefined,
                  width: cellSize,
                  height: cellSize,
                  transition: 'background 0.2s, transform 0.2s, border-radius 0.2s',
                }}
                onMouseDown={() => handleMouseDown(index)}
                onMouseEnter={() => handleMouseEnter(index)}
              />
            ))}
          </div>
          {/* Clear Button */}
          <button
            onClick={handleClearColors}
            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-black text-white rounded-full border-2 border-white z-10 shadow hover:bg-red-600 transition"
            title="Clear Colors"
          >
            <span className="text-lg font-bold">✕</span>
          </button>
          {/* Plus and Minus Button to change grid size */}
          <div className="absolute top-2 left-2 flex items-center space-x-1 z-10">
            <button
              onClick={increaseGridSize}
              className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full border-2 border-white shadow hover:bg-green-600 transition"
              title="Increase Grid Size"
            >
              <span className="text-lg font-bold">+</span>
            </button>
            <button
              onClick={decreaseGridSize}
              className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full border-2 border-white shadow hover:bg-yellow-600 transition"
              title="Decrease Grid Size"
            >
              <span className="text-lg font-bold">-</span>
            </button>
          </div>
          {/* Fill Button */}
          <div className="absolute bottom-2 left-2 flex items-center space-x-2 z-10">
            <button
              onClick={fillAllRandom}
              className="px-3 py-1 bg-gradient-to-r from-pink-400 to-yellow-300 text-black rounded-full border-2 border-white shadow hover:from-yellow-300 hover:to-pink-400 transition"
              title="Fill All"
            >
              Fill
            </button>
          </div>
        </div>
        <div className="text-center mt-4 text-gray-600 text-sm select-none">
          Click or drag to color. Use Fill or Clear. Resize the grid for more fun!
        </div>
      </div>
    </div>
  );
};

export default RightSection;
