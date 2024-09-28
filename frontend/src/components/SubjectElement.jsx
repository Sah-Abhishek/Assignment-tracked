import React, { useState } from "react";
import useSubjectStore from "../app/subjectStore";
import Modal from "./Modal";
import UnitCard from "./UnitCard";
import UnitComponent from "./UnitComponent";


const SubjectElement = React.memo(({ name, unit, }) => {
    // const buttons = ['Unit1', 'Unit2', 'Unit3', 'Unit', 'Unit5']
    // console.log("This is the units array", unit);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const units = unit;
    // console.log("These are the units from SubjectElement component:", units);
    
    

    return (
        <div className="">
            <div>
                <h2 className="text-4xl font-bold m-10">{name}</h2>
            </div>
            <div className="flex justify-between ">
                {units.map((item) => (
                    // <button onClick={() => setIsModelOpen(!isModalOpen)}>
                        <UnitComponent key={item._id} name={item.name} completed={item.completed} className="p-2 bg-white text-black hover:bg-gray-400 mx-10 px-10 rounded-md font-bold border border-black" />
                    // </button>
                ))}
                <div>
                    
                </div>

            </div>
        </div>
    )
})
export default SubjectElement;