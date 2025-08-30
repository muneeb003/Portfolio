import React, { useState } from "react";

export default function Loader() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Loading message */}
      <p className="text-2xl font-semibold text-gray-700 absolute top-10">
        Loading... Please wait
      </p>

      {/* Ball that follows mouse */}
      <div
        className="w-12 h-12 bg-blue-500 rounded-full absolute transition-all duration-300 ease-out shadow-lg"
        style={{
          left: pos.x - 24, // center the ball
          top: pos.y - 24,
        }}
      ></div>
    </div>
  );
}
