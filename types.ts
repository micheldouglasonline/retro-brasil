import React from 'react';

export enum AppID {
  CALCULATOR = 'CALCULATOR',
  NOTEPAD = 'NOTEPAD',
  PAINT = 'PAINT',
  MUSIC_PLAYER = 'MUSIC_PLAYER',
  GAMES = 'GAMES',
  WALLPAPER = 'WALLPAPER',
}

export interface WindowInstance {
  id: string;
  appId: AppID;
  title: string;
  position: { x: number; y: number };
  zIndex: number;
  size: { width: number; height: number };
}
