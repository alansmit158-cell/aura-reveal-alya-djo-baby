import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Baby, Heart } from 'lucide-react';

export default function VotingSystem() {
    const [hasVoted, setHasVoted] = useState(false);
    const [counts, setCounts] = useState({ boy: 55, girl: 45 }); // Mock stats
    const [selection, setSelection] = useState(null);

    const handleVote = (type) => {
        setSelection(type);
        setHasVoted(true);
        // In real app, this would update Firebase
    };

    const total = counts.boy + counts.girl;
    const boyPercent = Math.round((counts.boy / total) * 100);
    const girlPercent = Math.round((counts.girl / total) * 100);

    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-transparent">
            <div className="max-w-4xl w-full text-center space-y-12">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                >
                    <h2 className="font-serif text-4xl md:text-5xl text-foreground font-light">
                        {hasVoted ? "Merci pour votre vote !" : "Faites vos pronostics"}
                    </h2>
                    <p className="font-body text-gray-500 max-w-md mx-auto">
                        {hasVoted
                            ? `Vous avez choisi ${selection === 'boy' ? 'un Petit Prince' : 'une Petite Princesse'}. Voici les tendances actuelles :`
                            : "Alors, équipe Bleu ou équipe Rose ? Laissez parler votre intuition."
                        }
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative">
                    <AnimatePresence mode="wait">
                        {!hasVoted ? (
                            <>
                                {/* Boy Vote Card */}
                                <motion.button
                                    key="vote-boy"
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleVote('boy')}
                                    className="glass group p-8 rounded-[32px] flex flex-col items-center gap-6 border-powder-blue/30 hover:shadow-powder-blue/20 transition-all duration-500"
                                >
                                    <div className="w-20 h-20 rounded-full bg-powder-blue/20 flex items-center justify-center text-powder-blue group-hover:scale-110 transition-transform">
                                        <Baby className="w-10 h-10" />
                                    </div>
                                    <span className="font-serif text-2xl tracking-widest uppercase text-gray-700">Boy</span>
                                    <div className="text-xs tracking-[0.2em] text-gray-400">Équipe Petit Prince</div>
                                </motion.button>

                                {/* Girl Vote Card */}
                                <motion.button
                                    key="vote-girl"
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleVote('girl')}
                                    className="glass group p-8 rounded-[32px] flex flex-col items-center gap-6 border-cotton-rose/30 hover:shadow-cotton-rose/20 transition-all duration-500"
                                >
                                    <div className="w-20 h-20 rounded-full bg-cotton-rose/20 flex items-center justify-center text-cotton-rose group-hover:scale-110 transition-transform">
                                        <Heart className="w-10 h-10" />
                                    </div>
                                    <span className="font-serif text-2xl tracking-widest uppercase text-gray-700">Girl</span>
                                    <div className="text-xs tracking-[0.2em] text-gray-400">Équipe Petite Princesse</div>
                                </motion.button>
                            </>
                        ) : (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="col-span-1 md:col-span-2 glass p-10 md:p-16 rounded-[40px] space-y-12"
                            >
                                {/* Stats Bar Container */}
                                <div className="space-y-10">
                                    {/* Boy Progress */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between font-serif text-sm tracking-widest uppercase text-gray-600">
                                            <span>Team Boy</span>
                                            <span>{boyPercent}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${boyPercent}%` }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className="h-full bg-powder-blue shadow-[0_0_15px_rgba(176,224,230,0.5)]"
                                            />
                                        </div>
                                    </div>

                                    {/* Girl Progress */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between font-serif text-sm tracking-widest uppercase text-gray-600">
                                            <span>Team Girl</span>
                                            <span>{girlPercent}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${girlPercent}%` }}
                                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                                className="h-full bg-cotton-rose shadow-[0_0_15px_rgba(255,192,203,0.5)]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <p className="text-sm font-handwriting text-2xl text-rose-gold opacity-80 pt-4">
                                    Merci d'avoir partagé ce moment avec nous...
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
