import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={twMerge('bg-white rounded-xl shadow-sm border border-gray-100 p-6', className)}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
