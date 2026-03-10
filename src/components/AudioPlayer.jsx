import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AudioPlayer({ isRevealing = false, result = 'boy' }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const backgroundMusicRef = useRef(null);
    const revealMusicRef = useRef(null);
    const [currentMode, setCurrentMode] = useState('background'); // 'background' or 'reveal'

    // Handle music transition when reveal starts
    useEffect(() => {
        if (isRevealing && currentMode === 'background') {
            setCurrentMode('reveal');
            if (isPlaying) {
                backgroundMusicRef.current?.pause();
                // Play reveal song after a short delay for the smoke explosion
                setTimeout(() => {
                    revealMusicRef.current?.play().catch(e => console.log("Audio reveal blocked", e));
                }, 1000);
            }
        }
    }, [isRevealing]);

    const toggleAudio = () => {
        const audio = currentMode === 'background' ? backgroundMusicRef.current : revealMusicRef.current;
        if (isPlaying) {
            audio?.pause();
        } else {
            audio?.play().catch(e => console.log("Audio playback blocked", e));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Background Sweet Lullaby */}
            <audio
                ref={backgroundMusicRef}
                loop
                src="/Empty Project (2).mp3"
            />
            {/* Arabic Reveal Song Placeholder */}
            <audio
                ref={revealMusicRef}
                src={result === 'boy'
                    ? "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3"
                    : "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3"
                }
            />

            <motion.button
                animate={isRevealing ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
                onClick={toggleAudio}
                className="w-14 h-14 glass rounded-full flex items-center justify-center text-rose-gold shadow-rose-gold/20 shadow-xl group"
            >
                <AnimatePresence mode="wait">
                    {isPlaying ? (
                        <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {currentMode === 'reveal' ? <Music className="w-6 h-6 animate-spin-slow" /> : <Volume2 className="w-6 h-6" />}
                        </motion.div>
                    ) : (
                        <motion.div key="muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <VolumeX className="w-6 h-6 opacity-40" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Glow effect during reveal */}
                {isRevealing && isPlaying && (
                    <div className="absolute inset-0 bg-rose-gold/20 rounded-full animate-ping" />
                )}
            </motion.button>
        </div>
    );
}
