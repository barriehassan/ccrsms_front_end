import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import Button from './UI/Button';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center" >
                <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2" style={{
                    paddingLeft: 50
                }}>
                    <span className="bg-primary text-white p-1 rounded-lg">FCC</span>
                    CCRSMS
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8" style={{
                    paddingRight: 50
                }}>
                    <Link to="/" className="text-gray-600 hover:text-primary font-medium transition-colors">Home</Link>
                    <Link to="/about" className="text-gray-600 hover:text-primary font-medium transition-colors">About</Link>
                    <Link to="/services" className="text-gray-600 hover:text-primary font-medium transition-colors">Services</Link>
                    <Link to="/wards" className="text-gray-600 hover:text-primary font-medium transition-colors">Wards</Link>
                    <Link to="/contact" className="text-gray-600 hover:text-primary font-medium transition-colors">Contact</Link>
                    <Link to="/auth/login">
                        <Button variant="primary" className="px-6">Login</Button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-600 focus:outline-none" onClick={toggleMenu}>
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="flex flex-col p-4 space-y-4">
                            <Link to="/" className="text-gray-600 hover:text-primary font-medium" onClick={toggleMenu}>Home</Link>
                            <Link to="/about" className="text-gray-600 hover:text-primary font-medium" onClick={toggleMenu}>About</Link>
                            <Link to="/services" className="text-gray-600 hover:text-primary font-medium" onClick={toggleMenu}>Services</Link>
                            <Link to="/wards" className="text-gray-600 hover:text-primary font-medium" onClick={toggleMenu}>Wards</Link>
                            <Link to="/contact" className="text-gray-600 hover:text-primary font-medium" onClick={toggleMenu}>Contact</Link>
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
