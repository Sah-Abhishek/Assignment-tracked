import { User, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import useSubjectStore from '../app/subjectStore.js';
import { CirclePlus } from 'lucide-react';

const Navbar = () => {
    const [isInputVisible, setIsInputVisible] = useState(false);
    const inputRef = useRef(null);
    
    const getToken = () => {
        return localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
    }
    const token = getToken();
    const handleLogout = () => {
        // Add logout functionality here
        console.log('Logout clicked');
    };

    const addSubject = useSubjectStore((state) => state.addSubject);
    const sendData = useSubjectStore((state) => state.sendData);
    const [subjectTitle, setSubjectTitle] = useState("");
    // console.log("SubjectForm Rendered");

    const handleSubjectSubmit = () => {
        const subjectId = Math.ceil(Math.random() * 1000000);
        if (!subjectTitle) return alert("Please add subject Title");
        sendData({subject: subjectTitle, subjectId: subjectId}, token);
        // console.log("Again Token from Navbar", token);
        // console.log("token: ", token);
        addSubject({
            id: subjectId,
            title: subjectTitle
        })
        setSubjectTitle("");
    }

    useEffect(() => {
        if (isInputVisible && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isInputVisible]);

    return (
        <nav className="bg-gray-900 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <span className="text-white text-2xl font-semibold">Assignment Tracker</span>
                </div>
                <div >

                    {isInputVisible ?
                        (
                            <div className='flex border border-white bg-white rounded-xl'>
                                <input 
                                onKeyDown={(e) => {
                                    if(e.key === 'Enter'){
                                        setIsInputVisible(!isInputVisible)
                                        handleSubjectSubmit();
                                    }
                                }}
                                value={subjectTitle} onChange={(e) => {
                                    setSubjectTitle(e.target.value)
                                }
                                } ref={inputRef} type="text" className='bg-white px-20 py-2 font-extrabold rounded-xl flex' placeholder='Subject Name' />
                                <button
                                
                                 onClick={() => {
                                    handleSubjectSubmit();
                                }} className='text-gray-500 text-2xl font-semibold px-2'><CirclePlus onClick={() => setIsInputVisible(!isInputVisible)} strokeWidth={3} /></button>
                            </div>
                        )

                        :
                        (
                            <button className='bg-white pr-20 pl-12 py-2 font-extrabold rounded-xl flex' onClick={() => setIsInputVisible(true)}>
                                <Plus className='mx-4 text-black' strokeWidth={3} />

                                Add new Subject
                            </button>
                        )
                    }


                </div>

                <div className="flex">
                    <User className="text-white mt-2 mr-5" />
                    <button
                        onClick={handleLogout}
                        className="bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;