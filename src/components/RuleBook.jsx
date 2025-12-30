import { motion } from 'framer-motion';
import { Scroll, Users, Ticket, AlertTriangle, Clock, ShieldAlert, Award, BookOpen, LayoutList, ExternalLink } from 'lucide-react';
import TiltCard from './TiltCard';

const RuleBook = () => {
    return (
        <section className="py-12 md:py-24 relative overflow-hidden" id="rulebook">
            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-6xl font-black mb-4 tracking-normal">Rule <span className="text-green-600">Book</span></h2>
                        <p className="text-lg text-gray-500">Guidelines & Protocols</p>
                    </motion.div>
                </div>

                <div className="max-w-6xl mx-auto space-y-12">

                    {/* Introduction Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <TiltCard>
                            <div className="glass-card p-6 md:p-12 rounded-3xl border border-green-500/20 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <BookOpen size={200} />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                        <Scroll className="text-green-500" />
                                        Algorithmist<span className="text-green-500">’26</span>
                                    </h3>
                                    <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                                        <span className="text-white font-semibold">"Algorithmist</span> <span className="text-green-400 font-semibold">’26"</span> is a coding event designed for students, with the goal of increasing coding culture in our college. The competition comprises five rounds, each progressively raising the bar in terms of complexity and challenge.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                            <div className="flex items-center gap-3 mb-2 text-yellow-400 font-semibold">
                                                <Award size={20} />
                                                <span>Rewards</span>
                                            </div>
                                            <p className="text-sm text-gray-400">Cash prizes for top 3 in each round. Experimental Elective credits for winners & finalists.</p>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                            <div className="flex items-center gap-3 mb-2 text-blue-400 font-semibold">
                                                <Users size={20} />
                                                <span>Support</span>
                                            </div>
                                            <p className="text-sm text-gray-400">Additional support from our team enhances learning and provides valuable guidance.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TiltCard>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Registration Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="h-full"
                        >
                            <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 h-full hover:border-green-500/30 transition-colors">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                    <Ticket className="text-green-500" />
                                    Registration
                                </h3>
                                <ul className="space-y-6">
                                    <li className="flex gap-4">
                                        <div className="bg-green-500/10 p-3 rounded-lg h-fit text-green-500">
                                            <Users size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-200 mb-1">Eligibility</h4>
                                            <p className="text-gray-400 text-sm">All II, III and IV-year students of CSE, IT; I and II years of MCA, M.Sc. CS, DS</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="bg-green-500/10 p-3 rounded-lg h-fit text-green-500">
                                            <Ticket size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-200 mb-1">Registration Amount</h4>
                                            <p className="text-gray-400 text-sm">Rs.150/- only</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="bg-green-500/10 p-3 rounded-lg h-fit text-green-500">
                                            <AlertTriangle size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-200 mb-1">Selection</h4>
                                            <p className="text-gray-400 text-sm">Limited students will be chosen on a first-come, first-serve basis.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* General Information Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="h-full"
                        >
                            <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 h-full hover:border-green-500/30 transition-colors">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                    <ShieldAlert className="text-green-500" />
                                    General Information
                                </h3>
                                <ul className="space-y-6">
                                    <li className="flex gap-4">
                                        <div className="bg-blue-500/10 p-3 rounded-lg h-fit text-blue-500">
                                            <Users size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-200 mb-1">ID Card</h4>
                                            <p className="text-gray-400 text-sm">Participants must bring their KARE ID Card for all the rounds.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="bg-red-500/10 p-3 rounded-lg h-fit text-red-500">
                                            <ShieldAlert size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-200 mb-1">Restricted Items</h4>
                                            <p className="text-gray-400 text-sm">Mobile Phones and Electronic Gadgets are NOT allowed. Violation leads to disqualification.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="bg-yellow-500/10 p-3 rounded-lg h-fit text-yellow-500">
                                            <Clock size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-200 mb-1">Reporting Time</h4>
                                            <p className="text-gray-400 text-sm">Everyone should present at the event Venue before 15 Minutes.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>

                    {/* List of Algorithms Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="glass-card p-6 md:p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md relative overflow-hidden group shadow-2xl">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <LayoutList size={150} />
                            </div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                                <div className="md:w-2/3">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center justify-center md:justify-start gap-3">
                                        <LayoutList className="text-green-500" />
                                        List Of Algorithms
                                    </h3>
                                    <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                                        To ensure a focused and competitive environment, we have curated a specialized collection of algorithms that will serve as the core syllabus for all competitive rounds. Mastery of these fundamental and advanced patterns is essential for tackling the challenges in <span className="text-white font-semibold italic">Algorithmist </span> <span className="text-green-400 font-semibold italic">'26</span>.
                                    </p>
                                    <p className="text-gray-400 text-[10px] md:text-sm italic">
                                        * The syllabus includes variants of Sorting, Searching, Dynamic Programming, and Graph Theory adapted for real-world scenarios.
                                    </p>
                                </div>
                                <div className="md:w-1/3 w-full">
                                    <a
                                        href="https://gfgkare.github.io/algo26-rulebook/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-3 w-full bg-white/5 hover:bg-green-500 hover:text-black border border-green-500/30 py-4 px-6 rounded-2xl font-bold text-green-400 transition-all group/btn shadow-lg shadow-green-500/5 hover:shadow-green-500/20"
                                    >
                                        <span>VIEW FULL LIST</span>
                                        <ExternalLink size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default RuleBook;
