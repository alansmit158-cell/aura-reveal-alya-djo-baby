import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import VotingSystem from './components/VotingSystem';
import Countdown from './components/Countdown';
import MessageSection from './components/MessageSection';
import AudioPlayer from './components/AudioPlayer';
import RevealFinal from './components/RevealFinal';
import AdminPortal from './components/AdminPortal';

const API_BASE = 'http://localhost:5005/api/baby-reveal/aura-reveal';

function App() {
  const [step, setStep] = useState('intro'); // 'intro', 'public', 'revealed'
  const [showAdmin, setShowAdmin] = useState(window.location.hash === '#reveal-admin');
  const [revealResult, setRevealResult] = useState('boy');
  const [votes, setVotes] = useState([]); // Array of { name, choice, timestamp }
  const [revealDate, setRevealDate] = useState("2026-04-12T18:00:00");

  useEffect(() => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(data => {
        if (data.revealResult) setRevealResult(data.revealResult);
        if (data.votes) setVotes(data.votes);
        if (data.revealDate) setRevealDate(data.revealDate);
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const handleVote = async (newVote) => {
    try {
      const res = await fetch(`${API_BASE}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVote)
      });
      const data = await res.json();
      setVotes(data.votes);
    } catch (err) {
      console.error("Vote error:", err);
    }
  };

  const handleConfigChange = async (updates) => {
    try {
      const res = await fetch(`${API_BASE}/config`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      setRevealResult(data.revealResult);
      setRevealDate(data.revealDate);
    } catch (err) {
      console.error("Config error:", err);
    }
  };

  // Quick hash navigation for testing/admin
  useEffect(() => {
    const handleHashChange = () => {
      setShowAdmin(window.location.hash === '#reveal-admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (showAdmin) {
    return (
      <Layout>
        <AdminPortal
          onConfigChange={handleConfigChange}
          currentResult={revealResult}
          currentDate={revealDate}
          votes={votes}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen flex items-center justify-center p-6"
          >
            <MessageSection onComplete={() => setStep('public')} />
          </motion.div>
        )}

        {step === 'public' && (
          <motion.div
            key="public"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-32 pb-32"
          >
            <Hero />
            <VotingSystem onVote={handleVote} votes={votes} />
            <Countdown targetDate={revealDate} onComplete={() => setStep('revealed')} />
          </motion.div>
        )}

        {step === 'revealed' && (
          <motion.div key="revealed" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <RevealFinal result={revealResult} />
          </motion.div>
        )}
      </AnimatePresence>

      <AudioPlayer isRevealing={step === 'revealed'} result={revealResult} />

      {/* Secret Admin Trigger - Very subtle */}
      <button
        onClick={() => window.location.hash = '#reveal-admin'}
        className="fixed bottom-4 right-4 z-[9999] opacity-[0.02] hover:opacity-20 transition-all cursor-default"
        title="Admin"
      >
        <Lock className="w-4 h-4 text-rose-gold" />
      </button>
    </Layout>
  );
}

export default App;
