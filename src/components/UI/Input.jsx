import React from 'react';
import clsx from 'clsx';

const Input = ({ label, error, className, ...props }) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
            <input
                className={clsx(
                    'px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
                    error
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:border-primary focus:ring-blue-100',
                    className
                )}
                {...props}
            />
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
};

export default Input;
