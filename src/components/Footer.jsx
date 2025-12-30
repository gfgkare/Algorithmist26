import { Github, Twitter, Instagram, Linkedin, Code2, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden p-1">
                                <img src="/gfg_logo.jpeg" alt="GFG" className="w-full h-full object-contain" />
                            </div>
                            <span className="font-bold text-lg">ALGORITHMST 26</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                            A Grand Celebration of Algorithms, Logic & Coding Excellence presented by GFG Campus Body KARE.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-gray-200">Student Coordinators</h4>
                        <ul className="space-y-2 text-sm text-gray-400 mb-6">
                            <li className="flex justify-between max-w-xs"><span>Rakshan Ananth</span> <span>+91 90035 13022</span></li>
                            <li className="flex justify-between max-w-xs"><span>Anirudh NC</span> <span>+91 99660 66070</span></li>
                            <li className="flex justify-between max-w-xs"><span>Shruthi M</span> <span>+91 88708 67242</span></li>
                            <li className="flex justify-between max-w-xs"><span>Venunadh P</span> <span>+91 91826 46772</span></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-gray-200">Faculty Coordinators</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>Mr. R. Rajasekar - Assistant Professor/CSE</li>
                            <li>Ms. S. Reshni - Assistant Professor/CSE</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-gray-200">Connect</h4>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/gfg_campus_body_kare/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-all hover:-translate-y-1">
                                <Instagram size={20} />
                            </a>
                            <a href="https://www.linkedin.com/company/gfg-kare-student-chapter/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 transition-all hover:-translate-y-1">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://github.com/gfgkare" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-black transition-all hover:-translate-y-1">
                                <Github size={20} />
                            </a>
                            <a href="mailto:gfgkare@gmail.com" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-500 transition-all hover:-translate-y-1">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-gray-200">Legal & Contact</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-green-400 transition-colors">Code of Conduct</a></li>
                            <li><a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a></li>
                        </ul>
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
