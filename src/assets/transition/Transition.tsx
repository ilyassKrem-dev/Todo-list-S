import {motion} from "framer-motion"

export default function Transition() {

    const varientsSty = {
        initial:{
            x: "100%",
            width:"100%"
        },
        animate:{
            x:"0%",
            width:"0%"
        },
        exit:{
            x:['100%',"0%"],
            width:['100%',"0%"]
        }
    }

    return (
        <>
            <motion.div 
            variants={varientsSty}
            initial="initial"
            animate="animate"
            
            transition={{delay:0.1,duration:0.4,ease:"easeInOut"}}
            className=" bg-blue-300 fixed top-0 bottom-0 h-screen w-screen z-40 right-full"></motion.div>
             <motion.div 
            variants={varientsSty}
            initial="initial"
            animate="animate"
           
            transition={{delay:0.2,duration:0.6,ease:"easeInOut"}}
            className=" bg-blue-400/80 fixed top-0 bottom-0 h-screen w-screen z-40 right-full"></motion.div>
             <motion.div 
            variants={varientsSty}
            initial="initial"
            animate="animate"
           
            transition={{delay:0.3,duration:0.8,ease:"easeInOut"}}
            className=" bg-blue-500/60 fixed top-0 bottom-0 h-screen w-screen z-40 right-full"></motion.div> 
        </>
    )
}