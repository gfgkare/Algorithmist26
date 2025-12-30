import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const IntroAnimation = ({ onComplete }) => {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        // Sequence timing
        const timers = [
            setTimeout(() => setStage(1), 2000), // Show "Presents" (was 1000)
            setTimeout(() => setStage(2), 4000), // Transition to Title (was 2500)
            setTimeout(() => setStage(3), 6500), // Reveal Main Site (was 4000)
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <motion.div
            key="intro-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
        >
            <AnimatePresence mode='wait'>
                {stage === 0 && (
                    <motion.div
                        key="stage-0"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, filter: "blur(10px)" }}
                        className="text-center"
                    >
                        <h2 className="text-2xl md:text-3xl text-gray-400 font-light tracking-[0.2em] mb-4">
                            GFG CAMPUS BODY KARE
                        </h2>
                    </motion.div>
                )}

                {stage === 1 && (
                    <motion.div
                        key="stage-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center"
                    >
                        <h2 className="text-2xl md:text-3xl text-white font-light tracking-[0.2em]">
                            PRESENTS
                        </h2>
                    </motion.div>
                )}

                {stage === 2 && (
                    <motion.div
                        key="stage-2"
                        initial={{ scale: 1.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onAnimationComplete={() => setTimeout(onComplete, 1000)}
                        className="text-center relative"
                    >
                        <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 tracking-tighter filter drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]">
                            ALGORITHMST
                        </h1>
                        <motion.span
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-4xl md:text-7xl font-bold text-white absolute -right-4 -bottom-4 md:-right-8 md:-bottom-8"
                        >
                            26
                        </motion.span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default IntroAnimation;
