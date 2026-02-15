import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, variant = 'primary', className, ...props }) => {
    const baseStyles = 'px-4 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-primary text-white hover:bg-blue-700 focus:ring-primary',
        secondary: 'bg-white text-primary border border-primary hover:bg-gray-50 focus:ring-primary',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
        ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-400',
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={twMerge(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
