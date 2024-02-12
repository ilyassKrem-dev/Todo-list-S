
import Link from "next/link"

export default function Notfound({err}:{err?: string}) {


    return (
        <div className="flex flex-col items-center justify-center text-center mt-24 gap-y-12 py-32">
                <h1 className="h1 max-[380px]:text-3xl">{err || "We couldn't find the page you're looking for."} </h1>
                <div className="flex flex-col sm:flex-row gap-y-12 sm:gap-x-12">
                    
                    <Link  className={` cursor-pointer bg-blue-400 text-white font-semibold p-3 px-10 rounded-lg hover:opacity-50 transition-all duration-300`} href="/">Back home</Link>
                </div>
                
        </div>
    )
}