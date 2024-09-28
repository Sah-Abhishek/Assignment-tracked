import React from 'react';


import useSubjectStore from '../app/subjectStore.js'

const UnitCard = ({ name, onClose }) => {
    return (
        <div className='flex flex-col items-center'>
            <h2 className="text-xl font-extrabold mb-2">{name}</h2>
            <div className=''>
                <div className="flex items-center justify-between">
                    <p className="text-gray-700 mr-2">Assigned Date:</p>
                    <input
                        type="date"
                        className="border border-gray-300 rounded-md p-1"
                    />
                </div>
                <div className="flex items-center mt-4 justify-between">
                    <p className="text-gray-700 mr-2">Due Date:</p>
                    <input
                        type="date"
                        className="border border-gray-300 rounded-md p-1"
                    />
                </div>
                <div className='flex items-center justify-center m-4'>
                <div className="flex items-center">
                    <input 
                        type="checkbox" 
                        id="completed" 
                        className="mr-2"
                    />
                    <label htmlFor="completed" className="text-gray-700">Completed</label>
                </div>
                </div>
                <div onClick={onClose} className='border bg-gray-800 rounded-lg p-3 flex justify-center hover:bg-gray-700 text-white'>
                    <button type='submit'>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default UnitCard;
