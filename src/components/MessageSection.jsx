import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function MessageSection({ onComplete }) {
    const [currentPage, setCurrentPage] = useState(0);

    const pages = [
        {
            id: 'intro',
            content: (
                <div className="text-center space-y-2 md:space-y-4">
                    <h2 className="text-5xl md:text-7xl lg:text-8xl text-gray-500 font-normal tracking-normal" style={{ fontFamily: 'Aref Ruqaa, serif' }}>
                        إلى عائلتي الجميلة
                    </h2>
                    <p className="font-handwriting text-4xl md:text-6xl lg:text-7xl text-rose-gold/80 italic">
                        To My Beautiful Family
                    </p>
                </div>
            )
        },
        {
            id: 'part2',
            content: (
                <div className="text-center space-y-4 md:space-y-6">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-500 font-normal leading-relaxed" style={{ fontFamily: 'Aref Ruqaa, serif' }}>
                        كنتم شركاء فرحتنا بخبر الحمل
                        <br />
                        بكل حب، عليا و دجو يدعونكم لمشاركتهم لحظة مليئة بالسحر والانتظار...
                    </h2>
                    <div className="space-y-1">
                        <p className="font-handwriting text-2xl md:text-3xl text-rose-gold italic opacity-90">
                            You were partners in our joy with the news of pregnancy.
                        </p>
                        <p className="font-handwriting text-2xl md:text-3xl text-rose-gold italic opacity-90">
                            With all our love, Alya & Djo invite you to share a moment full of magic and anticipation...
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 'part3',
            content: (
                <div className="text-center space-y-4 md:space-y-6">
                    <h2 className="text-5xl md:text-7xl lg:text-8xl text-gray-500 font-normal" style={{ fontFamily: 'Aref Ruqaa, serif' }}>
                        هل هو أمير أم أميرة؟
                        <br />
                        لنكتشف ذلك معاً🫣🫣
                    </h2>
                    <p className="font-handwriting text-3xl md:text-5xl text-rose-gold italic opacity-90">
                        Is it a Prince or a Princess?
                        <br />
                        Let's find out together 🫣🫣
                    </p>
                </div>
            )
        }
    ];

    const next = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            onComplete();
        }
    };

    return (
        <div className="max-w-4xl w-full mx-auto px-6 flex flex-col items-center justify-center min-h-[60vh] relative">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full py-20"
                >
                    {pages[currentPage].content}
                </motion.div>
            </AnimatePresence>

            <div className="flex flex-col items-center gap-8 mt-12">
                <div className="flex gap-2">
                    {pages.map((_, i) => (
                        <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i === currentPage ? 'bg-rose-gold w-6' : 'bg-rose-gold/20'}`}
                        />
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={next}
                    className="group flex items-center gap-3 bg-white/80 border border-rose-gold/20 px-10 py-4 rounded-full font-serif text-lg text-rose-gold shadow-lg hover:border-rose-gold/50 transition-all backdrop-blur-sm"
                >
                    <span>{currentPage === pages.length - 1 ? 'Découvrir la suite' : 'Continuer'}</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
            </div>

            {currentPage > 0 && (
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-rose-gold/30 hover:text-rose-gold transition-colors p-4"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>
            )}
        </div>
    );
}
