import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TeddyInPlane = ({ color, delay }) => (
    <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
        className="relative shrink-0"
    >
        <div className="relative group">
            {/* Animated Shadow/Glow */}
            <div className={`absolute -inset-4 md:-inset-10 blur-2xl md:blur-3xl opacity-20 rounded-full transition-all ${color === 'blue' ? 'bg-powder-blue' : 'bg-cotton-rose'}`} />

            {/* High-End Watercolor Asset */}
            <motion.img
                src={color === 'blue' ? '/assets/bear-plane-blue.png' : '/assets/bear-plane-pink.png'}
                alt={`Teddy in ${color} plane`}
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-64 md:h-64 object-contain drop-shadow-xl relative z-10"
                style={{ filter: 'contrast(1.05) brightness(1.02)' }}
            />
        </div>
    </motion.div>
);

export default function Hero() {
    return (
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 pt-20 pb-12 overflow-hidden">

            <div className="flex flex-row items-center justify-center w-full max-w-7xl relative">

                {/* Boy Teddy - Absolute or relative flanking */}
                <div className="absolute left-0 sm:relative sm:left-auto">
                    <TeddyInPlane color="blue" delay={0} />
                </div>

                {/* Center Text Container */}
                <div className="text-center z-10 px-2 flex-grow">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="relative"
                    >
                        <Star className="absolute -top-12 -left-4 w-6 h-6 text-rose-gold fill-rose-gold/20 animate-pulse hidden sm:block" />
                        <Star className="absolute -bottom-12 -right-4 w-5 h-5 text-rose-gold fill-rose-gold/20 animate-pulse hidden sm:block" style={{ animationDelay: '1.5s' }} />

                        <p className="font-handwriting text-2xl md:text-5xl text-rose-gold mb-2 md:mb-4 drop-shadow-sm">
                            To My Beautiful Family...
                        </p>
                        <p className="text-3xl md:text-5xl text-gray-500 mb-6 font-normal" style={{ fontFamily: 'Aref Ruqaa, serif' }}>
                            إلى عائلتي الجميلة...
                        </p>
                        <h1 className="font-sans text-3xl md:text-8xl lg:text-9xl font-black tracking-tighter text-gray-800 leading-[1] uppercase">
                            WHAT WILL <br />
                            <span className="text-gradient-rose italic font-extralight block mt-1">BABY BE?</span>
                        </h1>
                        <p className="text-4xl md:text-6xl text-rose-gold mt-4 font-normal" style={{ fontFamily: 'Aref Ruqaa, serif' }}>
                            ماذا سيكون المولود؟
                        </p>
                    </motion.div>
                </div>

                {/* Girl Teddy - Absolute or relative flanking */}
                <div className="absolute right-0 sm:relative sm:right-auto">
                    <TeddyInPlane color="pink" delay={2.5} />
                </div>
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-gray-400 mt-12 font-bold"
            >
                L'aventure commence ici
            </motion.p>

            {/* Decorative Cloud elements */}
            <div className="absolute -bottom-10 left-[10%] w-64 h-20 bg-white/30 blur-3xl rounded-full" />
            <div className="absolute top-[20%] right-[-5%] w-80 h-32 bg-white/20 blur-3xl rounded-full" />

            {/* Scroll Indicator - Animated Arrow */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
            >
                <span className="font-sans text-[9px] tracking-[0.5em] uppercase text-gray-400 font-bold mb-1">Scroll</span>
                <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center"
                >
                    {/* Double Chevron Arrow */}
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 10 L20 22 L32 10" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                        <path d="M8 20 L20 32 L32 20" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    );
}
