import React, { useState, useEffect } from 'react';
import { AppID } from '../types';

interface TaskbarProps {
    onOpenApp: (appId: AppID) => void;
}

const StartMenu: React.FC<TaskbarProps> = ({ onOpenApp }) => {
    const apps = [
        { id: AppID.CALCULATOR, name: 'Calculadora', icon: '🖩' },
        { id: AppID.NOTEPAD, name: 'Bloco de Notas', icon: '📝' },
        { id: AppID.PAINT, name: 'Paint', icon: '🎨' },
        { id: AppID.MUSIC_PLAYER, name: 'Musicas', icon: '🎵' },
        { id: AppID.GAMES, name: 'Games', icon: '🎮' },
        { id: AppID.WALLPAPER, name: 'Plano de Fundo', icon: '🖼️' },
    ];

    return (
        <div className="absolute bottom-full left-0 mb-1 w-64 bg-black bg-opacity-80 border-2 border-fuchsia-500 shadow-[0_0_15px_#f0f] text-white p-2 flex flex-col">
            <div className="text-center pb-2 mb-2 border-b border-fuchsia-500">
                <h1 className="text-2xl text-cyan-300 drop-shadow-[0_0_5px_#0ff]">Retro Brasil</h1>
                <h2 className="text-lg text-fuchsia-400">OS</h2>
            </div>
            <ul>
                {apps.map(app => (
                    <li key={app.id}>
                        <button
                            onClick={() => onOpenApp(app.id)}
                            className="w-full text-left p-2 flex items-center space-x-4 hover:bg-fuchsia-700 hover:text-white transition-colors duration-200"
                        >
                            <span className="text-2xl">{app.icon}</span>
                            <span className="text-lg">{app.name}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const Taskbar: React.FC<TaskbarProps> = ({ onOpenApp }) => {
    const [time, setTime] = useState(new Date());
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    useEffect(() => {
        const closeMenu = () => setIsMenuOpen(false);
        if (isMenuOpen) {
            // Use a short timeout to prevent the same click from closing the menu immediately
            const timeoutId = setTimeout(() => {
                window.addEventListener('click', closeMenu, { once: true });
            }, 0);
            return () => {
                clearTimeout(timeoutId);
                window.removeEventListener('click', closeMenu);
            };
        }
    }, [isMenuOpen]);

    const handleMenuButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMenuOpen(prev => !prev);
    }

    return (
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-r from-purple-900 via-black to-blue-900 border-t-2 border-cyan-400 shadow-[0_0_15px_#0ff_inset] flex items-center justify-between px-2 z-50">
            <div className="relative">
                <button
                    onClick={handleMenuButtonClick}
                    className="h-8 px-4 bg-gradient-to-b from-green-400 to-cyan-500 text-black text-lg font-bold border-2 border-white hover:shadow-[0_0_10px_#fff] transition-shadow duration-200"
                >
                    INICIAR
                </button>
                {isMenuOpen && <StartMenu onOpenApp={(appId) => { onOpenApp(appId); setIsMenuOpen(false); }} />}
            </div>
            <div className="text-cyan-300 text-lg bg-black px-3 py-1 border border-cyan-500">
                {time.toLocaleTimeString()}
            </div>
        </div>
    );
};
