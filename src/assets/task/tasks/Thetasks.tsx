
import { useState } from "react";
import { MdEdit , MdDelete  } from "react-icons/md";
import Overlay from "./overlay/overlay";
import Customcheckbox from "../../custumCheckbox/checkboxCust";
export default function Thetasks({allTasks , setAllTasks}:any) {

    const [show,setShow] = useState<Boolean>(false)
    const [selectedIndex,setSelectedIndex] = useState(-1)

    const handleChange = (id:string) => {

        setAllTasks((prev:any) => {
            const nexData = prev.map((ta:any) => {
                if (ta.id === id) {
                    return {...ta,completed:!ta.completed}
                }
                return ta
            })
            return nexData
        })
    }
    function handleDelete(id:string) {
        const newD = allTasks.filter((task:any) => task.id !==id)
        setAllTasks(newD)
    }
    return (
        <div className="flex flex-col items-center gap-y-4 w-full">
                {allTasks.map((task:any,index:number) => {
                    const isSelected = selectedIndex === index;
                    return (
                        <div key={index} className="flex justify-between w-[80%] sm:w-[60%] border border-gray-400 rounded-md p-5 bg-white">
                            <div className="flex gap-x-3">
                                <Customcheckbox task={task} changeHandler={() => handleChange(task.id)} bgColor="blue-400"/>
                                <div className={`text-black capitalize ${task.completed && "line-through"}`}>
                                    {task.desc.length < 33 ? task.desc : task.desc.substring(0,33) + "..."}
                                    {show
                                    && isSelected &&
                                    <Overlay task={task} setShow={setShow} allTasks={allTasks} setAllTasks={setAllTasks}/>
                                    }
                                </div>
                            </div>
                            
                            <div className="flex gap-2 text-xl">
                                <MdEdit className=" text-green-600 cursor-pointer" onClick={() => {setSelectedIndex(index);setShow(true)}}/>
                                <MdDelete className="text-accent cursor-pointer" onClick={() => {
                                    handleDelete(task.id)
                                }}/>
                            </div>
                        </div>
                    )
                })}
            </div>
    )
}