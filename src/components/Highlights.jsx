import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, Target, Zap, Users } from 'lucide-react';
import TiltCard from './TiltCard';

const Highlights = () => {
    return (
        <section id="highlights" className="py-12 md:py-24 bg-transparent">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">

                    <div className="md:w-1/3">
                        <span className="text-green-600 font-bold uppercase tracking-wider text-sm mb-2 block" style={{ color: 'var(--primary)' }}>Highlights</span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                            Igniting the <br />
                            <span className="text-green-500" style={{ color: 'var(--primary)' }}>Spark of Logic</span>
                        </h2>
                        <p className="text-gray-400 mb-6">
                            Algorithmst 26 is more than a competition. It is a festival of intellect, designed to bring out the best in every participant through collaboration and rigorous challenge.
                        </p>
                        <Link to="/register" className="text-green-600 font-bold hover:underline flex items-center gap-2" style={{ color: 'var(--primary)' }}>
                            Join the Movement &rarr;
                        </Link>
                    </div>

                    <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <TiltCard>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="p-6 bg-green-900/20 rounded-2xl border border-green-500/30 backdrop-blur-sm h-full"
                                style={{ background: 'rgba(0, 200, 83, 0.1)' }}
                            >
                                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 mb-4">
                                    <Zap size={20} />
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-gray-100">Innovation</h3>
                                <p className="text-sm text-gray-400">Encouraging out-of-the-box thinking to solve complex algorithmic problems.</p>
                            </motion.div>
                        </TiltCard>

                        <TiltCard>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="p-6 bg-blue-900/20 rounded-2xl border border-blue-500/30 backdrop-blur-sm h-full"
                            >
                                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 mb-4">
                                    <Target size={20} />
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-gray-100">Competition</h3>
                                <p className="text-sm text-gray-400">A healthy competitive environment to push your limits.</p>
                            </motion.div>
                        </TiltCard>

                        <TiltCard>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="p-6 bg-purple-900/20 rounded-2xl border border-purple-500/30 backdrop-blur-sm h-full"
                            >
                                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 mb-4">
                                    <Users size={20} />
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-gray-100">Mentorship</h3>
                                <p className="text-sm text-gray-400">Guidance from seniors and experts throughout the event.</p>
                            </motion.div>
                        </TiltCard>

                        <TiltCard>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="p-6 bg-yellow-900/20 rounded-2xl border border-yellow-500/30 backdrop-blur-sm h-full"
                            >
                                <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-400 mb-4">
                                    <Lightbulb size={20} />
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-gray-100">Growth</h3>
                                <p className="text-sm text-gray-400">An opportunity to grow your network and skills exponentially.</p>
                            </motion.div>
                        </TiltCard>
                    </div>

                </div>
            </div>
        </section>
    );
};


export default Highlights;
