import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

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
        { title: 'Rules', href: '#rulebook' },
    ];

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setIsOpen(false);

        if (href.startsWith('#')) {
            setTimeout(() => {
                const elementId = href.replace('#', '');
                const element = document.getElementById(elementId);

                if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }, 300);
        }
    };

    const handleRegisterClick = (e) => {
        e.preventDefault();
        setIsOpen(false);
        // navigate('/register');
    };

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
                <a href="#" className="flex items-center gap-3 group" onClick={(e) => handleNavClick(e, '#hero')}>
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden p-1 shadow-lg shadow-green-500/20">
                        <img src="/gfg.jpeg" alt="GFG" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-xl leading-normal tracking-normal text-white">ALGORITHMST <span className="text-green-500">26</span></span>
                        <span className="text-xs font-medium text-green-600" style={{ color: 'var(--primary)' }}>KARE</span>
                    </div>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.title}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-gray-300 hover:text-green-400 font-medium text-sm transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-green-500 after:transition-all hover:after:w-full"
                            style={{ color: 'var(--text-main)' }}
                        >
                            {link.title}
                        </a>
                    ))}
                    <button
                        onClick={handleRegisterClick}
                        className="px-6 py-2.5 rounded-full font-semibold text-white shadow-lg transition-all text-sm hover:shadow-green-500/30 hover:-translate-y-0.5"
                        style={{ background: '#6b7280', color: 'white' }}
                    >
                        Register Now
                    </button>
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
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="text-base font-medium text-gray-200 py-1.5 border-b border-gray-800"
                                >
                                    {link.title}
                                </a>
                            ))}
                            <button
                                className="w-full text-center py-2.5 rounded-xl font-bold text-white mt-2 text-sm"
                                style={{ background: '#6b7280' }}
                                onClick={handleRegisterClick}
                            >
                                Register Now
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
