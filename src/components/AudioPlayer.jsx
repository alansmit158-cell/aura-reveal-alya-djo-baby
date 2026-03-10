import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AudioPlayer({ isRevealing = false }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const isPlayingRef = useRef(false); // stable ref for use inside listeners

    // Register ONE interaction listener on mount only
    useEffect(() => {
        const startAudio = () => {
            if (!isPlayingRef.current && audioRef.current) {
                audioRef.current.play()
                    .then(() => {
                        isPlayingRef.current = true;
                        setIsPlaying(true);
                    })
                    .catch(e => console.log("Autoplay blocked:", e));
            }
            // Remove after first successful interaction
            window.removeEventListener('click', startAudio);
            window.removeEventListener('touchstart', startAudio);
            window.removeEventListener('scroll', startAudio);
        };

        window.addEventListener('click', startAudio, { once: true });
        window.addEventListener('touchstart', startAudio, { once: true });
        window.addEventListener('scroll', startAudio, { once: true });

        return () => {
            window.removeEventListener('click', startAudio);
            window.removeEventListener('touchstart', startAudio);
            window.removeEventListener('scroll', startAudio);
        };
    }, []); // empty deps = runs once on mount

    const toggleAudio = (e) => {
        e.stopPropagation(); // prevent the click from re-triggering startAudio
        if (isPlayingRef.current) {
            audioRef.current?.pause();
            isPlayingRef.current = false;
            setIsPlaying(false);
        } else {
            audioRef.current?.play()
                .then(() => {
                    isPlayingRef.current = true;
                    setIsPlaying(true);
                })
                .catch(e => console.log("Playback blocked:", e));
        }
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
                className="w-14 h-14 glass rounded-full flex items-center justify-center text-rose-gold shadow-rose-gold/20 shadow-xl relative"
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

                {isRevealing && isPlaying && (
                    <div className="absolute inset-0 bg-rose-gold/20 rounded-full animate-ping" />
                )}
            </motion.button>
        </div>
    );
}
