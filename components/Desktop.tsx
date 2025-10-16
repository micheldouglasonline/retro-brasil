import React, { useState, useCallback } from 'react';
import { DesktopIcon } from './DesktopIcon';
import { Window } from './Window';
import { CalculatorApp } from './apps/CalculatorApp';
import { NotepadApp } from './apps/NotepadApp';
import { PaintApp } from './apps/PaintApp';
import { MusicPlayerApp } from './apps/MusicPlayerApp';
import { GamesApp } from './apps/GamesApp';
import { WallpaperApp } from './apps/WallpaperApp';
import { Taskbar } from './Taskbar';
import { AppID, WindowInstance } from '../types';

const appConfig = {
  [AppID.CALCULATOR]: {
    title: 'Calculadora',
    component: CalculatorApp,
    size: { width: 280, height: 400 },
  },
  [AppID.NOTEPAD]: {
    title: 'Bloco de Notas',
    component: NotepadApp,
    size: { width: 500, height: 400 },
  },
  [AppID.PAINT]: {
    title: 'Paint Retro',
    component: PaintApp,
    size: { width: 600, height: 450 },
  },
  [AppID.MUSIC_PLAYER]: {
    title: 'Toca-Discos Neon',
    component: MusicPlayerApp,
    size: { width: 350, height: 200 },
  },
  [AppID.GAMES]: {
    title: 'Central de Jogos',
    component: GamesApp,
    size: { width: 440, height: 520 },
  },
  [AppID.WALLPAPER]: {
    title: 'Plano de Fundo',
    component: WallpaperApp,
    size: { width: 450, height: 400 },
  },
};

export const Desktop: React.FC = () => {
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [nextZIndex, setNextZIndex] = useState(10);
  const [wallpaper, setWallpaper] = useState('https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg');

  const handleSelectWallpaper = (url: string) => {
    setWallpaper(url);
  };

  const openApp = useCallback((appId: AppID) => {
    const existingWindow = windows.find(w => w.appId === appId);
    if (existingWindow) {
      bringToFront(existingWindow.id);
      return;
    }

    const config = appConfig[appId];
    const newWindow: WindowInstance = {
      id: `${appId}-${Date.now()}`,
      appId: appId,
      title: config.title,
      position: { x: Math.random() * 200 + 50, y: Math.random() * 100 + 50 },
      zIndex: nextZIndex,
      size: config.size,
    };
    setWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
  }, [windows, nextZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const bringToFront = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w =>
        w.id === id ? { ...w, zIndex: nextZIndex } : w
      )
    );
    setNextZIndex(prev => prev + 1);
  }, [nextZIndex]);

  return (
    <div
      className="relative w-full h-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="absolute inset-0" style={{background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%'}}></div>
      
      <div className="relative p-4 flex flex-col flex-wrap h-full content-start pb-12">
        <DesktopIcon name="Calculadora" onDoubleClick={() => openApp(AppID.CALCULATOR)} icon="🖩" />
        <DesktopIcon name="Bloco de Notas" onDoubleClick={() => openApp(AppID.NOTEPAD)} icon="📝" />
        <DesktopIcon name="Paint" onDoubleClick={() => openApp(AppID.PAINT)} icon="🎨" />
        <DesktopIcon name="Musicas" onDoubleClick={() => openApp(AppID.MUSIC_PLAYER)} icon="🎵" />
        <DesktopIcon name="Games" onDoubleClick={() => openApp(AppID.GAMES)} icon="🎮" />
        <DesktopIcon name="Plano de Fundo" onDoubleClick={() => openApp(AppID.WALLPAPER)} icon="🖼️" />
      </div>

      {windows.map(win => {
        const AppComponent = appConfig[win.appId].component;
        const appProps: any = {};
        if (win.appId === AppID.WALLPAPER) {
            appProps.onSelectWallpaper = handleSelectWallpaper;
            appProps.currentWallpaper = wallpaper;
            appProps.onClose = () => closeWindow(win.id);
        }

        return (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            initialPosition={win.position}
            initialSize={win.size}
            zIndex={win.zIndex}
            onClose={closeWindow}
            onFocus={bringToFront}
          >
            <AppComponent {...appProps} />
          </Window>
        );
      })}

      <Taskbar onOpenApp={openApp} />
    </div>
  );
};