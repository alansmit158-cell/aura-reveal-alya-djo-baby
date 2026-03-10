import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Hero from './components/Hero';
import VotingSystem from './components/VotingSystem';
import Countdown from './components/Countdown';
import MessageSection from './components/MessageSection';
import AudioPlayer from './components/AudioPlayer';
import RevealFinal from './components/RevealFinal';
import AdminPortal from './components/AdminPortal';

function App() {
  const [step, setStep] = useState('intro'); // 'intro', 'public', 'revealed'
  const [showAdmin, setShowAdmin] = useState(window.location.hash === '#reveal-admin');
  const [revealResult, setRevealResult] = useState('boy');
  const revealDate = "2026-04-12T18:00:00"; // Example target date

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
          onRevealChange={(res) => setRevealResult(res)}
          currentResult={revealResult}
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
            <VotingSystem />
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
    </Layout>
  );
}

export default App;
