// src/components/Loading.tsx
import React from 'react';
import './Loading.css'; // Ensure you have the CSS file for styles

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-xl font-mono mb-4 text-gray-800">Loading...</div>
      <div className="loading-bar">
        <div className="loading-progress" />
      </div>
    </div>
  );
};

export default Loading;
