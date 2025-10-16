import React, { useState, useRef, useEffect, useCallback } from 'react';

interface WindowProps {
  id: string;
  children: React.ReactNode;
  title: string;
  initialPosition: { x: number; y: number };
  initialSize: { width: number, height: number };
  zIndex: number;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
}

export const Window: React.FC<WindowProps> = ({ id, children, title, initialPosition, initialSize, zIndex, onClose, onFocus }) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!windowRef.current) return;
    onFocus(id);
    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    e.preventDefault();
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y,
    });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={windowRef}
      className="absolute flex flex-col bg-gray-800 border-2 border-cyan-400 shadow-[0_0_10px_#0ff,0_0_20px_#0ff] rounded-t-lg"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${initialSize.width}px`,
        height: `${initialSize.height}px`,
        zIndex: zIndex,
      }}
      onMouseDown={() => onFocus(id)}
    >
      <div
        className="h-8 bg-gradient-to-r from-purple-600 to-blue-500 text-white flex items-center justify-between px-2 cursor-move select-none rounded-t-md"
        onMouseDown={handleMouseDown}
      >
        <span className="text-lg">{title}</span>
        <button
          onClick={() => onClose(id)}
          className="bg-red-500 hover:bg-red-700 text-white w-5 h-5 flex items-center justify-center text-sm border border-white"
        >
          X
        </button>
      </div>
      <div className="flex-grow p-1 bg-black bg-opacity-50 overflow-auto">
        {children}
      </div>
    </div>
  );
};
