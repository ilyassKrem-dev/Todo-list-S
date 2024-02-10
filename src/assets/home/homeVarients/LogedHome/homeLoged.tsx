import {motion} from "framer-motion"
import Link from "next/link"
import { fadeIn } from "@/varients/variants"
const activity = [{
    title:"Go to tasks",
    info:"Tasks",
    path:"/tasks",
    animate:"up",
    time:0.1
},{
    title:"Go to Account",
    info:"Account",
    path:"/account",
    animate:"down",
    time:0.2
},{
    title:"Sign out",
    info:"Sign out",
    path:"/",
    animate:"up",
    time:0.3
}]
export default function Homelogedin(props:any) {

    const handleClick = (path:any) => {
        if(path === "/") {
            localStorage.removeItem('authToken');
            window.location.href = path;
        }
    }
    return (
        <div className="flex flex-col mt-16">
            <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{ duration: 0.5,ease:"easeInOut" }}
            className="flex items-center gap-x-4 flex-wrap gap-y-2  justify-center">
                <h1 
                className="h1 max-[300px]:w-[14rem] text-center">
                    Welcome 
                </h1>
                <h1 className="h1 text-blue-400 capitalize">
                        {props.user}
                </h1>
                <motion.div
                        animate={{ rotate: [0, 15, 0] }}
                        transition={{ duration: 1, repeat: 5,delay:0.5 }}
                        className="sm:text-5xl font-bold text-4xl"
                        style={{ display: 'inline-block' }}
                        
                    >
                        👋
                </motion.div>
            </motion.div>
                
                <div className="flex flex-col items-center justify-center text-center gap-y-6 mt-16 sm:flex-row sm:gap-x-8 xl:gap-x-12">
                    {activity.map((active:any,index:any) => {
                        return (
                            <div key={index} className="flex flex-col gap-y-6">
                                <motion.h3 
                                initial={{opacity:0}}
                                animate={{opacity:1}}
                                transition={{duration:1,ease:"easeInOut"}}
                                className="font-semibold text-xl">{active.title}</motion.h3>
                                <motion.div
                                variants={fadeIn(active.animate,active.time)} 
                                initial="hidden"
                                animate="show"
                                className="flex">
                                    <Link onClick={() => handleClick(active.path)} href={active.path} className={` cursor-pointer ${active.path === "/"?"bg-accent":"bg-blue-400"} text-white font-semibold p-3 px-10 rounded-lg hover:opacity-50 transition-all duration-300`}>{active.info}</Link>
                                </motion.div>
                                
                            </div>
                        )
                    })}
                </div>
   
            </div>
    )
}