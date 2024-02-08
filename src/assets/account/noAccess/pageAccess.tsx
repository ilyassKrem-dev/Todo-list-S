
import Link from "next/link"

export default function Pageaccess() {


    return (
        <div className="flex flex-col items-center justify-center gap-y-10">
                <h1 className="h1 text-center max-[300px]:text-2xl"><span className="text-blue-400">Login</span> <br /> To access this page </h1>
                <div className="flex gap-x-4 sm:gap-x-20">
                    <Link  href={"/login"} className={` cursor-pointer bg-blue-400 text-white font-semibold p-3 px-10 rounded-lg hover:opacity-50 transition-all duration-300`}>Login</Link>
                    <Link  href={"/signup"} className={` cursor-pointer bg-blue-400 text-white font-semibold p-3 px-10 rounded-lg hover:opacity-50 transition-all duration-300`}>Sign up</Link>
                </div>
                
        </div>
    )
}