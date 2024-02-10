import Logo from "@/assets/bg_related/logo"
import Animatedbg from "@/assets/tasks/Addition/Animatedbg"
import Taskimg from "@/assets/bg_related/tasksBg"
export default function Logo_bg() {


    return (
        <>
            <Logo />
            <div className="font-semibold text-xl sm:text-2xl">
                <h1>Create Your first <span className="text-blue-400">Todo</span> task</h1>
            </div>
            <Taskimg />
            <Animatedbg /> 
        </>
    )
}