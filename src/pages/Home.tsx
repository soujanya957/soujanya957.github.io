// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RightSection from './RightSection';
import RoboticArm2D from '../components/RoboticArm2D';

const Home = () => {
  const navigate = useNavigate();
  const [boxColors, setBoxColors] = useState(Array(36).fill('#ffffff'));
  const [mouseDown, setMouseDown] = useState(false);

  // Responsive arm base positions and a key to force remount
  const [viewport, setViewport] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [armKey, setArmKey] = useState(0);

  useEffect(() => {
    const onResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
      setArmKey(k => k + 1); // force remount of arms
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Navigation
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Clear all box colors
  const clearColors = () => {
    setBoxColors(Array(36).fill('#ffffff'));
  };

  // Move custom cursor
  const handleMouseMove = (e: React.MouseEvent) => {
    const cursor = document.getElementById('custom-cursor');
    if (cursor) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }
  };

  // Handle mouse down/up for cursor fill
  const handleMouseDown = () => setMouseDown(true);
  const handleMouseUp = () => setMouseDown(false);

  // Arm base positions (first and third quarter)
  const margin = 60;
  const leftBase = { x: viewport.width * 0.25, y: viewport.height - margin };
  const rightBase = { x: viewport.width * 0.75, y: viewport.height - margin };

  const armLength = 140;
  // Lower the end effector by using a shallower angle
  // Left arm: 55deg (less up, more out)
  const leftAngle = (35 * Math.PI) / 180;
  const leftDefault = {
    x: leftBase.x + armLength * Math.cos(leftAngle),
    y: leftBase.y - armLength * Math.sin(leftAngle),
  };
  // Right arm: 125deg (less up, more out)
  const rightAngle = (35 * Math.PI) / 180;
  const rightDefault = {
    x: rightBase.x - armLength * Math.cos(rightAngle),
    y: rightBase.y - armLength * Math.sin(rightAngle),
  };

  return (
    <div
      className="min-h-screen pt-16 bg-white relative overflow-hidden flex flex-col"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Custom cursor follower */}
      <div
        id="custom-cursor"
        className={`fixed w-4 h-4 border-2 border-black pointer-events-none transition-all duration-75 -translate-x-1/2 -translate-y-1/2 z-50
          ${mouseDown ? 'bg-black' : 'bg-transparent'}
        `}
      />

      {/* Background grid */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-5 pointer-events-none">
        {[...Array(144)].map((_, i) => (
          <div key={i} className="border border-black" />
        ))}
      </div>

      <div className="flex-1 max-w-6xl mx-auto px-4 relative w-full">
        <div className="flex flex-col md:flex-row items-center justify-between py-12">
          {/* Left Section */}
          <div className="md:w-1/2 space-y-8 relative">
            <div className="space-y-4 transition-transform hover:translate-x-2">
              <h1 className="text-5xl font-bold font-mono">
                Hi, I'm <span className="underline decoration-4">Soujanya</span>
              </h1>
              <p className="text-xl font-mono">
                Developer, Maker, and Student
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-wrap gap-4">
              {[
                { text: 'View Projects', path: '/projects', key: 'projects' },
                { text: 'About Me', path: '/about', key: 'about' }
              ].map((button) => (
                <button
                  key={button.key}
                  onClick={() => handleNavigation(button.path)}
                  className="group relative px-6 py-3 border-2 border-black font-mono bg-white hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  {button.text}
                </button>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { text: 'GitHub', url: 'https://github.com/soujanya957', key: 'github' },
                { text: 'LinkedIn', url: 'https://linkedin.com/in/soujanya-c-aryal/', key: 'linkedin' }
              ].map((link) => (
                <button
                  key={link.key}
                  onClick={() => window.open(link.url, '_blank', 'noopener noreferrer')}
                  className="group relative p-3 border-2 border-black font-mono hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  {link.text}
                </button>
              ))}
            </div>

            {/* Contact Section */}
            <div className="pt-4">
              <a
                href="mailto:soujanya@brown.edu"
                className="group relative inline-block px-4 py-2 border-2 border-black font-mono hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                soujanya@brown.edu
              </a>
            </div>
          </div>

          {/* Right Section */}
          <RightSection 
            boxColors={boxColors} 
            setBoxColors={setBoxColors} 
            clearColors={clearColors} 
          />
        </div>
      </div>

      {/* Two Robotic Arms and Centered Text */}
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
        />
        {/* Right Arm */}
        <RoboticArm2D
          key={`right-${armKey}`}
          base={rightBase}
          endEffectorColor="#3b82f6"
          controlKeys="arrows"
          bendDirection="left"
          defaultTarget={rightDefault}
        />
        {/* Centered text and key guides */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 40,
            transform: 'translateX(-50%)',
            pointerEvents: 'auto',
            background: 'rgba(255,255,255,0.85)',
            borderRadius: 6,
            padding: '6px 14px',
            fontFamily: 'monospace',
            fontSize: 13,
            fontWeight: 500,
            color: '#374151',
            textAlign: 'center',
            minWidth: 180,
          }}
        >
          <b>Try moving both arms!</b>
          <div style={{ marginTop: 6, fontSize: 12, color: '#888' }}>
            Left: WASD &nbsp;|&nbsp; Right: Arrow Keys
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
