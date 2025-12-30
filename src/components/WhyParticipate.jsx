import { motion } from 'framer-motion';
import { Brain, Trophy, Users, Award, Briefcase } from 'lucide-react';

const benefits = [
    {
        icon: <Briefcase size={32} />,
        title: "Placement Oriented",
        desc: "The algorithms chosen are highly targeted and directly aligned with placement-oriented problem-solving requirements."
    },
    {
        icon: <Award size={32} />,
        title: "Exciting Prizes",
        desc: "Prizes will be awarded to the top Performers in each round. Prizes include GFG Goodies, Zebronics Keyboard & Mouse Combo and Cash Prizes."
    },
    {
        icon: <Brain size={32} />,
        title: "Algorithmic Thinking",
        desc: "Sharpen your problem-solving skills and learn to approach challenges logically."
    }
];

const WhyParticipate = () => {
    return (
        <section id="why-participate" className="py-12 md:py-24 relative overflow-hidden text-white bg-green-900/80 backdrop-blur-lg border-y border-white/10">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Why <span className="text-green-400" style={{ color: 'var(--primary-hover)' }}>Participate</span>?</h2>
                    <p className="text-green-100 text-base md:text-lg max-w-2xl mx-auto opacity-90">
                        Unlocking potential through code. Here is what you gain from this experience.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {benefits.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={`bg-black/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/5 hover:bg-black/60 hover:border-green-500/30 transition-all group ${idx === 3 ? 'md:col-span-1 md:col-start-1 md:translate-x-1/2' : ''} ${idx === 4 ? 'md:col-span-1 md:col-start-2 md:translate-x-1/2' : ''}`}
                        // Adjust grid specific logic if needed, simplify for now
                        >
                            <div className="mb-6 p-4 bg-green-500/20 rounded-xl inline-block text-green-300 group-hover:text-white group-hover:bg-green-500 transition-colors" style={{ color: 'var(--primary-hover)' }}>
                                {item.icon}
                            </div>
                            <h3 className="text-lg md:text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-green-100 opacity-70 leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyParticipate;
