
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
export default function Userinfonav({user,loggedIn,setShow,setLoggedIn}:any) {

    useEffect(() => {
        function handleOutsideClick(event: any) {
          const overlay = document.querySelector(".background");
          const profileIcon = document.querySelector(".profile-icon");
          if (overlay && !overlay.contains(event.target) && 
          profileIcon && !profileIcon.contains(event.target))  {
            
            setShow(false);
          }
        }
    
        document.body.addEventListener("click", handleOutsideClick);
    
        return () => {
          document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    const pathname = usePathname()
    return (
        <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={`absolute ${loggedIn ? "-bottom-[15.5rem]" : "-bottom-[14rem]"} bg-white text-black border border-blue-400 rounded-lg p-1 py-6 px-4 background`}>
            <div className={`absolute -top-[0.5rem] ${loggedIn ? "right-[4.7rem]" : "right-[3.7rem]"} right-[4.7rem]  border-solid border-l-transparent border-l-8 border-b-8 border-r-8 border-b-blue-400 border-r-transparent`} >
            </div>
            {loggedIn
            ?
            <div className="flex items-center flex-col gap-y-3">

                <div className="flex items-center flex-col gap-y-1">
                    <p className=" text-base font-medium">Hi,</p>
                    <p className="text-blue-400 font-bold text-lg w-[8rem] text-center">{user.length < 10 ? user : user.substring(0,10) + "..."}</p>
                </div>
                
                <div className="flex flex-col gap-y-3">
                    <Link onClick={() => setShow(false)}    href={"/account"} className={` cursor-pointer bg-blue-400 text-white font-semibold p-2 px-6 rounded-lg hover:opacity-50 transition-all duration-300`}>Account</Link>
                    <button onClick={() => {
                        setShow(false)
                        localStorage.removeItem('authToken')
                        setLoggedIn(false)
                        window.location.href = pathname
                    }}  className={` cursor-pointer bg-accent text-white font-semibold p-2 px-6 rounded-lg hover:opacity-50 transition-all duration-300`}>Sign out</button>
                </div>
            </div>
            :
            <div className="flex items-center flex-col gap-y-4">
                <h3>Account</h3>
                <div className="flex flex-col gap-y-3 items-center justify-center">
                    <Link onClick={() => setShow(false)}  href={"/login"} className={` cursor-pointer bg-blue-400 text-white font-semibold p-2 px-8 rounded-lg hover:opacity-50 transition-all duration-300`}>login</Link>
                    <Link onClick={() => setShow(false)}   href={"/signup"} className={` cursor-pointer bg-accent text-white font-semibold p-2 px-5 rounded-lg hover:opacity-50 transition-all duration-300`}>Sign up</Link>
                </div>
            </div>}
        </motion.div>
    )
}