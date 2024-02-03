import Logo from "@/assets/Images/logo"
import Inputs from "@/assets/task/inputs"
import { useState } from "react"
import Additinfo from "@/assets/task/tasks/addit-info"
import Thetasks from "@/assets/task/tasks/Thetasks"
import Taskimg from "@/assets/Images/tasksBg"
import Particales from "@/assets/task/particles/particles"
interface Task {
    desc:String,
    completed:Boolean,
    id:String
}
export default function Tasks() {
    const [allTasks,setAllTasks] = useState<Task[]>([])
    return (
        <div className="flex items-center justify-center sm:py-36 py-28 flex-col gap-y-12 h-full">
            <Logo />
            <Taskimg />
            
            <div className="font-semibold text-xl sm:text-2xl">
                <h1>Create Your first <span className="text-blue-400">Todo</span> task</h1>
            </div>
            <Inputs setAllTasks={setAllTasks}/>
            <Additinfo allTasks={allTasks}/>
            <Thetasks allTasks={allTasks}setAllTasks={setAllTasks}/>
            <Particales /> 
        </div>
    )
}