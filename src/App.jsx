import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Roadmap from './components/Roadmap';
import WhyParticipate from './components/WhyParticipate';
import Highlights from './components/Highlights';
import Footer from './components/Footer';
import RuleBook from './components/RuleBook';
import IntroAnimation from './components/IntroAnimation';
import DynamicBackground from './components/DynamicBackground';
import CustomCursor from './components/CustomCursor';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
    const [introFinished, setIntroFinished] = useState(false);

    return (
        <>
            <AnimatePresence>
                {!introFinished && (
                    <IntroAnimation onComplete={() => setIntroFinished(true)} />
                )}
            </AnimatePresence>

            <div className="antialiased text-gray-200 relative">
                <CustomCursor />
                <DynamicBackground />
                <div className="relative z-10">
                    <Navbar />
                    <main>
                        <Hero />
                        <About />
                        <Roadmap />
                        <WhyParticipate />
                        <Highlights />
                        <RuleBook />
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default App;
