
import Link from "next/link"
const activity = [{
    title:"Go to tasks",
    info:"Tasks",
    path:"/tasks"
},{
    title:"Go to Account",
    info:"Account",
    path:"/account"
},{
    title:"Sign out",
    info:"Sign out",
    path:"/"
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
                <h1 className="h1 max-[300px]:w-[14rem] text-center">
                    Welcome <span className="text-blue-400 capitalize">{props.user} &#128075;</span> 
                </h1>
                <div className="flex flex-col items-center justify-center text-center gap-y-6 mt-16 sm:flex-row sm:gap-x-8 xl:gap-x-12">
                    {activity.map((active:any,index:any) => {
                        return (
                            <div key={index} className="flex flex-col gap-y-6">
                                <h3 className="font-semibold text-xl">{active.title}</h3>
                                <Link onClick={() => handleClick(active.path)} href={active.path} className={` cursor-pointer ${active.path === "/"?"bg-accent":"bg-blue-400"} text-white font-semibold p-3 px-10 rounded-lg hover:opacity-50 transition-all duration-300`}>{active.info}</Link>
                            </div>
                        )
                    })}
                </div>
   
            </div>
    )
}