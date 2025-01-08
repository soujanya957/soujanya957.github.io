// src/pages/RightSection.tsx
import React, { useState } from 'react';

interface RightSectionProps {
  boxColors: string[];
  setBoxColors: React.Dispatch<React.SetStateAction<string[]>>;
  clearColors: () => void;
}

const RightSection: React.FC<RightSectionProps> = ({ boxColors, setBoxColors, clearColors }) => {
  const [rows, setRows] = useState(6);
  const [columns, setColumns] = useState(6);

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Function to change the color of a box when clicked
  const handleBoxClick = (index: number) => {
    setBoxColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = newColors[index] === '#ffffff' ? getRandomColor() : '#ffffff';
      return newColors;
    });
  };

  // Function to increase grid size
  const increaseGridSize = () => {
    setRows((prevRows) => prevRows + 1);
    setColumns((prevColumns) => prevColumns + 1);
    setBoxColors((prevColors) => [
      ...prevColors,
      ...Array((columns + 1) * (rows + 1)).fill('#ffffff'),
    ]);
  };

  // Function to decrease grid size
  const decreaseGridSize = () => {
    if (rows > 1 && columns > 1) {
      setRows((prevRows) => prevRows - 1);
      setColumns((prevColumns) => prevColumns - 1);
      setBoxColors((prevColors) => prevColors.slice(0, (rows - 1) * (columns - 1)));
    }
  };

  // Updated clearColors function to keep grid size intact
  const handleClearColors = () => {
    setBoxColors(Array(rows * columns).fill('#ffffff'));
  };

  // Commenting out the save canvas function for now
  /*
  // Function to save the current canvas state
  const handleSaveCanvas = () => {
    const canvasData = JSON.stringify({ boxColors, rows, columns });
    const blob = new Blob([canvasData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'canvas.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Free up memory
  };
  */

  return (
    <div className="md:w-1/2 mt-12 md:mt-0 p-4 relative">
      <div className="border-2 border-black p-8 transition-transform hover:translate-x-2 hover:translate-y-2 relative">
        <div className="w-full h-96 border-2 border-black relative overflow-hidden">
          <div
            className="absolute inset-0 grid"
            style={{ gridTemplateRows: `repeat(${rows}, 1fr)`, gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {boxColors.slice(0, rows * columns).map((color, index) => (
              <div
                key={index}
                className="border border-black transition-colors cursor-pointer hover:bg-gray-200" // Gray highlight on hover
                style={{ backgroundColor: color }}
                onClick={() => handleBoxClick(index)}
              />
            ))}
          </div>
          {/* Clear Button positioned at the top right corner with a higher z-index */}
          <button
            onClick={handleClearColors}
            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-black text-white rounded-full border-2 border-white z-10"
            title="Clear Colors"
          >
            <span className="text-lg font-bold">X</span>
          </button>
          {/* Plus and Minus Button to change grid size */}
          <div className="absolute top-2 left-2 flex items-center space-x-1 z-10">
            <button
              onClick={increaseGridSize}
              className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full border-2 border-white"
              title="Increase Grid Size"
            >
              <span className="text-lg font-bold">+</span>
            </button>
            <button
              onClick={decreaseGridSize}
              className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full border-2 border-white"
              title="Decrease Grid Size"
            >
              <span className="text-lg font-bold">-</span>
            </button>
          </div>
          {/* Save Button (commented out for now) */}
          {/* 
          <button
            onClick={handleSaveCanvas}
            className="absolute bottom-2 left-2 w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full border-2 border-white z-10"
            title="Save Canvas"
          >
            <span className="text-lg font-bold">💾</span>
          </button>
          */}
        </div>
      </div>
    </div>
  );
};

export default RightSection;
