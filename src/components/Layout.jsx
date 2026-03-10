import { motion } from 'framer-motion';

const Cloud = ({ delay, top, left, scale }) => (
    <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{
            x: ['0vw', '110vw'],
            opacity: [0, 1, 1, 0]
        }}
        transition={{
            duration: 30 + Math.random() * 20,
            repeat: Infinity,
            delay,
            ease: "linear"
        }}
        className="absolute pointer-events-none"
        style={{ top, left, scale }}
    >
        <div className="w-24 h-8 bg-white/60 blur-xl rounded-full" />
        <div className="w-16 h-12 bg-white/40 blur-lg rounded-full -mt-6 ml-4" />
    </motion.div>
);

const Star = ({ top, left, delay }) => (
    <motion.div
        animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8]
        }}
        transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay
        }}
        className="absolute w-1 h-1 bg-rose-gold/40 rounded-full blur-[0.5px] pointer-events-none"
        style={{ top, left }}
    />
);

export default function Layout({ children }) {
    return (
        <div className="min-h-screen relative overflow-hidden watercolor-bg text-gray-800">
            {/* Environmental Elements */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <Cloud top="10%" delay={0} scale={1.5} />
                <Cloud top="40%" delay={10} scale={1} />
                <Cloud top="70%" delay={5} scale={1.2} />
                <Cloud top="25%" delay={20} scale={0.8} />

                {[...Array(20)].map((_, i) => (
                    <Star
                        key={i}
                        top={`${Math.random() * 100}%`}
                        left={`${Math.random() * 100}%`}
                        delay={Math.random() * 5}
                    />
                ))}
            </div>

            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="relative z-10"
            >
                {children}
            </motion.main>

            {/* Decorative Golden Border */}
            <div className="fixed inset-4 border border-rose-gold/20 pointer-events-none z-50 rounded-[40px]" />
        </div>
    );
}
