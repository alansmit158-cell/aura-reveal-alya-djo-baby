import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function RevealFinal({ result = 'boy' }) {
    const [isExploded, setIsExploded] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const triggerReveal = () => {
        setIsExploded(true);

        // Confetti explosion
        const colors = result === 'boy'
            ? ['#B0E0E6', '#FFFFFF', '#D4AF37']
            : ['#FFC0CB', '#FFFFFF', '#D4AF37'];

        setTimeout(() => {
            setShowContent(true);

            const duration = 6 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 40, spread: 360, ticks: 100, zIndex: 100 };

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 80 * (timeLeft / duration);
                confetti({ ...defaults, particleCount, origin: { x: Math.random() * 0.4, y: Math.random() - 0.2 }, colors });
                confetti({ ...defaults, particleCount, origin: { x: Math.random() * 0.4 + 0.6, y: Math.random() - 0.2 }, colors });
            }, 250);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-nacre overflow-hidden">

            <AnimatePresence>
                {!isExploded ? (
                    <motion.div
                        key="pre-reveal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-16 text-center"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                                rotate: [-1, 1, -1]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="w-72 h-72 md:w-96 md:h-96 glass rounded-full flex flex-col items-center justify-center border-rose-gold/30 shadow-[0_0_80px_rgba(212,175,55,0.1)] relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full" />

                            {/* Footprints Image */}
                            <motion.img
                                src="/assets/baby-feet.jpg"
                                alt="Baby Footprints"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-32 h-32 md:w-48 md:h-48 object-contain mb-4 relative z-10"
                            />

                            <span className="font-serif text-sm tracking-[0.6em] uppercase text-rose-gold mb-1 relative z-10">THE MOMENT</span>
                            <span className="font-sans text-2xl tracking-[0.3em] font-black text-gray-700 uppercase relative z-10">IS HERE</span>
                            <span className="text-2xl text-gray-500 mt-2 relative z-10" style={{ fontFamily: 'Aref Ruqaa, serif' }}>لقد حانت اللحظة</span>
                            <div className="absolute -bottom-8 w-1 h-32 bg-gradient-to-t from-transparent via-rose-gold/20 to-transparent" />
                        </motion.div>

                        <div className="space-y-8">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(212,175,55,0.3)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={triggerReveal}
                                className="bg-white border-2 border-rose-gold/30 px-16 py-5 rounded-full font-serif text-xl text-rose-gold shadow-2xl backdrop-blur-md hover:border-rose-gold transition-all"
                            >
                                <span className="font-serif text-xl md:text-2xl text-rose-gold group-hover:text-foreground transition-colors relative z-10">
                                    Toucher pour Révéler la Magie
                                </span>
                                <span className="text-2xl md:text-3xl text-gray-500 font-normal relative z-10" style={{ fontFamily: 'Aref Ruqaa, serif' }}>
                                    المس هنا لكشف المفاجأة
                                </span>
                            </motion.button>

                            <div className="space-y-4">
                                <p className="font-handwriting text-3xl md:text-5xl text-rose-gold/80 italic drop-shadow-sm">
                                    Notre secret sort enfin des nuages...
                                </p>
                                <p className="text-4xl md:text-5xl text-gray-500 font-normal" style={{ fontFamily: 'Aref Ruqaa, serif' }}>
                                    سرنا يخرج أخيراً من بين السحاب...
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <>
                        {/* Smoke Explosion Backdrop */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 20, 15, 0], opacity: [0, 1, 0.8, 0] }}
                            transition={{ duration: 4, times: [0, 0.3, 0.6, 1], ease: "easeOut" }}
                            className="absolute w-40 h-40 bg-white/95 shadow-[0_0_150px_white] rounded-full z-10 pointer-events-none blur-3xl"
                        />

                        {/* Content Reveal */}
                        <AnimatePresence>
                            {showContent && (
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1 }}
                                    className="z-20 text-center space-y-8 px-6 max-w-3xl"
                                >
                                    <motion.div className="space-y-4">
                                        <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-[0.4em] font-light text-gray-400">
                                            C'est Un...
                                        </h2>
                                        <h1 className={`font-serif text-6xl md:text-9xl font-black drop-shadow-2xl ${result === 'boy' ? 'text-powder-blue' : 'text-cotton-rose'}`}>
                                            {result === 'boy' ? 'Petit Prince' : 'Petite Princesse'}
                                        </h1>
                                        <h2 className="text-5xl md:text-7xl text-gray-500 font-normal" style={{ fontFamily: 'Aref Ruqaa, serif' }}>
                                            {result === 'boy' ? 'إنه ولد' : 'إنها بنت'}
                                        </h2>
                                    </motion.div>

                                    {/* Reveal Mascot: Professional Watercolor Asset */}
                                    <motion.div
                                        initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                        transition={{ type: "spring", stiffness: 60, delay: 0.5 }}
                                        className="relative flex justify-center py-6"
                                    >
                                        <img
                                            src="/assets/reveal-bear.png"
                                            alt="Reveal Teddy"
                                            className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 2 }}
                                        className="font-handwriting text-3xl md:text-5xl text-rose-gold italic leading-tight"
                                    >
                                        "Beyoulou el sabiyi la oummo ghalé ala albha..."
                                    </motion.div>

                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 6 }}
                                        onClick={() => { setIsExploded(false); setShowContent(false); }}
                                        className="font-sans text-[10px] tracking-[0.5em] uppercase text-gray-400 hover:text-rose-gold transition-colors mt-8"
                                    >
                                        Vivre à nouveau la magie
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
