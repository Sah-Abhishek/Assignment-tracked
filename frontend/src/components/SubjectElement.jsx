import useSubjectStore  from "../app/subjectStore";

const SubjectElement = ({ name }) => {
    const buttons = ['Unit1', 'Unit2', 'Unit3', 'Unit', 'Unit5']
    
    return (
        <div className="">
            <div>
                <h2 className="text-4xl font-bold m-10">{name}</h2>
            </div>
            <div className="flex justify-between">
                {buttons.map((button, index) => (
                    <button key={index} className="p-2 bg-white text-black hover:bg-gray-400 mx-10 px-10 rounded-md font-bold border border-black">
                    {button} 
                    </button>
                ))}

            </div>
        </div>
    )
}
export default SubjectElement;