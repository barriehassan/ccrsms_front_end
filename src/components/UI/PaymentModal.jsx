import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import StripeProvider from '../Payment/StripeProvider';
import CheckoutForm from '../Payment/CheckoutForm';

const PaymentModal = ({ isOpen, onClose, serviceName, amount, onSuccess }) => {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-colors"
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-dark-card w-full max-w-md rounded-2xl shadow-2xl overflow-hidden dark:border dark:border-gray-700 relative"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-dark-bg/50">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Secure Payment</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Complete your transaction via Stripe</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6">
                                <StripeProvider>
                                    <CheckoutForm
                                        amount={amount}
                                        serviceName={serviceName}
                                        onSuccess={onSuccess}
                                        onCancel={onClose}
                                    />
                                </StripeProvider>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default PaymentModal;
