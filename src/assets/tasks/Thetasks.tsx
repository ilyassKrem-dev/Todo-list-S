
import { useState } from "react";
import { MdEdit , MdDelete  } from "react-icons/md";
import Overlay from "./overlay/overlay";
export default function Thetasks({allTasks , setAllTasks}:any) {

    const [show,setShow] = useState<Boolean>(false)

    return (
        <div className="flex flex-col items-center gap-y-4 w-full">
                {allTasks.map((task:any,index:number) => {
                    return (
                        <div key={index} className="flex justify-between w-[80%] sm:w-[60%] border border-gray-400 rounded-md p-5">
                            <div className={`text-black capitalize ${task.completed && "line-through"}`}>
                                {task.desc.length < 33 ? task.desc : task.desc.substring(0,33) + "..."}
                                {show
                                &&
                                <Overlay task={task} setShow={setShow} setAllTasks={setAllTasks}/>
                                }
                            </div>
                            <div className="flex gap-2 text-xl">
                                <MdEdit className=" text-green-600 cursor-pointer" onClick={() => setShow(true)}/>
                                <MdDelete className="text-accent cursor-pointer"/>
                            </div>
                        </div>
                    )
                })}
            </div>
    )
}