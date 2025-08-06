// src/components/RoboticArm2D.tsx
import React, { useRef, useState, useEffect } from 'react';

// Arm segment lengths (can be made props if desired)
const L1 = 120;
const L2 = 100;

// Clamp value between min and max
function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

// Inverse kinematics for 2D arm
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
  return { theta1, theta2, effector };
}

interface RoboticArm2DProps {
  base: { x: number; y: number };
  endEffectorColor: string;
  controlKeys: 'wasd' | 'arrows';
  bendDirection?: 'left' | 'right';
  defaultTarget?: { x: number; y: number };
  onEndEffectorMove?: (pos: { x: number; y: number; claw1: { x: number; y: number }; claw2: { x: number; y: number } }) => void;
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
  // Responsive SVG dimensions
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Clamp target to SVG bounds
  function clampTarget(x: number, y: number) {
    return {
      x: clamp(x, 0, dimensions.width),
      y: clamp(y, 0, dimensions.height),
    };
  }

  // Target position state
  const [target, setTarget] = useState(
    defaultTarget || { x: base.x + 80, y: base.y - 40 }
  );
  const [dragging, setDragging] = useState(false);
  const [gripping, setGripping] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Track held keys
  const heldKeys = useRef<{ [key: string]: boolean }>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Keyboard movement and grip logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      heldKeys.current[e.key] = true;
      if (e.key === keyMap[controlKeys].grip) {
        setGripping(true);
        onGripChange?.(true);
      }
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          setTarget((prev) => {
            let { x, y } = prev;
            const step = 6;
            const map = keyMap[controlKeys];
            if (heldKeys.current[map.up]) y -= step;
            if (heldKeys.current[map.down]) y += step;
            if (heldKeys.current[map.left]) x -= step;
            if (heldKeys.current[map.right]) x += step;
            // Clamp to SVG bounds
            return clampTarget(x, y);
          });
        }, 16);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      heldKeys.current[e.key] = false;
      if (e.key === keyMap[controlKeys].grip) {
        setGripping(false);
        onGripChange?.(false);
      }
      const map = keyMap[controlKeys];
      if (
        !heldKeys.current[map.up] &&
        !heldKeys.current[map.down] &&
        !heldKeys.current[map.left] &&
        !heldKeys.current[map.right]
      ) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [controlKeys, onGripChange, dimensions]);

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

  // Mouse drag logic
  useEffect(() => {
    if (!dragging) return;
    const handleMove = (e: MouseEvent) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setTarget(clampTarget(x, y));
    };
    const handleUp = () => setDragging(false);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [dragging, dimensions]);

  // Mouse click to move target
  const handleMouseDown = () => setDragging(true);
  const handleSvgClick = (e: React.MouseEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTarget(clampTarget(x, y));
  };

  // Calculate joint positions
  const { theta1, theta2, effector } = getIK(base, target.x, target.y, bendDirection);
  const joint = {
    x: base.x + L1 * Math.cos(theta1),
    y: base.y + L1 * Math.sin(theta1),
  };

  // Claw pincers
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

  // Notify parent of effector and claws position
  useEffect(() => {
    if (onEndEffectorMove) {
      onEndEffectorMove({
        x: effector.x,
        y: effector.y,
        claw1,
        claw2,
      });
    }
    // Only update when effector or claws change
    // eslint-disable-next-line
  }, [effector.x, effector.y, claw1.x, claw1.y, claw2.x, claw2.y]);

  return (
    <svg
      ref={svgRef}
      width={dimensions.width}
      height={dimensions.height}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 20,
      }}
      aria-label="2D Robotic Arm"
      tabIndex={-1}
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
      {/* Target pointer */}
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
