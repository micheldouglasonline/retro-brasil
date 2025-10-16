import React, { useState, useRef, useEffect } from 'react';

const playlist = [
    { title: 'Retrowave Drive', src: 'https://cdn.pixabay.com/audio/2022/08/24/audio_321c521362.mp3' },
    { title: '80s Synthwave', src: 'https://cdn.pixabay.com/audio/2022/05/18/audio_49b6d21013.mp3' },
    { title: 'The 80s Vibe', src: 'https://cdn.pixabay.com/audio/2022/11/22/audio_a12b370b33.mp3' },
];

const NeonButton: React.FC<{onClick: () => void, children: React.ReactNode}> = ({ onClick, children }) => (
    <button onClick={onClick} className="text-4xl text-cyan-300 drop-shadow-[0_0_5px_#0ff] hover:text-white hover:drop-shadow-[0_0_8px_#fff] transition-all duration-200">
        {children}
    </button>
);

export const MusicPlayerApp: React.FC = () => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Error playing audio:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrackIndex]);
    
    // Ensure audio element's source is updated when track changes
    useEffect(() => {
        if(audioRef.current) {
            audioRef.current.src = playlist[currentTrackIndex].src;
            if(isPlaying) {
                audioRef.current.play();
            }
        }
    }, [currentTrackIndex]);


    const handleNext = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    };

    const handlePrev = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="w-full h-full bg-black bg-opacity-70 text-white flex flex-col justify-center items-center p-4">
            <audio
                ref={audioRef}
                src={playlist[currentTrackIndex].src}
                onEnded={handleNext}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
            <div className="text-center mb-4 min-h-[60px]">
                <p className="text-fuchsia-400 text-sm">TOCANDO AGORA</p>
                <p className="text-xl text-cyan-300 drop-shadow-[0_0_5px_#0ff] truncate">
                    {playlist[currentTrackIndex].title}
                </p>
            </div>
            <div className="flex items-center justify-center space-x-8">
                <NeonButton onClick={handlePrev}>{"⏪"}</NeonButton>
                <NeonButton onClick={togglePlay}>{isPlaying ? "⏸️" : "▶️"}</NeonButton>
                <NeonButton onClick={handleNext}>{"⏩"}</NeonButton>
            </div>
        </div>
    );
};
