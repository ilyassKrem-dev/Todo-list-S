import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Customcheckbox from "@/assets/custumCheckbox/checkboxCust";
import axios from "axios";

export default function Overlay({task , setShow , setAllTasks,allTasks}:any) {
    const [taskDesc, setTaskDesc] = useState({
        description: task.task,
        completed: task.completed,
        id:task._id
      });
    function handleChange(e:any) {
        e.stopPropagation();
        const {name,type,value , checked} = e.target
        setTaskDesc((prev:any) => {
            return (
                {...prev,[name]:type === "checkbox" ? checked : value}
            )
        })
    }
    useEffect(() => {
        function handleOutsideClick(event: any) {
          const overlay = document.querySelector(".background");
          if (overlay && !overlay.contains(event.target)) {
            
            setShow(false);
          }
        }
    
        document.body.addEventListener("click", handleOutsideClick);
    
        return () => {
          document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    async function handleSave(id:string) {
        try {
            const token = localStorage.getItem('authToken')
            if(token) {
                await axios.patch(`/api/tasks/${id}`,{
                    taskName:taskDesc.description,
                    completed:taskDesc.completed
                })
                const response = await axios.get('/api/tasks',{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                setAllTasks(response.data.tasks)
            } else {
                setAllTasks((prev:any) => {
                    const editTask = prev.map((ta:any) => {
                        if(ta._id === id) {
                            return {...ta,task:taskDesc.description,completed:taskDesc.completed}
                        } else {
                            return ta
                        }
                    })
                    return editTask
                })
            }
        } catch (error) {
            console.log(error)
        }
        
    }
    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center z-40">
            <div className="w-[80%] sm:w-[36%] h-[60%] sm:h-[55%] bg-white text-black flex justify-center flex-col rounded-lg border border-blue-400 items-center p-5 gap-y-5 relative px-8 background">
                <h2 className="font-bold text-2xl text-blue-400 underline ">Task Info</h2>
                <div className="w-full flex flex-col gap-y-3">
                    <h3 className=" self-start  font-bold text-lg">Task</h3>
                    <div className="w-full flex items-center justify-center">
                        <input type="text" name="description" onChange={handleChange} autoComplete="off" value={taskDesc.description} className="input w-full border-blue-400 border-2 "/>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-y-2">
                    <h3 className="font-bold text-lg">Compeleted</h3>
                    <Customcheckbox task={taskDesc} changeHandler={handleChange} bgColor="green-600"/>
                </div>
                <button className=" bg-blue-400 text-white p-3 px-10 rounded-lg text-lg hover:opacity-60 transition-all duration-300" onClick={(e) => {
                    handleSave(task._id);
                    setShow(false)
                }}>Save</button>
                <div className="absolute top-2 right-2 hover:opacity-70 active:opacity-50 transition-all duration-200 cursor-pointer" onClick={() => setShow(false)}>
                    <IoCloseSharp className="text-3xl"/>
                </div>
            </div>
            
           
        </div>
    )
}