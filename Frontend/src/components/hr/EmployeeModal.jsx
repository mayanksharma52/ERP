// src/components/hr/EmployeeModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EmployeeModal = ({ isOpen, onClose, employee, onSubmit }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
                >
                    {/* Modal content */}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default EmployeeModal;