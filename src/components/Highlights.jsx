import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, Target, Zap, Users, Play, Pause } from 'lucide-react';
import TiltCard from './TiltCard';

const Highlights = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <section id="highlights" className="py-16 md:py-24 lg:py-32 bg-transparent border-t border-white/5 overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-center">

                    {/* Left: Text Content - Optimized for Reading */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-[55%] text-center lg:text-left"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-green-500 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block"
                        >
                            Event Recap
                        </motion.span>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 text-white leading-[1.1] tracking-tight">
                            PREVIOUS YEAR <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">HIGHLIGHTS</span>
                        </h2>
                        <p className="text-gray-400 mb-10 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                            Relive the moments of triumph, innovation, and code from our past champions. Experience the energy that defines Algorithmist.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-12">
                            {[
                                { icon: <Target className="text-green-400" />, title: "Competitive Edge", desc: "Real-time arena." },
                                { icon: <Zap className="text-emerald-400" />, title: "Fast-Paced Logic", desc: "Deep optimization." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center lg:items-start gap-4 text-left flex-1 bg-white/5 p-4 rounded-2xl border border-white/10 hover:border-green-500/30 transition-all cursor-default"
                                >
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 transition-colors shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-base md:text-lg">{item.title}</h4>
                                        <p className="text-gray-500 text-xs md:text-sm">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div whileTap={{ scale: 0.95 }}>
                            <Link
                                to="/register"
                                className="group relative inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-green-600 text-black font-bold text-lg rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:bg-green-500 hover:scale-105 active:shadow-inner"
                            >
                                Register for 2026
                                <Play size={16} fill="currentColor" className="ml-1" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right: Video Section - Optimized for Container/Mobile */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-[45%] max-w-2xl mx-auto"
                    >
                        <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-black/40 group cursor-pointer" onClick={togglePlay}>
                            {/* Video Element - Preloaded for performance */}
                            <video
                                ref={videoRef}
                                loop
                                playsInline
                                preload="metadata"
                                className="w-full h-auto block opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                            >
                                <source src="/gfg video.mp4" type="video/mp4" />
                            </video>

                            {/* Video Overlay controls - Touch Friendly */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 md:p-10 flex items-center gap-5 transition-opacity duration-300">
                                <button
                                    onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                                    className="w-14 h-14 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center text-black shadow-[0_0_40px_rgba(34,197,94,0.4)] hover:scale-110 active:scale-90 transition-transform z-20"
                                >
                                    {isPlaying ? <Pause fill="currentColor" size={24} /> : <Play fill="currentColor" size={24} className="ml-1" />}
                                </button>
                                <div className="hidden sm:block">
                                    <h3 className="text-white font-bold text-lg md:text-xl tracking-wide">Algorithmist Experience</h3>
                                    <p className="text-green-400/80 text-xs font-medium uppercase tracking-widest">{isPlaying ? 'Now Playing' : 'Tap to Play'}</p>
                                </div>
                            </div>

                            {/* Center Play Button Overlay - Large hit area for mobile */}
                            {!isPlaying && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors pointer-events-none">
                                    <motion.div
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: [0.8, 1.1, 1] }}
                                        className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20"
                                    >
                                        <Play fill="white" size={32} className="text-white ml-1" />
                                    </motion.div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                </div>

                {/* Bottom Stats - Responsive Grid */}
                <div className="mt-16 md:mt-24 lg:mt-32 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 opacity-60 hover:opacity-100 transition-opacity duration-500">
                    {[
                        { title: "Innovation", value: "25 Algorithms" },
                        { title: "Challenge", value: "5 Rounds" },
                        { title: "Excellence", value: "Rewards" }
                    ].map((stat, i) => (
                        <div key={i} className={`text-center p-4 md:p-6 rounded-2xl bg-white/5 border border-white/5 ${i === 2 ? 'col-span-2 md:col-span-1' : ''}`}>
                            <p className="text-green-500 text-[10px] md:text-sm font-bold uppercase tracking-widest mb-1">{stat.title}</p>
                            <p className="text-white text-lg md:text-xl font-black">{stat.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Highlights;
