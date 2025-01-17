import React, { useState, useEffect } from 'react';

const NavigationPad: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'n') {
      setIsOpen((prev) => !prev); // Toggle navigation pad visibility
    }
    if (event.key === 'Escape') {
      setIsOpen(false); // Close the navigation pad
    }
  };

  useEffect(() => {
    // Add event listener for keydown events
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      // Clean up event listener
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="relative flex flex-col items-center justify-center bg-white border-2 border-black p-4 rounded-md shadow-lg">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-4 font-mono">Navigation Pad</h2>
            <div className="grid grid-cols-3 gap-4">
              <button className="p-4 border-2 border-black hover:bg-gray-200 transition-colors">Button 1</button>
              <button className="p-4 border-2 border-black hover:bg-gray-200 transition-colors">Button 2</button>
              <button className="p-4 border-2 border-black hover:bg-gray-200 transition-colors">Button 3</button>
              <button className="p-4 border-2 border-black hover:bg-gray-200 transition-colors">Button 4</button>
              <button className="p-4 border-2 border-black hover:bg-gray-200 transition-colors">Button 5</button>
              <button className="p-4 border-2 border-black hover:bg-gray-200 transition-colors">Button 6</button>
              <button className="p-4 border-2 border-black hover:bg-gray-200 transition-colors">Button 7</button>
              <button className="p-4 border-2 border-black hover:bg-gray-200 transition-colors">Button 8</button>
              <button className="p-4 border-2 border-black hover:bg-gray-200 transition-colors">Button 9</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavigationPad;
