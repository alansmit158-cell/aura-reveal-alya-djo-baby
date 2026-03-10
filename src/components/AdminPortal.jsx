import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Baby, Heart, BarChart3, Settings } from 'lucide-react';

export default function AdminPortal({ onConfigChange, currentResult, currentDate, votes = [] }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Local state for pending changes
    const [localResult, setLocalResult] = useState(currentResult);
    const [localDate, setLocalDate] = useState(currentDate);
    const [isSaving, setIsSaving] = useState(false);

    // Sync local state when props change (initial load)
    useEffect(() => {
        setLocalResult(currentResult);
        setLocalDate(currentDate);
    }, [currentResult, currentDate]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'aura2026') {
            setIsAuthenticated(true);
        } else {
            setError('Mot de passe incorrect');
            setTimeout(() => setError(''), 2000);
        }
    };

    const handleSave = async () => {
        if (onConfigChange) {
            setIsSaving(true);
            try {
                await onConfigChange({ revealResult: localResult, revealDate: localDate });
                // Optional: show a temporary success state
            } finally {
                setIsSaving(false);
            }
        }
    };

    if (!isAuthenticated) {
        // ... (Login UI remains the same)
        return (
            <div className="min-h-screen flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full glass p-10 rounded-[40px] shadow-2xl space-y-8"
                >
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-rose-gold/10 flex items-center justify-center text-rose-gold">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h2 className="font-serif text-3xl text-foreground">Espace Parents</h2>
                        <p className="text-gray-400 text-sm font-serif tracking-widest uppercase text-center">Entrez le code pour accéder au dashboard</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-nacre/50 border border-rose-gold/20 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-rose-gold/30 transition-all font-serif"
                                placeholder="Code Secret"
                            />
                            <AnimatePresence>
                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute -bottom-6 left-2 text-xs text-red-400 font-serif"
                                    >
                                        {error}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                        <button className="w-full bg-rose-gold text-white font-serif py-4 rounded-2xl shadow-xl hover:shadow-rose-gold/20 hover:scale-[1.02] transition-all">
                            Se Connecter
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-6">
            <div className="max-w-5xl mx-auto space-y-12">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-rose-gold/10 pb-12">
                    <div className="space-y-2">
                        <h1 className="font-serif text-5xl text-foreground">Aura Reveal Admin</h1>
                        <p className="font-serif text-rose-gold uppercase tracking-[0.4em] text-xs">Bonjour Alya & Djo</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="glass px-6 py-3 rounded-2xl flex items-center gap-3">
                            <BarChart3 className="w-4 h-4 text-gray-400" />
                            <span className="font-serif text-xl">{votes.length} <span className="text-sm text-gray-400 ml-1">Votes</span></span>
                        </div>

                        {/* Final Save Button in Header */}
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className={`px-8 py-3 rounded-2xl bg-rose-gold text-white font-serif shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Reveal Control */}
                    <div className="glass p-10 rounded-[48px] space-y-8">
                        <div className="flex items-center gap-3">
                            <Settings className="w-5 h-5 text-rose-gold" />
                            <h3 className="font-serif text-xl uppercase tracking-widest text-gray-600">Résultat Final</h3>
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed">
                            Définissez le résultat qui sera révélé à la fin du compte à rebours. Ce paramètre est confidentiel.
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setLocalResult('boy')}
                                className={`flex-1 flex flex-col items-center gap-4 p-6 rounded-3xl border transition-all ${localResult === 'boy' ? 'bg-powder-blue text-white shadow-lg border-transparent' : 'bg-white/50 border-gray-100 text-gray-400'}`}
                            >
                                <Baby className="w-8 h-8" />
                                <span className="font-serif text-lg">C'est un Garçon</span>
                            </button>
                            <button
                                onClick={() => setLocalResult('girl')}
                                className={`flex-1 flex flex-col items-center gap-4 p-6 rounded-3xl border transition-all ${localResult === 'girl' ? 'bg-cotton-rose text-white shadow-lg border-transparent' : 'bg-white/50 border-gray-100 text-gray-400'}`}
                            >
                                <Heart className="w-8 h-8" />
                                <span className="font-serif text-lg">C'est une Fille</span>
                            </button>
                        </div>
                    </div>

                    {/* Config Control */}
                    <div className="glass p-10 rounded-[48px] space-y-8">
                        <div className="flex items-center gap-3">
                            <Settings className="w-5 h-5 text-rose-gold" />
                            <h3 className="font-serif text-xl uppercase tracking-widest text-gray-600">Paramètres</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-serif uppercase tracking-widest text-gray-400 px-2">Date du Reveal</label>
                                <input
                                    type="datetime-local"
                                    value={localDate}
                                    onChange={(e) => setLocalDate(e.target.value)}
                                    className="w-full glass bg-white/50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-rose-gold/30 transition-all font-serif"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-serif uppercase tracking-widest text-gray-400 px-2">Votre Message</label>
                                <textarea
                                    className="w-full glass bg-white/50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-rose-gold/30 transition-all font-serif min-h-[120px]"
                                    placeholder="Écrivez votre message doux ici..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Vote Log */}
                <div className="glass p-10 rounded-[48px] space-y-8">
                    <div className="flex items-center gap-3">
                        <BarChart3 className="w-5 h-5 text-rose-gold" />
                        <h3 className="font-serif text-xl uppercase tracking-widest text-gray-600">Détails des Votes</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 font-serif text-xs uppercase tracking-widest text-gray-400">
                                    <th className="py-4 px-4 font-normal">Nom</th>
                                    <th className="py-4 px-4 font-normal">Choix</th>
                                    <th className="py-4 px-4 font-normal">Heure</th>
                                </tr>
                            </thead>
                            <tbody className="font-body text-gray-600">
                                {votes.length > 0 ? (
                                    votes.map((vote, idx) => (
                                        <tr key={idx} className="border-b border-gray-50 hover:bg-nacre/30 transition-colors">
                                            <td className="py-4 px-4 font-medium text-gray-800">{vote.name}</td>
                                            <td className="py-4 px-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold ${vote.choice === 'boy' ? 'bg-powder-blue/20 text-powder-blue' : 'bg-cotton-rose/20 text-cotton-rose'}`}>
                                                    {vote.choice === 'boy' ? 'Petit Prince' : 'Petite Princesse'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-xs text-gray-400">
                                                {new Date(vote.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="py-12 text-center text-gray-400 font-serif italic">Aucun vote enregistré pour le moment.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="text-center pt-12">
                    <a href="#" className="font-serif text-xs tracking-widest uppercase text-gray-400 hover:text-rose-gold transition-colors">Retour à la page publique</a>
                </div>
            </div>
        </div>
    );
}
