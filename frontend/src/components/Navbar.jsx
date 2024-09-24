import { User, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';



const Navbar = () => {
    const [isInputVisible, setIsInputVisible] = useState(false);
    const inputRef = useRef(null);
    const buttonRef = useRef(null);

    const handleLogout = () => {
        // Add logout functionality here
        console.log('Logout clicked');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isInputVisible &&
                inputRef.current &&
                !inputRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsInputVisible(false);
            }
        };

        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Clean up event listener
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isInputVisible]);

    useEffect(() => {
        if (isInputVisible && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isInputVisible]);

    return (
        <nav className="bg-gray-900 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    {/* <img
            src="/api/placeholder/50/50"
            alt="Logo"
            className="h-8 w-8 mr-2"
          /> */}
                    <span className="text-white text-2xl font-semibold">Assignment Tracker</span>
                </div>
                <div >
                    
                    {isInputVisible ?
                        <input ref={inputRef} type="text" className='bg-white px-20 py-2 font-extrabold rounded-xl flex' placeholder='Subject Name' />
                        :
                        (
                            <button ref={buttonRef} className='bg-white pr-20 pl-12 py-2 font-extrabold rounded-xl flex' onClick={() => setIsInputVisible(true)}>
                                <Plus className='mx-4 text-black font-extrabold' />

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