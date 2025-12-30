import { motion } from 'framer-motion';
import { CheckCircle, MessageCircle, Home, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Success = () => {
    // Placeholder for WhatsApp Group Link
    const WHATSAPP_LINK = "https://chat.whatsapp.com/Izcl0Uybmb00Yf150IzFHJ";

    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-6">
            {/* Overlay Central Glow to match landing page ambiance */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-2xl"
            >
                <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-green-500/20 bg-black/40 backdrop-blur-3xl shadow-[0_0_50px_rgba(34,197,94,0.1)] text-center">

                    {/* Animated Success Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 10 }}
                        className="w-20 h-20 md:w-24 md:h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 border border-green-500/30 relative"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-green-500/10 rounded-full blur-xl"
                        />
                        <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-green-500 relative z-10" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight"
                    >
                        Registration <span className="text-green-500">Confirmed!</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-gray-400 text-base md:text-lg mb-8 md:mb-10 leading-relaxed px-2 md:px-0"
                    >
                        Congratulations! You have successfully registered for Algorithmist'26.
                        Get ready to showcase your skills and compete with the best.
                    </motion.p>

                    {/* WhatsApp Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="bg-green-500/5 border border-green-500/20 rounded-3xl p-6 mb-10 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Sparkles size={40} className="text-green-500" />
                        </div>
                        <h3 className="text-white font-bold text-lg md:text-xl mb-2 flex items-center justify-center gap-2">
                            Join the Official Group
                        </h3>
                        <p className="text-gray-400 text-xs md:text-sm mb-6 px-4">
                            Stay updated with real-time announcements, rules, and event schedules.
                        </p>
                        <a
                            href={WHATSAPP_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#22c35e] text-black font-extrabold py-4 rounded-2xl transition-all transform hover:scale-[1.03] shadow-[0_10px_20px_rgba(37,211,102,0.2)]"
                        >
                            <MessageCircle size={24} />
                            JOIN WHATSAPP GROUP
                        </a>
                    </motion.div>

                    {/* Actions */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors py-2 px-4"
                        >
                            <Home size={18} />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Success;
