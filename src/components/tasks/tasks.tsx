
import Add_inputs from "@/assets/tasks/display/add_inputs"
import { useEffect, useState } from "react"
import Additinfo from "@/assets/tasks/Addition/addit-info"
import Thetasks from "@/assets/tasks/display/Thetasks"
import axios from "axios"
import Totop from "@/assets/tasks/Addition/Totop"
import Logo_bg from "@/assets/tasks/logo_bg/logo_bg"

interface Task {
    desc:String,
    completed:Boolean,
    id:String
}
export default function Tasks() {
    const [allTasks,setAllTasks] = useState<Task[]>([])
    const isLocalStorageAvailable = typeof localStorage !== 'undefined';
    
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const isLoggedIn = !!token;
            if (isLoggedIn) {
                const response = await axios.get("/api/tasks", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response) {
                    setAllTasks(response.data.tasks)
                
                } else {
                    console.log("Error fetching")

                }
            } else if (isLocalStorageAvailable) {
                const saved = localStorage.getItem('allTasks')
                const initial = saved?JSON.parse(saved):[]
                setAllTasks(initial)
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const isLoggedIn = !!token;
        if(!isLoggedIn) {
            localStorage.setItem('allTasks',JSON.stringify(allTasks))
        }
      }, [allTasks, isLocalStorageAvailable]);
    return (
        <div className="flex items-center justify-center sm:py-36 py-28 flex-col gap-y-12 h-full">
            <Logo_bg />
            <Add_inputs setAllTasks={setAllTasks}/>
            <Additinfo allTasks={allTasks}/>
            <Thetasks allTasks={allTasks}setAllTasks={setAllTasks}/>
            <Totop /> 
        </div>
    )
}