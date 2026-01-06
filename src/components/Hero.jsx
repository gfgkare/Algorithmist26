import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Award, Briefcase, User } from 'lucide-react';
import { useState, useEffect } from 'react';
// import CountdownTimer from './CountdownTimer'; // Removed timer feature
import { useNavigate } from 'react-router-dom';

const ColorCycleText = ({ text }) => {
    return (
        <motion.span
            animate={{
                color: ["#ffffff", "#4ade80", "#16a34a", "#ffffff"], // White -> Green-400 -> Green-600 -> White
                textShadow: [
                    "0 0 0px rgba(74, 222, 128, 0)",
                    "0 0 10px rgba(74, 222, 128, 0.5)",
                    "0 0 20px rgba(22, 163, 74, 0.5)",
                    "0 0 0px rgba(74, 222, 128, 0)"
                ]
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            {text}
        </motion.span>
    );
};



const Hero = () => {
    const navigate = useNavigate();

    return (
        <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="absolute top-20 right-20 w-96 h-96 bg-green-400 rounded-full blur-[100px]" style={{ background: 'var(--primary)' }}></div>
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-400 rounded-full blur-[80px]" style={{ background: 'var(--secondary-green)' }}></div>
            </div>

            {/* Decorative Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(#00C853 1px, transparent 1px), linear-gradient(90deg, #00C853 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center md:text-left"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center md:items-start gap-2 mb-6"
                    >
                        <motion.span
                            animate={{
                                color: ["#4ade80", "#ffffff", "#4ade80"],
                                textShadow: ["0 0 10px rgba(74, 222, 128, 0.5)", "0 0 0px rgba(74, 222, 128, 0)", "0 0 10px rgba(74, 222, 128, 0.5)"]
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="font-bold tracking-wide text-lg md:text-3xl"
                        >
                            GFG Campus Body KARE
                        </motion.span>
                        <span className="text-gray-400 font-bold text-lg md:text-2xl">
                            Presents
                        </span>
                    </motion.div>

                    <h1 className="text-3xl md:text-7xl font-extrabold leading-tight mb-6 tracking-normal text-white">
                        <ColorCycleText text="ALGORITHMST 26" />
                    </h1>

                    <h2 className="text-lg md:text-2xl text-gray-400 mb-8 font-light max-w-lg mx-auto md:mx-0">
                        A Grand Celebration of Algorithms, Logic & Coding Excellence.
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/register')}
                            className="px-6 py-3 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 text-lg transition-all shadow-green-500/20 cursor-pointer"
                            style={{ background: 'var(--primary)' }}
                        >
                            Register Now <ArrowRight size={20} />
                        </motion.button>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="#roadmap"
                            className="px-6 py-3 rounded-xl font-bold bg-white/5 text-gray-200 border border-white/10 shadow-md flex items-center justify-center gap-2 text-lg hover:shadow-lg hover:bg-white/10 transition-all backdrop-blur-sm"
                        >
                            View Roadmap
                        </motion.a>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mt-8 md:mt-12 mb-8 p-4 md:p-6 bg-green-500/10 border border-green-500/30 rounded-2xl relative overflow-hidden backdrop-blur-sm max-w-lg"
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-green-500 box-content"></div>
                        <h4 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
                            <span className="text-green-400">⚡</span> Important Event Details
                        </h4>
                        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-4 text-gray-200 items-start text-left">
                            {/* Item 1 */}
                            <div className="bg-green-500/20 p-1 rounded text-green-400 mt-1">
                                <User size={16} />
                            </div>
                            <div className="text-sm md:text-lg font-bold text-green-400 mt-1.5">
                                Individual Participation
                            </div>

                            {/* Item 2 */}
                            <div className="bg-green-500/20 p-1 rounded text-green-400 mt-1">
                                <Award size={16} />
                            </div>
                            <div className="flex flex-col mt-1.5">
                                <strong className="text-sm md:text-lg font-bold text-green-400">2 Experimental Elective Credits</strong>
                                <span className="text-xs md:text-sm text-gray-400 leading-snug">(Attending all the rounds is required to claim Credits)</span>
                            </div>

                            {/* Item 3 */}
                            <div className="bg-green-500/20 p-1 rounded text-green-400 mt-1">
                                <Briefcase size={16} />
                            </div>
                            <div className="text-sm md:text-lg font-bold text-green-400 mt-1.5">
                                Registration Fees : <strong className="text-sm md:text-lg text-gray-200">Rs 150 /-</strong>
                            </div>
                        </div>
                    </motion.div>


                </motion.div>

                {/* Right Graphic */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative hidden md:block"
                >

                    <div className="relative z-10 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 transform rotate-[-5deg] hover:rotate-0 transition-all duration-500">
                        <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <pre className="font-mono text-sm text-gray-700 overflow-hidden">
                            <code>
                                <span className="text-purple-600">function</span> <span className="text-blue-600">solve</span>(problem) {'{'} {'\n'}
                                {'  '} <span className="text-purple-600">if</span> (!problem.isSolved) {'{'} {'\n'}
                                {'    '} <span className="text-green-600">// Apply Logic</span> {'\n'}
                                {'    '} think(problem); {'\n'}
                                {'    '} code(solution); {'\n'}
                                {'    '} <span className="text-purple-600">return</span> <span className="text-yellow-600">SUCCESS</span>; {'\n'}
                                {'  '} {'}'} {'\n'}
                                {'}'}
                            </code>
                        </pre>
                    </div>

                    {/* Floating Icons */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="absolute -top-10 -right-10 bg-white p-4 rounded-xl shadow-lg"
                    >
                        <Terminal size={32} className="text-green-500" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
