// src/components/RoboticArm2D.tsx
import React, { useRef, useState, useEffect } from 'react';

const L1 = 120;
const L2 = 100;

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function getIK(
  base: { x: number; y: number },
  x: number,
  y: number,
  bendDirection: 'left' | 'right'
) {
  const dx = x - base.x;
  const dy = y - base.y;
  const d = Math.sqrt(dx * dx + dy * dy);
  const reach = clamp(d, 10, L1 + L2 - 10);
  const angleA = Math.acos(
    clamp((L1 * L1 + reach * reach - L2 * L2) / (2 * L1 * reach), -1, 1)
  );
  const angleB = Math.acos(
    clamp((L1 * L1 + L2 * L2 - reach * reach) / (2 * L1 * L2), -1, 1)
  );
  const sign = bendDirection === 'right' ? 1 : -1;
  const theta1 = Math.atan2(dy, dx) - sign * angleA;
  const theta2 = sign * (Math.PI - angleB);
  const effector = {
    x: base.x + L1 * Math.cos(theta1) + L2 * Math.cos(theta1 + theta2),
    y: base.y + L1 * Math.sin(theta1) + L2 * Math.sin(theta1 + theta2),
  };
  return { theta2, theta3, effector };
}

interface RoboticArm2DProps {
  base: { x: number; y: number };
  endEffectorColor: string;
  controlKeys: 'wasd' | 'arrows';
  bendDirection?: 'left' | 'right';
  defaultTarget?: { x: number; y: number };
  onEndEffectorMove?: (pos: { x: number; y: number }) => void;
  onGripChange?: (gripping: boolean) => void;
}

const keyMap = {
  wasd: { up: 'w', down: 's', left: 'a', right: 'd', grip: 'x' },
  arrows: { up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight', grip: 'y' },
};

const RoboticArm2D: React.FC<RoboticArm2DProps> = ({
  base,
  endEffectorColor,
  controlKeys,
  bendDirection = 'right',
  defaultTarget,
  onEndEffectorMove,
  onGripChange,
}) => {
  const [target, setTarget] = useState(
    defaultTarget || { x: base.x + 80, y: base.y - 40 }
  );
  const [dragging, setDragging] = useState(false);
  const [gripping, setGripping] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Track which keys are held down
  const heldKeys = useRef<{ [key: string]: boolean }>({});

  // Multi-key movement effect and grip
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const handleKeyDown = (e: KeyboardEvent) => {
      heldKeys.current[e.key] = true;
      // Grip logic
      if (e.key === keyMap[controlKeys].grip) {
        setGripping(true);
        if (onGripChange) onGripChange(true);
      }
      if (!interval) {
        interval = setInterval(() => {
          setTarget((prev) => {
            let { x, y } = prev;
            const step = 6;
            const map = keyMap[controlKeys];
            if (heldKeys.current[map.up]) y -= step;
            if (heldKeys.current[map.down]) y += step;
            if (heldKeys.current[map.left]) x -= step;
            if (heldKeys.current[map.right]) x += step;
            return { x, y };
          });
        }, 16); // ~60fps
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      heldKeys.current[e.key] = false;
      // Release grip
      if (e.key === keyMap[controlKeys].grip) {
        setGripping(false);
        if (onGripChange) onGripChange(false);
      }
      // If no movement keys are held, clear interval
      const map = keyMap[controlKeys];
      if (
        !heldKeys.current[map.up] &&
        !heldKeys.current[map.down] &&
        !heldKeys.current[map.left] &&
        !heldKeys.current[map.right]
      ) {
        if (interval) clearInterval(interval);
        interval = null;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (interval) clearInterval(interval);
    };
  }, [controlKeys, onGripChange]);

  // Prevent text selection while dragging
  useEffect(() => {
    if (dragging) {
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.userSelect = '';
    }
    return () => {
      document.body.style.userSelect = '';
    };
  }, [dragging]);

  // Global mousemove/mouseup for smooth drag
  useEffect(() => {
    if (!dragging) return;
    const handleMove = (e: MouseEvent) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setTarget({ x, y });
    };
    const handleUp = () => setDragging(false);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [dragging]);

  const handleMouseDown = () => setDragging(true);
  const handleSvgClick = (e: React.MouseEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTarget({ x, y });
  };

  // Calculate joint positions
  const { theta1, theta2, effector } = getIK(base, target.x, target.y, bendDirection);
  const joint = {
    x: base.x + L1 * Math.cos(theta1),
    y: base.y + L1 * Math.sin(theta1),
  };

  // Claw: two pincers at an angle, with a small gap
  const clawLength = 18;
  const clawAngle = gripping ? Math.PI / 18 : Math.PI / 7;
  const clawGap = gripping ? 0.05 : 0.18;
  const claw1 = {
    x: effector.x + clawLength * Math.cos(theta1 + theta2 + clawAngle + clawGap),
    y: effector.y + clawLength * Math.sin(theta1 + theta2 + clawAngle + clawGap),
  };
  const claw2 = {
    x: effector.x + clawLength * Math.cos(theta1 + theta2 - clawAngle - clawGap),
    y: effector.y + clawLength * Math.sin(theta1 + theta2 - clawAngle - clawGap),
  };

  // SVG size
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Notify parent of effector position
  useEffect(() => {
    if (typeof onEndEffectorMove === 'function') {
      onEndEffectorMove(effector);
    }
    // eslint-disable-next-line
  }, [effector.x, effector.y]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 20,
      }}
      onClick={handleSvgClick}
    >
      {/* Arm base */}
      <circle cx={base.x} cy={base.y} r={10} fill="#222" />
      {/* First arm */}
      <line x1={base.x} y1={base.y} x2={joint.x} y2={joint.y} stroke="#4b5563" strokeWidth={12} strokeLinecap="round" />
      {/* Second arm */}
      <line x1={joint.x} y1={joint.y} x2={effector.x} y2={effector.y} stroke="#6b7280" strokeWidth={9} strokeLinecap="round" />
      {/* Joint */}
      <circle cx={joint.x} cy={joint.y} r={7} fill="#374151" />
      {/* End effector (claw base) */}
      <circle cx={effector.x} cy={effector.y} r={4.5} fill={endEffectorColor} />
      {/* Claw pincers */}
      <line x1={effector.x} y1={effector.y} x2={claw1.x} y2={claw1.y} stroke={endEffectorColor} strokeWidth={4} strokeLinecap="round" />
      <line x1={effector.x} y1={effector.y} x2={claw2.x} y2={claw2.y} stroke={endEffectorColor} strokeWidth={4} strokeLinecap="round" />
      {/* Target pointer (smaller) */}
      <circle
        cx={target.x}
        cy={target.y}
        r={8}
        fill={endEffectorColor}
        stroke="#fbbf24"
        strokeWidth={2}
        style={{ cursor: 'grab', pointerEvents: 'all' }}
        onMouseDown={handleMouseDown}
      />
    </svg>
  );
};

export default RoboticArm2D;
