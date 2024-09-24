import useSubjectStore from "../app/subjectStore";
import Navbar from "./Navbar";
import SubjectElement from "./SubjectElement";
import { useShallow } from 'zustand/react/shallow'

const Assignment = () => {
    const suubjects = [
        'Database Management System',
        'Design and Analysis of Algorithm',
        'Internet of Things',
        'Programming in Microcontrollers',
        'Essence of Indian Ethics and knowledge'
    ]
    // console.log("loda");
    const { subjects, removeSubject, toggleSubjectStatus } = useSubjectStore(
        useShallow((state) => ({
            subjects: state.subjects,
            removeSubject: state.removeSubject,
            toggleSubjectStatus: state.toggleSubjectStatus
        }))
        
    );
    return (
        <div className="">
            <Navbar/>
            <div className='flex flex-col justify-center items-center pt-15'>
                {subjects.map((subjects, index) => (
                    <SubjectElement name={subjects.title} key={index}/>
                ))}
            </div>
        </div>
    )
}

export default Assignment;