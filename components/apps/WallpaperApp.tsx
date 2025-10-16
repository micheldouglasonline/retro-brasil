import React, { useState } from 'react';

const wallpapers = [
  { name: 'Paisagem Synthwave', url: 'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg' },
  { name: 'Grid Retrô', url: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg' },
  { name: 'Carro Esportivo', url: 'https://images.pexels.com/photos/1238864/pexels-photo-1238864.jpeg' },
  { name: 'Abstrato Neon', url: 'https://images.pexels.com/photos/5022849/pexels-photo-5022849.jpeg' },
];

interface WallpaperAppProps {
  currentWallpaper: string;
  onSelectWallpaper: (url: string) => void;
  onClose: () => void;
}

export const WallpaperApp: React.FC<WallpaperAppProps> = ({ currentWallpaper, onSelectWallpaper, onClose }) => {
  const [selected, setSelected] = useState(currentWallpaper);

  const handleApply = () => {
    onSelectWallpaper(selected);
    onClose();
  };

  return (
    <div className="w-full h-full bg-black bg-opacity-70 text-white p-4 flex flex-col">
      <h2 className="text-xl text-cyan-300 mb-4 text-center drop-shadow-[0_0_5px_#0ff]">Selecione um Plano de Fundo</h2>
      <div className="grid grid-cols-2 gap-4 flex-grow overflow-y-auto p-2">
        {wallpapers.map((wallpaper) => (
          <div
            key={wallpaper.url}
            onClick={() => setSelected(wallpaper.url)}
            className={`cursor-pointer border-4 p-1 rounded-md transition-all duration-200 ${selected === wallpaper.url ? 'border-fuchsia-500 shadow-[0_0_10px_#f0f]' : 'border-transparent hover:border-cyan-400'}`}
          >
            <img src={wallpaper.url} alt={wallpaper.name} className="w-full h-24 object-cover rounded-sm" />
            <p className="text-center mt-1 text-sm text-cyan-200">{wallpaper.name}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={onClose}
          className="mr-4 h-8 px-4 bg-gray-600 text-white text-lg border-2 border-gray-400 hover:bg-gray-700"
        >
          Cancelar
        </button>
        <button
          onClick={handleApply}
          className="h-8 px-4 bg-gradient-to-b from-green-400 to-cyan-500 text-black text-lg font-bold border-2 border-white hover:shadow-[0_0_10px_#fff] transition-shadow duration-200"
        >
          Aplicar
        </button>
      </div>
    </div>
  );
};