// src/components/ArmInteractiveButton.tsx
import React, { useRef, useEffect, useState } from 'react';

interface ArmPosition {
  x: number;
  y: number;
  claw1?: { x: number; y: number }; // Optional: claw tip 1
  claw2?: { x: number; y: number }; // Optional: claw tip 2
}

interface ArmInteractiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  armPositions: ArmPosition[];
  gripping?: boolean;
  children: React.ReactNode;
}

function pointInRect(
  px: number,
  py: number,
  rect: { left: number; right: number; top: number; bottom: number }
) {
  return px >= rect.left && px <= rect.right && py >= rect.top && py <= rect.bottom;
}

const ArmInteractiveButton: React.FC<ArmInteractiveButtonProps> = ({
  armPositions,
  gripping,
  children,
  onClick,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [highlight, setHighlight] = useState(false);
  const prevGripping = useRef(false);

  // Proximity detection: highlight if any effector or claw tip is inside the button's bounding box
  useEffect(() => {
    if (!ref.current || !armPositions.length) {
      setHighlight(false);
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const isNear = armPositions.some(pos => {
      // Check effector
      if (pointInRect(pos.x, pos.y, rect)) return true;
      // Check claw tips if present
      if (pos.claw1 && pointInRect(pos.claw1.x, pos.claw1.y, rect)) return true;
      if (pos.claw2 && pointInRect(pos.claw2.x, pos.claw2.y, rect)) return true;
      return false;
    });
    setHighlight(isNear);
  }, [armPositions]);

  // Trigger click when arm grips while highlighted
  useEffect(() => {
    if (
      highlight &&
      gripping &&
      !prevGripping.current // Only on transition from false to true
    ) {
      ref.current?.click();
    }
    prevGripping.current = !!gripping;
  }, [gripping, highlight]);

  // Handle click/tap
  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (typeof onClick === 'function') {
      onClick(e as any);
    }
  };

  return (
    <button
      ref={ref}
      className={`group relative px-4 py-2 border-2 border-black font-mono bg-white transition-all
        hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        ${highlight ? 'ring-4 ring-pink-400 scale-105 z-10' : ''}
      `}
      onClick={handleClick}
      onTouchEnd={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default ArmInteractiveButton;
