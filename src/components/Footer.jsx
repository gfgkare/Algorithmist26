import { Github, Twitter, Instagram, Linkedin, Code2, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid md:grid-cols-4 gap-8 mb-12">

                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white" style={{ background: 'var(--primary)' }}>
                                <Code2 size={18} />
                            </div>
                            <span className="font-bold text-lg">ALGORITHMST 26</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                            A Grand Celebration of Algorithms, Logic & Coding Excellence presented by GFG Campus Body KARE.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-gray-200">Event</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#about" className="hover:text-green-400 transition-colors">About</a></li>
                            <li><a href="#roadmap" className="hover:text-green-400 transition-colors">Roadmap</a></li>
                            <li><a href="#highlights" className="hover:text-green-400 transition-colors">Highlights</a></li>
                            <li><a href="#register" className="hover:text-green-400 transition-colors">Register</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-gray-200">Legal & Contact</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-green-400 transition-colors">Code of Conduct</a></li>
                            <li><a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a></li>
                            <li className="flex items-center gap-2"><Mail size={14} /> gfgkare@gmail.com</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-gray-200">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-all hover:-translate-y-1">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 transition-all hover:-translate-y-1">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-black transition-all hover:-translate-y-1">
                                <Github size={20} />
                            </a>
                        </div>
                    </div>

                </div>

                <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} GFG Campus Body KARE. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
