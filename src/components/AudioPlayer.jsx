import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AudioPlayer({ isRevealing = false }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Auto-play attempt on first interaction
    useEffect(() => {
        const handleInteraction = () => {
            if (!isPlaying && audioRef.current) {
                audioRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch(e => console.log("Autoplay still blocked", e));
            }
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };

        window.addEventListener('click', handleInteraction);
        window.addEventListener('touchstart', handleInteraction);

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };
    }, [isPlaying]);

    const toggleAudio = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play().catch(e => console.log("Audio playback blocked", e));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <audio
                ref={audioRef}
                loop
                src="/Empty Project (2).mp3"
            />

            <motion.button
                animate={isRevealing && isPlaying ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
                onClick={toggleAudio}
                className="w-14 h-14 glass rounded-full flex items-center justify-center text-rose-gold shadow-rose-gold/20 shadow-xl group"
            >
                <AnimatePresence mode="wait">
                    {isPlaying ? (
                        <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Volume2 className="w-6 h-6" />
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
