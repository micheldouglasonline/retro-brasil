
import React from 'react';

export const NotepadApp: React.FC = () => {
  return (
    <div className="w-full h-full p-1 bg-black">
      <textarea
        className="w-full h-full bg-gray-900 text-green-400 text-xl p-2 border-none focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
        spellCheck="false"
      />
    </div>
  );
};
