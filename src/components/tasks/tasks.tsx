import Logo from "@/assets/tasks/logo"
import Inputs from "@/assets/tasks/inputs"
import { useState } from "react"
import Additinfo from "@/assets/tasks/addit-info"
import Thetasks from "@/assets/tasks/Thetasks"

interface Task {
    desc:String,
    completed:Boolean,
    id:String
}
export default function Tasks() {
    const [allTasks,setAllTasks] = useState<Task[]>([])
    return (
        <div className="flex items-center justify-center sm:py-36 py-28 flex-col gap-y-12">
            <Logo />
            <div className="font-semibold text-xl sm:text-2xl">
                <h1>Create Your first <span className="text-blue-400">Todo</span> task</h1>
            </div>
            <Inputs setAllTasks={setAllTasks}/>
            <Additinfo />
            <Thetasks allTasks={allTasks}setAllTasks={setAllTasks}/>
            
            
        </div>
    )
}