import { motion } from 'framer-motion';
import { Network, Code, Cpu } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-20 relative overflow-hidden bg-transparent">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid md:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-green-600 font-bold uppercase tracking-wider text-sm mb-2 block" style={{ color: 'var(--primary)' }}>About The Event</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                            Where Logic Meets <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-300" style={{ backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary-green))' }}>Innovation</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                            <strong className="text-white">GFG Campus Body KARE</strong> is proud to present <strong className="text-green-500" style={{ color: 'var(--primary)' }}>ALGORITHMST 26</strong>, a grand technical symposium designed to push the boundaries of your algorithmic thinking.
                        </p>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            This isn't just another coding contest. It's a multi-stage journey through the depths of computer science, testing your ability to optimize, debug, research, and implement solutions under pressure. Whether you're a competitive programmer or a curious beginner, this event has a challenge for you.
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
                        <div className="absolute inset-0 bg-green-200 rounded-3xl rotate-6 transform translate-y-4" style={{ background: '#dcfce7' }}></div>
                        <div className="relative bg-black rounded-3xl p-8 shadow-xl overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <Network size={120} color="white" />
                            </div>

                            <h3 className="text-white text-2xl font-bold mb-4">Event Vision</h3>
                            <p className="text-gray-400 mb-6">
                                "To foster a culture of algorithmic excellence and innovation among students, bridging the gap between theoretical knowledge and practical application."
                            </p>

                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${80 + i * 5}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="h-full bg-green-500"
                                            style={{ background: 'var(--primary)' }}
                                        ></motion.div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;
