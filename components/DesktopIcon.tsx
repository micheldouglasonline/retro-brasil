
import React from 'react';

interface DesktopIconProps {
  name: string;
  icon: string;
  onDoubleClick: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ name, icon, onDoubleClick }) => {
  return (
    <div 
      className="flex flex-col items-center justify-center p-2 m-2 w-28 h-28 text-center cursor-pointer select-none group"
      onDoubleClick={onDoubleClick}
    >
      <div className="text-5xl drop-shadow-[0_0_5px_#fff] group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
      <span className="mt-2 text-white text-lg drop-shadow-[0_0_8px_rgba(0,255,255,0.7)] group-hover:text-cyan-300">
        {name}
      </span>
    </div>
  );
};
