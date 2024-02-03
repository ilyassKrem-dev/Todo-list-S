import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";



export default function Overlay({task , setShow , setAllTasks}:any) {
    const [isChecked, setIsChecked] = useState(false);
    const [taskDesc , setTaskDesc] = useState({
        description:task.desc , completed: task.completed
    })
    console.log(taskDesc)
    function handleChange(e:any) {
        const {name,type,value} = e.target
        setTaskDesc((prev:any) => {
            return (
                {...prev,}
            )
        })
    }
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
      };
    function handleCheckBox() {

    }
    function hadleSave() {
        
    }
    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center">
            <div className="w-[80%] sm:w-[36%] h-[45%] bg-white text-black flex justify-center flex-col rounded-lg border border-blue-400 items-center p-5 gap-y-5 relative">
                <h2 className="font-bold text-2xl text-blue-400 underline ">Task Info</h2>
                <div className="w-full flex flex-col gap-y-3">
                    <h3 className=" self-start ml-10 font-bold text-lg">Task</h3>
                    <div className="w-full flex items-center justify-center">
                        <input type="text" name="description" onChange={handleChange} value={taskDesc.description} className="input w-[80%] border-blue-400 border-2 "/>
                    </div>
                </div>
                
                <div className="flex flex-col items-center justify-center gap-y-2">
                    <h3 className="font-bold text-lg">Compeleted</h3>
                    <div className="relative">
                        <input
                            type="checkbox"
                            id="customCheckbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            className="hidden"
                        />
                        <label
                            htmlFor="customCheckbox"
                            className={`cursor-pointer inline-block w-6 h-6 border border-gray-400 rounded transition duration-300 ${
                            isChecked ? 'bg-green-600 border-green-600' : ''
                            } hover:opacity-60 transition-all duration-300`}
                        >
                            {isChecked&&
                            <div className="absolute top-1 left-1">
                                <FaCheck className="text-white"/>
                            </div>}
                        </label>
                        
                    </div>
                   

                </div>
                
                <button className=" bg-blue-400 text-white p-3 px-10 rounded-lg text-lg hover:opacity-60 transition-all duration-300">Save</button>
                <div className="absolute top-2 right-2 hover:opacity-70 active:opacity-50 transition-all duration-200 cursor-pointer" onClick={() => setShow(false)}>
                    <IoCloseSharp className="text-3xl"/>
                </div>
            </div>
            
           
        </div>
    )
}