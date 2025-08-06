import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import RoboticArm2D from '../components/RoboticArm2D';
import ArmInteractiveButton from '../components/ArmInteractiveButton';
import KeyboardHintToast from '../components/KeyboardHintToast';

type ArmClaw = { x: number; y: number; claw1: { x: number; y: number }; claw2: { x: number; y: number } };

const Home = () => {
  const navigate = useNavigate();
  const [mouseDown, setMouseDown] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Arm state (unchanged)
  const [leftArm, setLeftArm] = useState<ArmClaw | null>(null);
  const [rightArm, setRightArm] = useState<ArmClaw | null>(null);
  const [leftGripping, setLeftGripping] = useState(false);
  const [rightGripping, setRightGripping] = useState(false);
  const [viewport, setViewport] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [armKey, setArmKey] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
      setArmKey(k => k + 1);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavigation = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const cursor = document.getElementById('custom-cursor');
    if (cursor) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }
  }, []);

  const handleMouseDown = useCallback(() => setMouseDown(true), []);
  const handleMouseUp = useCallback(() => setMouseDown(false), []);

  const margin = 60;
  const leftBase = { x: viewport.width * 0.25, y: viewport.height - margin };
  const rightBase = { x: viewport.width * 0.75, y: viewport.height - margin };
  const armLength = 140;
  const leftAngle = (35 * Math.PI) / 180;
  const leftDefault = {
    x: leftBase.x + armLength * Math.cos(leftAngle),
    y: leftBase.y - armLength * Math.sin(leftAngle),
  };
  const rightAngle = (35 * Math.PI) / 180;
  const rightDefault = {
    x: rightBase.x - armLength * Math.cos(rightAngle),
    y: rightBase.y - armLength * Math.sin(rightAngle),
  };

  const armPositions = [
    ...(leftArm ? [leftArm] : []),
    ...(rightArm ? [rightArm] : []),
  ];
  const gripping = leftGripping || rightGripping;

  const handleLeftArmMove = useCallback(
    (data: { x: number; y: number; claw1?: { x: number; y: number }; claw2?: { x: number; y: number } }) => {
      if (data.claw1 && data.claw2) {
        setLeftArm({ x: data.x, y: data.y, claw1: data.claw1, claw2: data.claw2 });
      } else {
        setLeftArm({ x: data.x, y: data.y, claw1: { x: data.x, y: data.y }, claw2: { x: data.x, y: data.y } });
      }
    },
    []
  );

  const handleRightArmMove = useCallback(
    (data: { x: number; y: number; claw1?: { x: number; y: number }; claw2?: { x: number; y: number } }) => {
      if (data.claw1 && data.claw2) {
        setRightArm({ x: data.x, y: data.y, claw1: data.claw1, claw2: data.claw2 });
      } else {
        setRightArm({ x: data.x, y: data.y, claw1: { x: data.x, y: data.y }, claw2: { x: data.x, y: data.y } });
      }
    },
    []
  );

  return (
    <div
      className="min-h-screen pt-16 bg-white relative overflow-hidden flex flex-col"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Cool Startup Animations - Black & White Style */}
      <style>{`
        @keyframes cinematicSlideDown {
          0% { 
            opacity: 0; 
            transform: translateY(-200px) scale(0.8);
            filter: blur(10px);
          }
          30% { 
            opacity: 0.3; 
            transform: translateY(-50px) scale(0.95);
            filter: blur(5px);
          }
          70% { 
            opacity: 0.8; 
            transform: translateY(15px) scale(1.05);
            filter: blur(1px);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes dramaticTypewriter {
          0% { 
            width: 0;
            opacity: 0;
          }
          1% {
            opacity: 1;
          }
          100% { 
            width: 100%;
            opacity: 1;
          }
        }

        @keyframes smoothSlideUp {
          0% { 
            opacity: 0; 
            transform: translateY(60px) scale(0.9);
          }
          60% { 
            opacity: 1; 
            transform: translateY(-8px) scale(1.02);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }

        @keyframes staggeredFadeIn {
          0% { 
            opacity: 0; 
            transform: translateY(40px) translateX(-20px) rotate(-2deg);
          }
          70% { 
            opacity: 1; 
            transform: translateY(-5px) translateX(3px) rotate(1deg);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) translateX(0) rotate(0deg);
          }
        }

        @keyframes elegantUnderlineGrow {
          0% { 
            width: 0; 
            opacity: 0;
            transform: scaleX(0);
          }
          30% { 
            opacity: 1;
          }
          70% { 
            width: 95%; 
            transform: scaleX(0.95);
          }
          100% { 
            width: 100%; 
            transform: scaleX(1);
          }
        }

        @keyframes gentleFloat {
          0%, 100% { 
            transform: translateY(0px);
          }
          50% { 
            transform: translateY(-8px);
          }
        }

        .animate-title {
          animation: cinematicSlideDown 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s forwards;
        }
        
        .animate-subtitle {
          animation: smoothSlideUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s forwards;
        }
        
        .animate-buttons {
          animation: staggeredFadeIn 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.2s forwards;
        }
        
        .animate-social {
          animation: staggeredFadeIn 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.5s forwards;
        }
        
        .animate-contact {
          animation: staggeredFadeIn 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.8s forwards;
        }

        .animate-underline {
          animation: elegantUnderlineGrow 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 2.2s forwards;
        }

        .typewriter-text {
          overflow: hidden;
          white-space: nowrap;
          animation: dramaticTypewriter 2s steps(40, end) 0.5s forwards;
        }

        .title-hover:hover .hover-underline {
          width: 100% !important;
          opacity: 0.3 !important;
        }

        /* Initial hidden states */
        .animate-title,
        .animate-subtitle,
        .animate-buttons,
        .animate-social,
        .animate-contact {
          opacity: 0;
          transform: translateY(30px);
        }

        /* Square cursor follower */
        #custom-cursor {
          border-radius: 0;
          will-change: transform;
          transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          background: transparent;
          border: 2px solid #000;
        }

        #custom-cursor.clicked {
          transform: scale(0.8);
          background: #000;
        }

        /* Lighter grid */
        .grid-elegant {
          opacity: 0.08;
          transition: opacity 0.3s ease;
        }
      `}</style>

      {/* Clean Custom Cursor */}
      <div
        id="custom-cursor"
        className={`fixed w-4 h-4 pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50 ${mouseDown ? 'clicked' : ''}`}
        style={{ 
          left: '50%', 
          top: '50%',
          willChange: 'transform'
        }}
      />

      {/* Enhanced Background Grid */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 grid-elegant pointer-events-none">
        {[...Array(144)].map((_, i) => (
          <div key={i} className="border border-black" />
        ))}
      </div>

      {/* Clean Ground Line */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          width: '100vw',
          height: 0,
          bottom: margin - 2,
          borderBottom: '4px solid #222',
          zIndex: 15,
          pointerEvents: 'none',
        }}
      />

      <div className="flex-1 max-w-6xl mx-auto px-4 relative w-full">
        <div className="flex flex-col md:flex-row items-center justify-between py-12">
          {/* Left Section */}
          <div className="md:w-1/2 space-y-6 relative">
            {/* Cinematic Title Animation */}
            <div className={`space-y-2 mt-2 ${mounted ? 'animate-title' : ''} title-hover`}>
              <h1 className="text-5xl font-bold font-mono relative typewriter-text">
                Hi, I'm <span className="relative inline-block">
                  Soujanya
                  {/* Elegant Underline */}
                  <span
                    className={`absolute left-0 bottom-0 h-2 bg-black rounded-full ${mounted ? 'animate-underline' : ''}`}
                    style={{
                      width: '0%',
                      height: '8px',
                      opacity: 0,
                      zIndex: 1,
                      transformOrigin: 'left center',
                    }}
                  />
                  {/* Hover Underline */}
                  <span
                    className="hover-underline absolute left-0 bottom-0 h-2 bg-black rounded-full transition-all duration-300"
                    style={{
                      width: '0%',
                      height: '8px',
                      opacity: 0,
                      zIndex: 2,
                      transformOrigin: 'left center',
                    }}
                  />
                </span>
              </h1>
            </div>

            {/* Smooth Subtitle */}
            <div className={`${mounted ? 'animate-subtitle' : ''}`}>
              <p className="text-xl font-mono text-gray-700">
                Developer, Maker, and Student
              </p>
            </div>

            {/* Staggered Button Animations */}
            <div className={`flex gap-3 ${mounted ? 'animate-buttons' : ''}`}>
              <ArmInteractiveButton
                armPositions={armPositions}
                gripping={gripping}
                onClick={() => handleNavigation('/projects')}
              >
                View Projects
              </ArmInteractiveButton>
              <ArmInteractiveButton
                armPositions={armPositions}
                gripping={gripping}
                onClick={() => handleNavigation('/about')}
              >
                About Me
              </ArmInteractiveButton>
            </div>

            {/* Social Links */}
            <div className={`flex gap-3 mt-2 ${mounted ? 'animate-social' : ''}`}>
              <ArmInteractiveButton
                armPositions={armPositions}
                gripping={gripping}
                onClick={() => window.open('https://github.com/soujanya957', '_blank', 'noopener noreferrer')}
              >
                GitHub
              </ArmInteractiveButton>
              <ArmInteractiveButton
                armPositions={armPositions}
                gripping={gripping}
                onClick={() => window.open('https://linkedin.com/in/soujanya-c-aryal/', '_blank', 'noopener noreferrer')}
              >
                LinkedIn
              </ArmInteractiveButton>
            </div>

            {/* Contact Section */}
            <div className={`pt-4 flex items-center gap-3 ${mounted ? 'animate-contact' : ''}`}>
              <ArmInteractiveButton
                armPositions={armPositions}
                gripping={gripping}
                onClick={() => window.open('mailto:soujanya@brown.edu')}
              >
                soujanya@brown.edu
              </ArmInteractiveButton>
              <ArmInteractiveButton
                armPositions={armPositions}
                gripping={gripping}
                onClick={() => alert('Robotic arm interacted!')}
              >
                🤖 Arm Button
              </ArmInteractiveButton>
            </div>
          </div>
        </div>
      </div>

      {/* Original Robotic Arms */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          width: '100vw',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      >
        {/* Left Arm */}
        <RoboticArm2D
          key={`left-${armKey}`}
          base={leftBase}
          endEffectorColor="#f59e42"
          controlKeys="wasd"
          bendDirection="right"
          defaultTarget={leftDefault}
          onEndEffectorMove={handleLeftArmMove}
          onGripChange={setLeftGripping}
        />
        {/* Right Arm */}
        <RoboticArm2D
          key={`right-${armKey}`}
          base={rightBase}
          endEffectorColor="#3b82f6"
          controlKeys="arrows"
          bendDirection="left"
          defaultTarget={rightDefault}
          onEndEffectorMove={handleRightArmMove}
          onGripChange={setRightGripping}
        />
        
        {/* Clean Control Instructions */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 20,
            transform: 'translateX(-50%)',
            pointerEvents: 'auto',
            background: 'rgba(255,255,255,0.95)',
            borderRadius: 8,
            padding: '10px 18px',
            fontFamily: 'monospace',
            fontSize: 13,
            fontWeight: 500,
            color: '#374151',
            textAlign: 'center',
            minWidth: 200,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: '1px solid rgba(0,0,0,0.1)',
          }}
        >
          <b>Try moving both arms!</b>
          <div style={{ marginTop: 6, fontSize: 12, color: '#6B7280' }}>
            Left: WASD &nbsp;|&nbsp; Right: Arrow Keys
          </div>
        </div>
      </div>
      <KeyboardHintToast />
    </div>
  );
};

export default Home;
