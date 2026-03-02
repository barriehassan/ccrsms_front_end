import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppWidget = () => {
    const phoneNumber = '23231107795'; // Council WhatsApp number
    const message = encodeURIComponent("Hello Freetown City Council, I need assistance with a municipal issue.");
    const waLink = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed bottom-8 right-8 z-[9999]"
        >
            <div className="relative group">
                {/* Pulsing background effect */}
                <div className="absolute -inset-2 bg-green-500 rounded-full opacity-20 animate-ping group-hover:opacity-40 transition-opacity"></div>

                {/* Tooltip */}
                <div className="absolute bottom-full right-0 mb-4 px-4 py-2 bg-white text-gray-800 text-sm font-bold rounded-xl shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all whitespace-nowrap pointer-events-none border border-gray-100 italic">
                    Need Help? Chat with Us!
                </div>

                {/* Main Button */}
                <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full shadow-2xl hover:bg-green-600 transition-colors transform hover:scale-110 active:scale-95 shadow-green-500/40"
                    aria-label="Chat on WhatsApp"
                >
                    <FaWhatsapp className="text-3xl" />
                </a>
            </div>
        </motion.div>
    );
};

export default WhatsAppWidget;
