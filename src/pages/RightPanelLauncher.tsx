
// src/pages/RightPanelLauncher.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RightSection from './RightSection';

interface RightPanelLauncherProps {
  boxColors: string[];
  setBoxColors: React.Dispatch<React.SetStateAction<string[]>>;
  clearColors: () => void;
}

const PANEL_WIDTH = 420;
const BUTTON_SIZE = 48;

const BUTTONS = [
  { key: 'draw', icon: '🎨', label: 'Draw', color: 'from-pink-500 to-yellow-400' },
  { key: 'other1', icon: '❓', label: 'Other 1', color: 'from-blue-400 to-cyan-300' },
  { key: 'other2', icon: '➕', label: 'Other 2', color: 'from-green-400 to-lime-300' },
];

const RightPanelLauncher: React.FC<RightPanelLauncherProps> = ({
  boxColors,
  setBoxColors,
  clearColors,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<null | 'draw' | 'other1' | 'other2'>(null);

  // Menu button (three dots)
  const MenuButton = (
    <motion.button
      key="dot-menu"
      initial={{ opacity: 0, scale: 0.8, x: 40 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: 40 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed right-5 bottom-8 z-50 flex items-center justify-center bg-gradient-to-br from-pink-500 to-yellow-400 shadow-lg border-2 border-white"
      style={{
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: '50%',
        cursor: 'pointer',
        boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10)',
        padding: 0,
      }}
      whileHover={{ scale: 1.12, boxShadow: "0 0 24px 6px #fbbf24" }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setMenuOpen(true)}
      aria-label="Open menu"
    >
      <div className="flex flex-col items-center justify-center gap-0.5">
        <span className="block w-1.5 h-1.5 bg-black rounded-full" />
        <span className="block w-1.5 h-1.5 bg-black rounded-full" />
        <span className="block w-1.5 h-1.5 bg-black rounded-full" />
      </div>
    </motion.button>
  );

  // Animated action buttons
  const ActionButtons = (
    <motion.div
      key="button-stack"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed right-7 bottom-8 flex flex-col items-end z-50"
      style={{ gap: 16 }}
    >
      {BUTTONS.map((btn, i) => (
        <motion.button
          key={btn.key}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: -((BUTTON_SIZE + 16) * i), scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            delay: i * 0.07,
          }}
          className={`
            w-12 h-12 rounded-full bg-gradient-to-br ${btn.color}
            shadow-lg border-2 border-white flex items-center justify-center text-2xl font-bold
            focus:outline-none cursor-pointer relative
            hover:scale-110 transition-transform
          `}
          style={{
            boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10)',
            marginBottom: i === BUTTONS.length - 1 ? 0 : 0,
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setActive(btn.key as 'draw' | 'other1' | 'other2');
            setMenuOpen(false);
          }}
          aria-label={btn.label}
        >
          <span>{btn.icon}</span>
          <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 text-xs text-black/60 font-mono pointer-events-none select-none whitespace-nowrap">
            {btn.label}
          </span>
        </motion.button>
      ))}
      {/* Close menu button */}
      <motion.button
        key="close-menu"
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: -((BUTTON_SIZE + 16) * BUTTONS.length), scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.8 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          delay: BUTTONS.length * 0.07,
        }}
        className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center border-2 border-white shadow-lg mt-2"
        style={{
          boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10)',
        }}
        whileHover={{ scale: 1.12, backgroundColor: "#ef4444" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setMenuOpen(false)}
        aria-label="Close menu"
      >
        ×
      </motion.button>
    </motion.div>
  );

  // Stretched panel for the selected action
  const StretchedPanel = (
    <motion.div
      key="stretched"
      initial={{
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: 999,
        right: 20,
        bottom: 32,
        x: 0,
        y: 0,
        boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10)',
        opacity: 1,
      }}
      animate={{
        width: PANEL_WIDTH,
        height: '80vh',
        borderRadius: 24,
        right: 0,
        bottom: '10vh',
        x: 0,
        y: 0,
        boxShadow: '0 8px 64px 0 rgba(0,0,0,0.18)',
        opacity: 1,
        transition: { type: "spring", stiffness: 80, damping: 18 }
      }}
      exit={{
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: 999,
        right: 20,
        bottom: 32,
        opacity: 0,
        transition: { duration: 0.3 }
      }}
      transition={{ type: "spring", stiffness: 80, damping: 18 }}
      className={`
        fixed z-50 flex flex-col items-center justify-center
        bg-gradient-to-br ${BUTTONS.find(b => b.key === active)?.color}
        shadow-2xl border-2 border-white
        overflow-hidden
      `}
      style={{
        minWidth: BUTTON_SIZE,
        minHeight: BUTTON_SIZE,
        maxWidth: PANEL_WIDTH,
        maxHeight: '80vh',
      }}
    >
      {/* Close Button */}
      <motion.button
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center z-10 hover:bg-red-600 transition"
        whileHover={{ scale: 1.15, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActive(null)}
        aria-label="Close Panel"
      >
        ×
      </motion.button>
      {/* Content */}
      <div className="flex-1 flex items-center justify-center w-full h-full">
        {active === 'draw' && (
          <div className="w-full h-full flex items-center justify-center bg-white rounded-2xl shadow-inner">
            <RightSection
              boxColors={boxColors}
              setBoxColors={setBoxColors}
              clearColors={clearColors}
            />
          </div>
        )}
        {active === 'other1' && (
          <div className="w-full h-full flex items-center justify-center text-2xl font-mono text-black/60">
            Coming soon...
          </div>
        )}
        {active === 'other2' && (
          <div className="w-full h-full flex items-center justify-center text-2xl font-mono text-black/60">
            Coming soon...
          </div>
        )}
      </div>
      <motion.div
        className="w-full text-center py-2 text-xs text-gray-400 font-mono"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <span>
          {active === 'draw'
            ? <>Pixel Drawer • <span className="text-pink-400">♥</span> by Soujanya</>
            : <>More features coming soon!</>
          }
        </span>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <AnimatePresence>
        {!menuOpen && active === null && MenuButton}
      </AnimatePresence>
      <AnimatePresence>
        {menuOpen && active === null && ActionButtons}
      </AnimatePresence>
      <AnimatePresence>
        {active && StretchedPanel}
      </AnimatePresence>
    </>
  );
};

export default RightPanelLauncher;
