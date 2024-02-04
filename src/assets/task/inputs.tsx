
import { nanoid } from "nanoid"
import { useState } from "react"
import axios from "axios"
export default function Inputs({setAllTasks}:any) {
    const [task,setTask] = useState<string>("")
    function handleChange(e:any) {
        setTask(e.target.value)
    }
    const handleClick = async () => {
        try {
            const currentDate = new Date().toLocaleDateString('en-GB');
            const token = localStorage.getItem('authToken')
            if(token) {
                await axios.post("/api/tasks",{
                    task:task,
                    date:currentDate,
                } , {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const response = await axios.get("/api/tasks", {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
            
                  setAllTasks(response.data.tasks);
                  setTask("")
            } else {
                const taskAdd  = {task:task,completed:false,id:nanoid()}
                task && setAllTasks((prev:any) => [taskAdd,...prev])
                setTask("")
            }
        } catch (error) {
            console.log(error)
        }
        
        
    }
    
    
    return (
        <>
            <div className="w-full flex flex-col gap-y-6 justify-center items-center sm:flex-row gap-4">
                <input type="text" value={task}   name="task"
                className="input w-[80%] border-blue-400 border-2 sm:w-[50%]" placeholder="Task" onChange={handleChange} autoComplete="off"/>
                <button className=" bg-blue-400 text-white p-3 px-12 rounded-xl font-bold text-lg hover:opacity-60 hover:text-blue-800 transition-all duration-300 sm:py-2
                " onClick={handleClick}>Add</button>
            </div>
        </>
    )
}