// src/pages/Home.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RightSection from './RightSection'; // Import the new component

const Home = () => {
  const navigate = useNavigate();
  const [hoverText, setHoverText] = useState('');
  const [boxColors, setBoxColors] = useState(Array(36).fill('#ffffff')); // Initialize boxes with white color

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Function to clear all colors
  const clearColors = () => {
    setBoxColors(Array(36).fill('#ffffff'));
  };

  // Interactive cursor effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const cursor = document.getElementById('custom-cursor');
    if (cursor) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }
  };

  return (
    <div
      className="min-h-screen pt-16 bg-white relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Custom cursor follower */}
      <div
        id="custom-cursor"
        className="fixed w-4 h-4 border-2 border-black pointer-events-none transition-all duration-75 -translate-x-1/2 -translate-y-1/2 z-50"
      />

      {/* Background grid */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-5 pointer-events-none">
        {[...Array(144)].map((_, i) => (
          <div key={i} className="border border-black" />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row items-center justify-between py-12">
          {/* Left Section */}
          <div className="md:w-1/2 space-y-8 relative">
            <div
              className="space-y-4 transition-transform hover:translate-x-2"
              onMouseEnter={() => setHoverText('hi')}
              onMouseLeave={() => setHoverText('')}
            >
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

          {/* Right Section - using the new RightSection component */}
          <RightSection 
            boxColors={boxColors} 
            setBoxColors={setBoxColors} 
            clearColors={clearColors} 
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
