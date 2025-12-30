import { motion } from 'framer-motion';
import { Network, Code, Cpu, Award, Briefcase, Target } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-12 md:py-20 relative overflow-hidden bg-transparent">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid md:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-green-600 font-bold uppercase tracking-wider text-sm mb-2 block" style={{ color: 'var(--primary)' }}>About The Event</span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                            Where Logic Meets <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-300" style={{ backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary-green))' }}>Innovation</span>
                        </h2>

                        <p className="text-gray-400 text-base md:text-lg mb-6 leading-relaxed">
                            We are excited to Introduce <strong className="text-green-500" style={{ color: 'var(--primary)' }}>“Algorithmist 26”</strong>, a series of algorithmic coding events presented by the <strong className="text-white">GFG CAMPUS BODY KARE</strong> and proudly sponsored by GeeksforGeeks.
                        </p>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            This Competition is composed of five rounds, with each round progressively increasing in complexity and challenge. Throughout the event, participants will have the opportunity to acquaint themselves with 30 distinct algorithms and acquire practical skills to utilize them in real-world situations. Our primary objective is to provide students with a platform to enhance their coding proficiency and critical thinking capabilities.
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <div className="w-12 h-12 rounded-xl bg-green-900/30 border border-green-500/20 flex items-center justify-center text-green-400 mb-2" style={{ background: 'rgba(0, 200, 83, 0.1)', color: 'var(--primary)' }}>
                                    <Code size={24} />
                                </div>
                                <h4 className="font-bold text-gray-200">5 Rounds</h4>
                                <p className="text-sm text-gray-400">Diverse technical challenges</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="w-12 h-12 rounded-xl bg-green-900/30 border border-green-500/20 flex items-center justify-center text-green-400 mb-2" style={{ background: 'rgba(0, 200, 83, 0.1)', color: 'var(--primary)' }}>
                                    <Cpu size={24} />
                                </div>
                                <h4 className="font-bold text-gray-200">Elite Peers</h4>
                                <p className="text-sm text-gray-400">Compete with the best</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-green-500 rounded-3xl rotate-6 transform translate-y-4 opacity-20 blur-xl"></div>
                        <div className="relative bg-[#0a0a0a] rounded-3xl p-8 shadow-2xl border border-green-500/30 overflow-hidden group">

                            <h3 className="text-white text-3xl font-bold mb-8 flex items-center gap-3">
                                <span className="p-2 bg-green-500 rounded-lg text-black"><Target size={24} /></span>
                                Event Vision
                            </h3>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="mt-1 p-3 bg-blue-500/10 rounded-xl text-blue-400 h-fit border border-blue-500/20">
                                        <Briefcase size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-1">Placement Ready</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            Empowering students with deep algorithmic understanding to crack top-tier competitive placements.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="mt-1 p-3 bg-purple-500/10 rounded-xl text-purple-400 h-fit border border-purple-500/20">
                                        <Network size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-1">Industry Bridge</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            Bridging the gap between academic theory and real-world industry demands.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="mt-1 p-3 bg-yellow-500/10 rounded-xl text-yellow-400 h-fit border border-yellow-500/20">
                                        <Award size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-1">Technical Excellence</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            Fostering a culture of innovation and high-performance coding standards.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;
