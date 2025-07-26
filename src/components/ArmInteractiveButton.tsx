// src/components/ArmInteractiveButton.tsx
import React, { useRef, useEffect, useState } from 'react';

interface ArmInteractiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  armPositions: { x: number; y: number }[]; // Accepts multiple arm positions
  children: React.ReactNode;
}

const ArmInteractiveButton: React.FC<ArmInteractiveButtonProps> = ({ armPositions, children, ...props }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (!ref.current || !armPositions.length) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setHighlight(
      armPositions.some(pos => {
        const dx = pos.x - centerX;
        const dy = pos.y - centerY;
        return Math.sqrt(dx * dx + dy * dy) < 48;
      })
    );
  }, [armPositions]);

  return (
    <button
      ref={ref}
      className={`group relative px-4 py-2 border-2 border-black font-mono bg-white transition-all
        hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        ${highlight ? 'ring-4 ring-pink-400 scale-105 z-10' : ''}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default ArmInteractiveButton;
