
import { useState } from "react";
import { MdEdit , MdDelete  } from "react-icons/md";
import Overlay from "../overlay/overlay";
import Customcheckbox from "../custom_checkbox/checkboxCust";
import axios from "axios";
export default function Thetasks({allTasks , setAllTasks}:any) {

    const [show,setShow] = useState<Boolean>(false)
    const [selectedIndex,setSelectedIndex] = useState(-1)
    const handleChange = async (id:string) => {

        try {
            const token = localStorage.getItem('authToken')
            if(token) {
                await axios.patch(`/api/tasks/${id}` ,{
                    completed:!allTasks.find((task:any) => task._id === id).completed
                })
                const response = await axios.get("/api/tasks", {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
            
                  setAllTasks(response.data.tasks);
            } else {
                setAllTasks((prev:any) => {
                    const nexData = prev.map((ta:any) => {
                        if (ta._id === id) {
                            return {...ta,completed:!ta.completed}
                        }
                        return ta
                    })
                    return nexData})
            }          
        } catch (error) {
            console.log(error)
        }
    }
    const handleDelete = async(id:string) => {
        try {
            const token = localStorage.getItem('authToken')
            if(token) {
                await axios.delete(`/api/tasks/${id}`)
                const response = await axios.get("/api/tasks",{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                setAllTasks(response.data.tasks)
            } else {
                const newD = allTasks.filter((task:any) => task._id !==id)
                setAllTasks(newD)
            }    
        } catch (error) {
            console.log(error)
        }
        
    }
    return (
        <div className="flex flex-col items-center gap-y-4 w-full">
                {allTasks.map((task:any,index:number) => {
                    const isSelected = selectedIndex === index;
                    return (
                        <div key={index} className="flex justify-between w-[80%] sm:w-[60%] border border-gray-400 rounded-md p-5 bg-white">
                            <div className="flex gap-x-3">
                                <Customcheckbox task={task} changeHandler={() => handleChange(task._id)} bgColor="blue-400"/>
                                <div className={`text-black capitalize ${task.completed && "line-through"}`}>
                                    {task.task.length < 33 ? task.task : task.task.substring(0,33) + "..."}
                                    {show
                                    && isSelected &&
                                    <Overlay task={task} setShow={setShow} allTasks={allTasks} setAllTasks={setAllTasks}/>
                                    }
                                </div>
                            </div>
                            
                            <div className="flex gap-2 text-xl">
                                <MdEdit className=" text-green-600 cursor-pointer hover:opacity-50 transition-all duration-300" onClick={() => {setSelectedIndex(index);setShow(true)}}/>
                                <MdDelete className="text-accent cursor-pointer hover:opacity-50 transition-all duration-300" onClick={() => {
                                    handleDelete(task._id)
                                }}/>
                            </div>
                        </div>
                    )
                })}
            </div>
    )
}