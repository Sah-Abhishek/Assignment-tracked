import Navbar from "./Navbar";
import SubjectElement from "./SubjectElement";

const Assignment = () => {
    const subjects = [
        'Database Management System',
        'Design and Analysis of Algorithm',
        'Internet of Things',
        'Programming in Microcontrollers',
        'Essence of Indian Ethics and knowledge'
    ]
    return (
        <div className="">
            <Navbar/>
            <div className='flex flex-col justify-center items-center pt-15'>
                {subjects.map((subject, index) => (
                    <SubjectElement name={subject} key={index}/>
                ))}
            </div>
        </div>
    )
}

export default Assignment;