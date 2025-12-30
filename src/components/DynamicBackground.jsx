import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const DynamicBackground = () => {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    // Parallax effect for background elements
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">

            {/* 0. Global Spotlight (The 'Stage Light' effect) - BRIGHTENED & OPTIMIZED */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-green-500/20 blur-[80px] rounded-full z-0 will-change-transform" />

            {/* 0.5 Vignette (Focuses the eye) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-20" />

            {/* 1. Subtle Grain Texture (Adds premium feel) */}
            <div className="absolute inset-0 opacity-[0.2] z-10 mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")` }}
            />

            {/* 2. Elegant Mesh Gradients - Adjusted for Dark Mode & Performance */}
            {/* Top Right - Neon Green Glow */}
            <motion.div
                style={{ y: y1 }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.6, 0.5],
                    rotate: [0, 45, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full blur-[60px] will-change-transform"
            >
                <div
                    className="w-full h-full rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(0,200,83,0.15) 0%, rgba(0,0,0,0) 70%)' }}
                />
            </motion.div>

            {/* Bottom Left - Deep Emerald/Teal Glow */}
            <motion.div
                style={{ y: y2 }}
                animate={{
                    scale: [1.1, 1, 1.1],
                    opacity: [0.4, 0.5, 0.4],
                    rotate: [0, -30, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-[60px] will-change-transform"
            >
                <div className="w-full h-full bg-gradient-to-tr from-emerald-900/20 to-green-900/10 rounded-full" />
            </motion.div>

            {/* 3. Floating Particles (Bright Green for Contrast) - Reduced Count for Performance */}
            <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-green-400 rounded-full opacity-60"
                        style={{
                            width: Math.random() * 3 + 1 + "px",
                            height: Math.random() * 3 + 1 + "px",
                            left: Math.random() * 100 + "%",
                            top: Math.random() * 100 + "%",
                        }}
                        animate={{
                            y: [0, Math.random() * -100 - 50],
                            opacity: [0, 0.8, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 5
                        }}
                    />
                ))}
            </div>

            {/* 4. Modern Grid Overlay (White subtle lines for dark mode) */}
            <div
                className="absolute inset-0 z-0 opacity-[0.2]"
                style={{
                    backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />
        </div>
    );
};

export default DynamicBackground;
