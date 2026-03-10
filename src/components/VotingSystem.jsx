import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Baby, Heart } from 'lucide-react';

export default function VotingSystem({ onVote, votes = [] }) {
    const [hasVoted, setHasVoted] = useState(false);
    const [name, setName] = useState('');
    const [selection, setSelection] = useState(null);

    // Calculate real stats from the votes prop
    const boyVotes = votes.filter(v => v.choice === 'boy').length;
    const girlVotes = votes.filter(v => v.choice === 'girl').length;
    const total = votes.length || 1; // Avoid division by zero

    // Fallback to a balanced view if no votes yet (for aesthetics)
    let boyPercent = Math.round((boyVotes / total) * 100);
    let girlPercent = Math.round((girlVotes / total) * 100);

    if (votes.length === 0) {
        boyPercent = 50;
        girlPercent = 50;
    }

    const handleVote = (type) => {
        if (!name.trim()) return;
        setSelection(type);
        setHasVoted(true);
        if (onVote) {
            onVote({ name: name.trim(), choice: type });
        }
    };

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
                    <p className="text-3xl md:text-5xl text-gray-500 font-normal" style={{ fontFamily: 'Aref Ruqaa, serif' }}>
                        {hasVoted ? "شكراً لتصويتكم !" : "شاركوا توقعاتكم"}
                    </p>
                    <p className="font-body text-gray-500 max-w-md mx-auto">
                        {hasVoted
                            ? `Vous avez choisi un ${selection === 'boy' ? 'Little Prince' : 'Little Princess'}. Voici les tendances actuelles :`
                            : "Alors, équipe Bleu ou équipe Rose ? Laissez parler votre intuition."
                        }
                    </p>
                    <p className="font-handwriting text-xl md:text-2xl text-rose-gold/80 italic">
                        {hasVoted
                            ? `You chose ${selection === 'boy' ? 'a Little Prince' : 'a Little Princess'}. Current trends:`
                            : "Blue team or Pink team? Let your intuition speak."
                        }
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative">
                    <AnimatePresence mode="wait">
                        {!hasVoted ? (
                            <div className="col-span-full space-y-12">
                                {/* Name Input Field */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="max-w-md mx-auto w-full space-y-4"
                                >
                                    <div className="space-y-1">
                                        <label className="block font-serif text-xs uppercase tracking-[0.3em] text-gray-400 text-center">Votre Nom / Your Name</label>
                                        <label className="block text-xl md:text-2xl text-gray-500 text-center" style={{ fontFamily: 'Aref Ruqaa, serif' }}>اسمك بالكامل</label>
                                    </div>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Entrez votre nom ici... / Enter your name..."
                                        className="w-full glass bg-white/50 border border-rose-gold/20 rounded-2xl px-6 py-4 text-center outline-none focus:ring-2 focus:ring-rose-gold/30 transition-all font-serif text-lg text-gray-700"
                                    />
                                </motion.div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 opacity-transition transition-opacity duration-500" style={{ opacity: name.trim().length > 2 ? 1 : 0.4 }}>
                                    {/* Boy Vote Card */}
                                    <motion.button
                                        key="vote-boy"
                                        whileHover={name.trim().length > 2 ? { y: -10, scale: 1.02 } : {}}
                                        whileTap={name.trim().length > 2 ? { scale: 0.98 } : {}}
                                        onClick={() => handleVote('boy')}
                                        disabled={name.trim().length <= 2}
                                        className="glass group p-8 rounded-[32px] flex flex-col items-center gap-6 border-powder-blue/30 hover:shadow-powder-blue/20 transition-all duration-500 disabled:cursor-not-allowed"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-powder-blue/20 flex items-center justify-center text-powder-blue group-hover:scale-110 transition-transform">
                                            <Baby className="w-10 h-10" />
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="font-serif text-2xl tracking-widest uppercase text-gray-700">Little Prince</span>
                                            <span className="text-3xl text-powder-blue" style={{ fontFamily: 'Aref Ruqaa, serif' }}>الأمير الصغير</span>
                                        </div>
                                        <div className="text-xs tracking-[0.2em] text-gray-400">Équipe Little Prince</div>
                                    </motion.button>

                                    {/* Girl Vote Card */}
                                    <motion.button
                                        key="vote-girl"
                                        whileHover={name.trim().length > 2 ? { y: -10, scale: 1.02 } : {}}
                                        whileTap={name.trim().length > 2 ? { scale: 0.98 } : {}}
                                        onClick={() => handleVote('girl')}
                                        disabled={name.trim().length <= 2}
                                        className="glass group p-8 rounded-[32px] flex flex-col items-center gap-6 border-cotton-rose/30 hover:shadow-cotton-rose/20 transition-all duration-500 disabled:cursor-not-allowed"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-cotton-rose/20 flex items-center justify-center text-cotton-rose group-hover:scale-110 transition-transform">
                                            <Heart className="w-10 h-10" />
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="font-serif text-2xl tracking-widest uppercase text-gray-700">Little Princess</span>
                                            <span className="text-3xl text-cotton-rose" style={{ fontFamily: 'Aref Ruqaa, serif' }}>الأميرة الصغيرة</span>
                                        </div>
                                        <div className="text-xs tracking-[0.2em] text-gray-400">Équipe Little Princess</div>
                                    </motion.button>
                                </div>
                            </div>
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
                                            <span>Little Prince / الأمير الصغير</span>
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
                                            <span>Little Princess / الأميرة الصغيرة</span>
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
                                <p className="text-3xl text-gray-500 font-normal" style={{ fontFamily: 'Aref Ruqaa, serif' }}>
                                    شكراً لمشاركتكم هذه اللحظة معنا...
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
