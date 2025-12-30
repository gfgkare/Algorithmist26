import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { title: 'Home', href: '#hero' },
        { title: 'About', href: '#about' },
        { title: 'Roadmap', href: '#roadmap' },
        { title: 'Why Join', href: '#why-participate' },
        { title: 'Highlights', href: '#highlights' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-black/80 backdrop-blur-md shadow-sm py-3'
                : 'bg-transparent py-5'
                }`}
            style={{
                backgroundColor: scrolled ? 'rgba(5, 5, 5, 0.8)' : 'transparent',
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
                boxShadow: scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)' : 'none',
                padding: scrolled ? '12px 0' : '20px 0'
            }}
        >
            <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
                <a href="#" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform"
                        style={{ background: 'linear-gradient(135deg, var(--primary), var(--dark-green))', color: 'white' }}>
                        <Code2 size={24} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-xl leading-normal tracking-normal text-white">ALGORITHMST 26</span>
                        <span className="text-xs font-medium text-green-600" style={{ color: 'var(--primary)' }}>KARE</span>
                    </div>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.title}
                            href={link.href}
                            className="text-gray-300 hover:text-green-400 font-medium text-sm transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-green-500 after:transition-all hover:after:w-full"
                            style={{ color: 'var(--text-main)' }}
                        >
                            {link.title}
                        </a>
                    ))}
                    <a
                        href="#register"
                        className="px-6 py-2.5 rounded-full font-semibold text-white shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5 transition-all text-sm"
                        style={{ background: 'var(--primary)', color: 'white' }}
                    >
                        Register Now
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-gray-200"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/95 border-t border-gray-800 overflow-hidden"
                        style={{ background: '#111' }}
                    >
                        <div className="flex flex-col px-6 py-6 gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.title}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium text-gray-200 py-2 border-b border-gray-800"
                                >
                                    {link.title}
                                </a>
                            ))}
                            <a
                                href="#register"
                                className="w-full text-center py-3 rounded-xl font-bold text-white mt-2"
                                style={{ background: 'var(--primary)' }}
                            >
                                Register Now
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
