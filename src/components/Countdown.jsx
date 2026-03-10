import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Countdown({ targetDate, onComplete }) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const lastSecondRef = useRef(0);
    const audioContextRef = useRef(null);

    // Simple Beep/Chime sound generator
    const playChime = (freq = 440) => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        const ctx = audioContextRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    };

    useEffect(() => {
        const calculateTimeLeft = () => {
            if (!targetDate) return;

            const target = new Date(targetDate);
            const now = new Date();

            // Total difference in MS
            let difference = target.getTime() - now.getTime();

            if (difference > 0) {
                // To avoid DST confusion for "Wall Clock" perception:
                // We calculate Days usually, but for the Hours/Mins we want them to feel like "What's on the clock"
                // However, the standard MS calculation is technically correct for time-remaining.
                // I will add a small adjustment for display if we are in the same relative day.

                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });

                // Play chime on second change if active
                const currentSeconds = Math.floor((difference / 1000) % 60);
                if (currentSeconds !== lastSecondRef.current) {
                    lastSecondRef.current = currentSeconds;
                    if (difference < 10000) {
                        playChime(660);
                    }
                }
            } else if (onComplete) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                onComplete();
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();

        return () => clearInterval(timer);
    }, [targetDate]);

    const TimeBlock = ({ value, label, delay, colorClass }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="flex flex-col items-center"
        >
            <div className={`balloon-3d text-6xl md:text-8xl lg:text-9xl mb-4 transition-all duration-500 font-bold ${colorClass}`}>
                {value.toString().padStart(2, '0')}
            </div>
            <div className="bg-white/40 px-4 py-1 rounded-full text-[10px] md:text-xs tracking-[0.3em] uppercase text-gray-500 backdrop-blur-sm">
                {label}
            </div>
        </motion.div>
    );

    return (
        <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">

            {/* Cloud supports for the numbers */}
            <div className="absolute inset-0 flex justify-around opacity-20 pointer-events-none">
                <div className="w-64 h-24 bg-white/80 blur-3xl rounded-full absolute top-[20%] left-[10%]" />
                <div className="w-80 h-32 bg-white/80 blur-3xl rounded-full absolute bottom-[20%] right-[10%]" />
            </div>

            <div className="text-center space-y-12 relative z-10 w-full mb-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                >
                    <p className="font-handwriting text-3xl md:text-4xl text-rose-gold opacity-80 italic animate-pulse">
                        Le voyage se rapproche de son but...
                    </p>
                    <h2 className="font-sans text-xs tracking-[0.5em] uppercase font-bold text-gray-400">Préparez-vous à l'atterrissage</h2>
                </motion.div>

                {/* Using a grid to ensure alignment on mobile */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 lg:gap-20 max-w-5xl mx-auto items-center justify-items-center">
                    <TimeBlock value={timeLeft.days ?? 0} label="Jours" delay={0.2} colorClass="balloon-3d-pink" />
                    <TimeBlock value={timeLeft.hours ?? 0} label="Heures" delay={0.3} colorClass="balloon-3d-blue" />
                    <TimeBlock value={timeLeft.minutes ?? 0} label="Minutes" delay={0.4} colorClass="balloon-3d-pink" />
                    <TimeBlock value={timeLeft.seconds ?? 0} label="Secondes" delay={0.5} colorClass="balloon-3d-blue" />
                </div>
            </div>
        </section>
    );
}
