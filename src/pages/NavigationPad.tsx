// NavigationPad.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaFolderOpen, FaUser, FaCog, FaBell, FaEnvelope, FaChartBar, FaStar, FaQuestion } from 'react-icons/fa';

const BUTTONS = [
  { icon: <FaHome />, label: 'Home', shortcut: '1' },
  { icon: <FaFolderOpen />, label: 'Projects', shortcut: '2' },
  { icon: <FaUser />, label: 'Profile', shortcut: '3' },
  { icon: <FaCog />, label: 'Settings', shortcut: '4' },
  { icon: <FaBell />, label: 'Notifications', shortcut: '5' },
  { icon: <FaEnvelope />, label: 'Messages', shortcut: '6' },
  { icon: <FaChartBar />, label: 'Analytics', shortcut: '7' },
  { icon: <FaStar />, label: 'Favorites', shortcut: '8' },
  { icon: <FaQuestion />, label: 'Help', shortcut: '9' },
];

const NAV_KEYS = [
  'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
  '1','2','3','4','5','6','7','8','9',
  'Enter', ' ', 'Escape', 'N', 'n'
];

const BLOCKED_KEYS = [
  'w','a','s','d','W','A','S','D',
  'ArrowUp','ArrowDown','ArrowLeft','ArrowRight',
  '0'
];

const NavigationPad: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(0);
  const [underConstruction, setUnderConstruction] = useState<string | null>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) {
        if (event.key === 'n' || event.key === 'N') setIsOpen(true);
        return;
      }

      // Block WASD, arrows, and "0" from reaching other handlers
      if (BLOCKED_KEYS.includes(event.key)) {
        event.preventDefault();
        event.stopPropagation();
      }

      // Only handle navigation pad keys
      if (!NAV_KEYS.includes(event.key)) return;

      event.preventDefault();
      event.stopPropagation();

      if (event.key === 'Escape') setIsOpen(false);

      // Arrow navigation
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        let row = Math.floor(focused / 3);
        let col = focused % 3;
        if (event.key === 'ArrowUp') row = (row + 2) % 3;
        if (event.key === 'ArrowDown') row = (row + 1) % 3;
        if (event.key === 'ArrowLeft') col = (col + 2) % 3;
        if (event.key === 'ArrowRight') col = (col + 1) % 3;
        setFocused(row * 3 + col);
      }

      // 1-9 shortcuts
      if (/^[1-9]$/.test(event.key)) {
        const idx = parseInt(event.key, 10) - 1;
        handleButtonAction(idx);
      }

      // Enter/Space triggers focused button
      if (event.key === 'Enter' || event.key === ' ') {
        handleButtonAction(focused);
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
    // eslint-disable-next-line
  }, [isOpen, focused]);

  useEffect(() => {
    if (isOpen && buttonRefs.current[focused]) {
      buttonRefs.current[focused]?.focus();
    }
  }, [isOpen, focused]);

  const handleButtonAction = (idx: number) => {
    if (idx === 0) {
      navigate('/home');
      setIsOpen(false);
    } else if (idx === 1) {
      navigate('/projects');
      setIsOpen(false);
    } else {
      setUnderConstruction(BUTTONS[idx].label);
      setTimeout(() => setUnderConstruction(null), 1200);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: 'rgba(0,0,0,0.10)' }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0"
            onClick={() => setIsOpen(false)}
            style={{ cursor: 'pointer' }}
          ></div>

          {/* Modal */}
          <div
            className="relative flex flex-col items-center justify-center border-2 border-black bg-white p-8 rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            style={{
              minWidth: 380,
              fontFamily: 'monospace',
              zIndex: 10,
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 border-2 border-black flex items-center justify-center rounded-full hover:bg-black hover:text-white transition-all font-mono text-xl"
              aria-label="Close"
              style={{ boxShadow: '2px 2px 0px 0px #000' }}
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-6 font-mono tracking-wide underline decoration-2">Navigation Pad</h2>
            <div className="grid grid-cols-3 gap-4">
              {BUTTONS.map((btn, idx) => (
                <button
                  key={btn.label}
                  ref={el => (buttonRefs.current[idx] = el)}
                  className={`
                    flex flex-col items-center justify-center px-6 py-5 border-2 border-black rounded-lg bg-white font-mono
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                    hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                    transition-all duration-200 focus:ring-2 focus:ring-blue-400 outline-none
                    ${focused === idx ? 'ring-2 ring-blue-400' : ''}
                    animate-fade-in-up
                  `}
                  style={{
                    animationDelay: `${idx * 60}ms`,
                    animationFillMode: 'both',
                    cursor: idx < 2 ? 'pointer' : 'pointer',
                    opacity: 1,
                  }}
                  tabIndex={0}
                  onClick={() => handleButtonAction(idx)}
                  title={`${btn.label} (Shortcut: ${btn.shortcut})`}
                >
                  <span className="text-2xl mb-1">{btn.icon}</span>
                  <span className="font-semibold">{btn.label}</span>
                  <span className="text-xs mt-1 text-gray-500">[{btn.shortcut}]</span>
                </button>
              ))}
            </div>
            <div className="mt-6 text-sm text-gray-700 font-mono">
              <span>Use <b>N</b> to open, <b>Esc</b> to close, <b>Arrows</b> to move, <b>1-9</b> to select</span>
            </div>
            {underConstruction && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-6 px-6 py-2 border-2 border-black bg-white rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-mono text-base text-gray-800 animate-fade-in-up">
                {underConstruction} — under construction
              </div>
            )}
          </div>

          {/* Animations for fade-in-up */}
          <style>
            {`
              @keyframes fade-in-up {
                0% {
                  opacity: 0;
                  transform: translateY(30px) scale(0.95);
                }
                100% {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
              .animate-fade-in-up {
                animation: fade-in-up 0.4s cubic-bezier(0.22, 1, 0.36, 1);
              }
            `}
          </style>
        </div>
      )}
    </>
  );
};

export default NavigationPad;
