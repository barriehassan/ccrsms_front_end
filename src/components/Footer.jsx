import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-16 pb-8 ">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-6 mb-12 pl-12">
                    <div>
                        <h3 className="text-2xl font-bold text-accent mb-4">CCRSMS</h3>
                        <p className="text-gray-400">
                            Empowering citizens to build a better community through efficient reporting and service management.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/FreetownCityCouncil" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors"><FaFacebook /></a>
                            <a href="https://x.com/FCC_Freetown" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors"><FaTwitter /></a>
                            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors"><FaInstagram /></a>
                            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors"><FaLinkedin /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Council Complaint Reporting & Service Management System. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
