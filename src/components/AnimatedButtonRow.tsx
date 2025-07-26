// src/components/AnimatedButtonRow.tsx
import React from 'react';

interface AnimatedButtonRowProps {
  buttons: { text: string; onClick: () => void; key: string }[];
}

const AnimatedButtonRow: React.FC<AnimatedButtonRowProps> = ({ buttons }) => (
  <div className="flex flex-wrap gap-4">
    {buttons.map((button) => (
      <button
        key={button.key}
        onClick={button.onClick}
        className="group relative px-6 py-3 border-2 border-black font-mono bg-white hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
      >
        {button.text}
      </button>
    ))}
  </div>
);

export default AnimatedButtonRow;
