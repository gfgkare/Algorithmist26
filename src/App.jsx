import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Critical UI components (Load immediately)
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DynamicBackground from './components/DynamicBackground';
import CustomCursor from './components/CustomCursor';
import IntroAnimation from './components/IntroAnimation';

// Lazy-loaded components (Load on demand to handle high traffic/reduce bundle size)
const About = lazy(() => import('./components/About'));
const Roadmap = lazy(() => import('./components/Roadmap'));
const WhyParticipate = lazy(() => import('./components/WhyParticipate'));
const Highlights = lazy(() => import('./components/Highlights'));
const Footer = lazy(() => import('./components/Footer'));
const RuleBook = lazy(() => import('./components/RuleBook'));
const Registration = lazy(() => import('./components/Registration'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const Success = lazy(() => import('./components/Success'));

// Simple Loader for Suspense
const PageLoader = () => (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
);

function App() {
    const [introFinished, setIntroFinished] = useState(() => {
        return window.location.pathname.includes('/gfgkare-a4u');
    });

    return (
        <Router>
            <AnimatePresence>
                {!introFinished && (
                    <IntroAnimation onComplete={() => setIntroFinished(true)} />
                )}
            </AnimatePresence>

            <div className="antialiased text-gray-200 relative min-h-screen">
                <CustomCursor />
                <DynamicBackground />

                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        <Route path="/" element={
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
                        } />

                        <Route path="/regclosed" element={
                            <div className="relative z-10">
                                <Registration />
                            </div>
                        } />

                        <Route path="/gfgkare-a4u" element={
                            <div className="relative z-10">
                                <AdminPanel />
                            </div>
                        } />

                        <Route path="/success" element={
                            <div className="relative z-10">
                                <Success />
                            </div>
                        } />
                    </Routes>
                </Suspense>
            </div>
        </Router>
    )
}

export default App;
