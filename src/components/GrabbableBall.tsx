
// src/components/GrabbableBall.tsx
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface GrabbableBallProps {
  armPosition: { x: number; y: number } | null;
  gripping: boolean;
  color?: string;
  icon?: string;
  start?: { x: number; y: number };
}

const REST_Y_OFFSET = 0; // Ball sits on the ground

const GrabbableBall: React.FC<GrabbableBallProps> = ({
  armPosition,
  gripping,
  color = '#fff',
  icon = '●',
  start = { x: 400, y: 400 }
}) => {
  const [grabbed, setGrabbed] = useState(false);
  const controls = useAnimation();

  // Detect grab/release
  useEffect(() => {
    if (!armPosition) return;
    if (gripping && !grabbed) {
      const dx = armPosition.x - start.x;
      const dy = armPosition.y - start.y;
      if (Math.sqrt(dx * dx + dy * dy) < 40) {
        setGrabbed(true);
      }
    }
    if (!gripping && grabbed) {
      setGrabbed(false);
      controls.start({
        x: 0,
        y: REST_Y_OFFSET,
        transition: { type: "spring", stiffness: 200, damping: 12 }
      });
    }
  }, [armPosition, gripping, grabbed, controls, start.x, start.y]);

  // Follow arm when grabbed
  useEffect(() => {
    if (grabbed && armPosition) {
      controls.start({
        x: armPosition.x - start.x,
        y: armPosition.y - start.y,
        transition: { type: "spring", stiffness: 600, damping: 30 }
      });
    }
  }, [grabbed, armPosition, controls, start.x, start.y]);

  return (
    <motion.div
      animate={controls}
      initial={{ x: 0, y: 0 }}
      style={{
        position: 'absolute',
        left: start.x,
        top: start.y,
        width: 48,
        height: 48,
        borderRadius: 24,
        background: color,
        border: '3px solid #222',
        boxShadow: '4px 4px 0px 0px #000',
        zIndex: 30,
        cursor: grabbed ? 'grabbing' : 'grab',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        color: '#222',
        fontSize: 24,
        fontFamily: 'monospace',
        userSelect: 'none',
      }}
    >
      {icon}
    </motion.div>
  );
};

export default GrabbableBall;
