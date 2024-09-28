import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative" onClick={(e) => e.stopPropagation()}>
                <button 
                    onClick={onClose} 
                    className="absolute top-3 right-3 font-extrabold text-3xl text-gray-500 hover:text-gray-800 transition duration-200"
                >
                    &times; {/* Close icon */}
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
