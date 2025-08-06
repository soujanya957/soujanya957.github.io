// src/hooks/useArmPresets.ts
import { useRef, useState, useCallback } from 'react';

const ANIMATION_DURATION = 1200; // ms per preset step

// Example presets: arrays of { left: {x, y}, right: {x, y} }
const PRESETS = [
  [
    { left: { x: 300, y: 300 }, right: { x: 1100, y: 300 } },
    { left: { x: 300, y: 200 }, right: { x: 1100, y: 400 } },
    { left: { x: 300, y: 300 }, right: { x: 1100, y: 300 } },
    { left: { x: 300, y: 400 }, right: { x: 1100, y: 200 } },
    { left: { x: 300, y: 300 }, right: { x: 1100, y: 300 } },
  ],
  [
    { left: { x: 700, y: 200 }, right: { x: 800, y: 200 } },
    { left: { x: 750, y: 250 }, right: { x: 750, y: 250 } },
    { left: { x: 700, y: 200 }, right: { x: 800, y: 200 } },
  ],
  [
    { left: { x: 900, y: 400 }, right: { x: 600, y: 400 } },
    { left: { x: 800, y: 300 }, right: { x: 700, y: 300 } },
    { left: { x: 900, y: 400 }, right: { x: 600, y: 400 } },
  ],
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpPos(a: { x: number; y: number }, b: { x: number; y: number }, t: number) {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) };
}

export function useArmPresets(
  leftDefault: { x: number; y: number },
  rightDefault: { x: number; y: number }
) {
  const [leftTarget, setLeftTarget] = useState<{ x: number; y: number } | null>(null);
  const [rightTarget, setRightTarget] = useState<{ x: number; y: number } | null>(null);
  const animatingRef = useRef(false);

  const triggerPreset = useCallback((presetIndex: number) => {
    const preset = PRESETS[presetIndex];
    if (!preset || animatingRef.current) return;
    animatingRef.current = true;
    let step = 0;
    let startLeft = leftTarget || leftDefault;
    let startRight = rightTarget || rightDefault;

    function nextStep() {
      if (step >= preset.length) {
        animatingRef.current = false;
        setLeftTarget(null);
        setRightTarget(null);
        return;
      }
      const endLeft = preset[step].left;
      const endRight = preset[step].right;
      const startTime = performance.now();

      function animateFrame(now: number) {
        const t = Math.min(1, (now - startTime) / ANIMATION_DURATION);
        setLeftTarget(lerpPos(startLeft, endLeft, t));
        setRightTarget(lerpPos(startRight, endRight, t));
        if (t < 1) {
          requestAnimationFrame(animateFrame);
        } else {
          startLeft = endLeft;
          startRight = endRight;
          step++;
          setTimeout(nextStep, 80);
        }
      }
      requestAnimationFrame(animateFrame);
    }
    nextStep();
  }, [leftDefault, rightDefault, leftTarget, rightTarget]);

  return {
    leftTarget,
    rightTarget,
    animating: animatingRef.current,
    triggerPreset,
  };
}
