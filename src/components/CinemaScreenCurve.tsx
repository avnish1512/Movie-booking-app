import React from 'react';

export const CinemaScreenCurve: React.FC = () => {
  return (
    <div className="relative w-full max-w-[380px] mx-auto pt-3 pb-5 flex flex-col items-center select-none pointer-events-none">
      {/* SVG Curved Glowing Arc */}
      <svg
        viewBox="0 0 360 40"
        className="w-full h-10 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="20%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="80%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
          </linearGradient>
          <filter id="screenGlow" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient projection gradient field below curve */}
        <path
          d="M 20 32 Q 180 4 340 32 L 320 40 Q 180 20 40 40 Z"
          fill="url(#screenGrad)"
          opacity="0.12"
        />

        {/* Glowing Screen Line */}
        <path
          d="M 20 32 Q 180 4 340 32"
          stroke="url(#screenGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#screenGlow)"
        />
      </svg>

      {/* Screen text */}
      <span className="text-[10px] tracking-[0.32em] font-medium text-white/35 uppercase -mt-2">
        SCREEN
      </span>
    </div>
  );
};

