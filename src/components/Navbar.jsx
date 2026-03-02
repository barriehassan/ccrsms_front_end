import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import Button from './UI/Button';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    // Handle scroll effect for glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHome = location.pathname === '/';

    // Standard Glass Logic: Light Mode -> Glass, Dark Mode -> Dark Glass
    const navBackground = isScrolled
        ? (theme === 'light' ? 'glass' : 'glass-dark')
        : (isHome ? 'bg-transparent' : 'bg-white/80 dark:bg-dark-card/80 backdrop-blur-md');

    // Text Color Logic
    const textColor = isScrolled
        ? (theme === 'light' ? 'text-gray-900' : 'text-white')
        : (isHome ? 'text-white' : 'text-gray-900 dark:text-gray-200');

    const hoverColor = isScrolled
        ? (theme === 'light' ? 'hover:text-primary' : 'hover:text-blue-300')
        : (isHome ? 'hover:text-blue-200' : 'hover:text-primary dark:hover:text-accent');

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${navBackground}`}>
            <div className="container mx-auto px-4 py-3 flex justify-between items-center" >
                <Link to="/" className={`text-2xl font-bold flex items-center gap-2 ${textColor}`} style={{
                    paddingLeft: 50
                }}>
                    <span className={`p-1 rounded-lg ${isHome && !isScrolled ? 'bg-white/20' : 'bg-primary text-white'}`}>CC</span>
                    CCRSMS
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8" style={{
                    paddingRight: 50
                }}>
                    <Link to="/" className={`${textColor} ${hoverColor} font-medium transition-colors`}>Home</Link>
                    <Link to="/about" className={`${textColor} ${hoverColor} font-medium transition-colors`}>About</Link>
                    <Link to="/services" className={`${textColor} ${hoverColor} font-medium transition-colors`}>Services</Link>
                    <Link to="/wards" className={`${textColor} ${hoverColor} font-medium transition-colors`}>Wards</Link>
                    <Link to="/contact" className={`${textColor} ${hoverColor} font-medium transition-colors`}>Contact</Link>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition-colors ${isHome && !isScrolled ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                        aria-label="Toggle Theme"
                    >
                        {theme === 'light' ? <FaMoon /> : <FaSun />}
                    </button>

                    <Link to="/auth/login">
                        <Button variant="primary" className="px-6 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">Login</Button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full ${isHome && !isScrolled ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-yellow-300'}`}
                    >
                        {theme === 'light' ? <FaMoon /> : <FaSun />}
                    </button>
                    <button className={`${textColor} focus:outline-none`} onClick={toggleMenu}>
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-dark-card border-t border-gray-100 dark:border-gray-700 overflow-hidden shadow-xl"
                    >
                        <div className="flex flex-col p-4 space-y-4">
                            <Link to="/" className="text-gray-900 dark:text-gray-200 hover:text-primary font-medium" onClick={toggleMenu}>Home</Link>
                            <Link to="/about" className="text-gray-900 dark:text-gray-200 hover:text-primary font-medium" onClick={toggleMenu}>About</Link>
                            <Link to="/services" className="text-gray-900 dark:text-gray-200 hover:text-primary font-medium" onClick={toggleMenu}>Services</Link>
                            <Link to="/contact" className="text-gray-900 dark:text-gray-200 hover:text-primary font-medium" onClick={toggleMenu}>Contact</Link>
                            <Link to="/auth/login" onClick={toggleMenu}>
                                <Button variant="primary" className="w-full">Login</Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
