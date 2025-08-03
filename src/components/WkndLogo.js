// WKND Warrior Logo Component 🪖
import React from 'react';

const WkndLogo = ({ size = 'normal', className = '' }) => {
  const sizes = {
    small: 'w-8 h-8 text-xs',
    normal: 'w-12 h-12 text-sm',
    large: 'w-20 h-20 text-lg'
  };

  return (
    <div className={`${sizes[size]} ${className} bg-amber-400 text-gray-900 font-black flex flex-col items-center justify-center border-2 border-gray-800 shadow-lg`}>
      <div className="leading-none">WK</div>
      <div className="leading-none">ND</div>
    </div>
  );
};

export default WkndLogo;