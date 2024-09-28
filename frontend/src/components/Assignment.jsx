import { useEffect } from "react";
import useSubjectStore from "../app/subjectStore";
import Navbar from "./Navbar";
import SubjectElement from "./SubjectElement";
import { useShallow } from 'zustand/react/shallow'
import { useNavigate } from 'react-router-dom';

const Assignment = () => {
    // const suubjects = [
    //     'Database Management System',
    //     'Design and Analysis of Algorithm',
    //     'Internet of Things',
    //     'Programming in Microcontrollers',
    //     'Essence of Indian Ethics and knowledge'
    // ]
    const token = localStorage.getItem('jwtToken');
    console.log(token);
    const navigate = useNavigate();
    const { subjects, removeSubject, toggleSubjectStatus , fetchSubjects, error } = useSubjectStore(
        useShallow((state) => ({
            subjects: state.subjects,
            removeSubject: state.removeSubject,
            toggleSubjectStatus: state.toggleSubjectStatus,
            fetchSubjects: state.fetchSubjects,
            error: state.error
        }))
        
    );
    console.log("This is from the assignment component", subjects);
    useEffect(() => {
        console.log("Fetched subjects:", subjects); // Log subjects after fetching
        if (error) {
            console.error("Error fetching subjects:", error);
        }
    }, [subjects, error]);


    useEffect(() => {
        if(!localStorage.getItem('jwtToken')){
            console.log("Authtoken not provided or token not found in local storage");
            navigate('/login');
            return;
        }
        fetchSubjects(token);

        // console.log("These are the subjects from the Assignment Component", subjects);
        console.log(error);
    },[])
    
    return (
        <div className="">
            <Navbar/>
            <div className='flex flex-col justify-center items-center pt-15'>
                {subjects.map((subjects, index) => (
                    <SubjectElement name={subjects.title} key={subjects._id} unit={subjects.units} className=""/>
                    
                ))}
            </div>
        </div>
    )
}

export default Assignment;