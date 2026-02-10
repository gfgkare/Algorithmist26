import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { CheckCircle2, BookOpen, Presentation, Bug, Terminal } from 'lucide-react';
import TiltCard from './TiltCard';

const rounds = [
    { id: 1, title: "Round 1: AlgoTussle", subtitle: "Quiz", desc: "Scenario based problems, Time-Space Complexity, Predict the output.", prize: "Prize: Merit Certificate", prizeIcon: "📜", icon: <CheckCircle2 size={24} />, date: "FEB 11 2026" },
    { id: 2, title: "Round 2: AlgoRythms", subtitle: "Seminar", desc: "Seminar based on selected Algorithms (3 – 4).", prize: "Prize: GFG T-Shirt & Goodies + Merit Certificate", prizeIcon: "👕", icon: <BookOpen size={24} />, date: "FEB 17 - FEB 19 2026" },
    { id: 3, title: "Round 3: Page2Stage", subtitle: "Article Presentation", desc: "PPT Presentation based on Recent Algorithm.", prize: "Prize: Zebronics Keyboard & Mouse Combo", prizeIcon: "⌨️", icon: <Presentation size={24} />, date: "MARCH 3 - MARCH 5 2026" },
    { id: 4, title: "Round 4: AlgoSniff", subtitle: "Debug", desc: "Debugging the Given Code.", prize: "Prize: GFG Diary, Pen & Key Chain", prizeIcon: "🎁", icon: <Bug size={24} />, date: "MARCH 18 2026" },
    { id: 5, title: "Round 5: CodeBlitz", subtitle: "Grand Finale", desc: "Showcasing the Coding Skills.", prize: "Prize: Cash Prizes worth ₹6000", prizeIcon: "💰", icon: <Terminal size={24} />, date: "MARCH 30 2026" }
];

const Roadmap = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    return (
        <section id="roadmap" className="py-12 md:py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10" ref={containerRef}>
                <div className="text-center mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-6xl font-black mb-4 tracking-normal">Event <span className="text-green-600">Roadmap</span></h2>
                        <p className="text-base md:text-lg text-gray-500">The journey to victory</p>
                    </motion.div>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/5  md:-translate-x-1/2 rounded-full overflow-hidden">
                        <motion.div
                            className="w-full bg-gradient-to-b from-green-400 via-emerald-500 to-green-600 origin-top shadow-[0_0_20px_rgba(74,222,128,0.6)]"
                            style={{ height: "100%", scaleY: scrollYProgress }}
                        />
                    </div>

                    <div className="space-y-8 md:space-y-12">
                        {rounds.map((round, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={round.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`flex flex-col md:flex-row items-center gap-6 md:gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
                                >
                                    {/* Content Side */}
                                    <div className={`w-full md:w-[calc(50%-2rem)] pl-12 md:pl-0 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                                        <TiltCard className="inline-block w-full">
                                            <div className="glass-card p-5 md:p-6 rounded-2xl border border-white/10 shadow-lg hover:shadow-green-500/20 transition-all bg-white/5 backdrop-blur-sm relative overflow-hidden">
                                                <div className="absolute top-0 right-0 bg-green-600/20 text-green-400 px-3 py-1 text-xs font-bold rounded-bl-xl border-b border-l border-white/10">
                                                    {round.date}
                                                </div>
                                                <h3 className="text-xl md:text-2xl font-bold text-gray-100 mb-1">{round.title}</h3>
                                                <h4 className="text-base md:text-lg font-semibold text-green-400 mb-2">{round.subtitle}</h4>
                                                <p className="text-gray-100 mb-3">{round.desc}</p>
                                                {round.prize && (
                                                    <div className={`flex items-center gap-2 text-yellow-400 font-medium text-sm bg-yellow-400/10 px-3 py-1.5 rounded-lg w-fit border border-yellow-400/20 shadow-sm ${[2, 4].includes(round.id) ? 'ml-auto' : ''}`}>
                                                        <span className="text-lg">{round.prizeIcon}</span>
                                                        <span>{round.prize}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </TiltCard>
                                    </div>

                                    {/* Center Node */}
                                    <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8 md:w-12 md:h-12 bg-white rounded-full border-4 border-green-500 z-10 shadow-md">
                                        <div className="text-green-600 scale-75 md:scale-100">
                                            {round.icon}
                                        </div>
                                    </div>

                                    {/* Empty Side for alignment */}
                                    <div className="hidden md:block w-[calc(50%-2rem)]" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Roadmap;
