import React, { useState, useEffect, useRef } from 'react';

const ScrollDial: React.FC = () => {
  const [rotation, setRotation] = useState(0); // Dial's current rotation
  const dialRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false); // Track drag state
  const lastY = useRef(0); // Track last Y position during drag

  // Function to start dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastY.current = e.clientY; // Record starting Y position
  };

  // Function to handle dragging and scrolling
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;

    const deltaY = e.clientY - lastY.current; // Calculate vertical movement
    lastY.current = e.clientY;

    const rotationDelta = deltaY * 5; // Adjust for sensitivity
    const newRotation = rotation + rotationDelta;

    setRotation(newRotation);

    // Scroll the page based on the drag movement
    window.scrollBy({
      top: deltaY * 5, // Adjust sensitivity for scrolling
      behavior: 'auto',
    });
  };

  // Function to stop dragging
  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Sync rotation with page scroll
  const handleScroll = () => {
    const scrollFactor = 0.5; // Adjust sensitivity
    const newRotation = window.scrollY * scrollFactor;
    setRotation(newRotation);
  };

  // Add/remove event listeners for drag and scroll
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [rotation]);

  return (
    <div
      ref={dialRef}
      className="fixed bottom-4 left-4 w-32 h-32 rounded-full border-4 border-gray-800 bg-gray-50 flex items-center justify-center cursor-grab active:cursor-grabbing"
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Arrow Marker */}
      <div
        className="absolute w-2 h-12 bg-gray-800 rounded-full"
        style={{
          top: '16px',
        }}
      ></div>

      {/* Static Center */}
      <div className="absolute w-6 h-6 bg-gray-800 rounded-full"></div>
    </div>
  );
};

export default ScrollDial;
