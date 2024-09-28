import React, { useState } from 'react';
import Modal from './Modal';
import UnitCard from './UnitCard';

const UnitComponent = ({ name, }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleButtonClick = () => {
        setIsModalOpen(true); // Open the modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    return (
        <div className="h-10 w-full">
            <button 
                className="p-2 bg-white text-black hover:bg-gray-400 mx-10 px-10 rounded-md font-bold border border-black transition duration-200"
                onClick={handleButtonClick} // Open modal on click
            >
                {name}
            </button>
            
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <UnitCard name={name} onClose={handleCloseModal} /> {/* Pass the name to UnitCard */}
                </Modal>
            )}
        </div>
    );
};

export default UnitComponent;
