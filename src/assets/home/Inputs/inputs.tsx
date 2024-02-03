

import Link from "next/link"

export default function Homeinputs() {


    return (
        <div className="flex flex-col gap-y-3 items-center">
            <div className="flex gap-x-6 items-center">
                <Link href={"/login"} className="bg-blue-400 text-white p-3 px-8 rounded-lg font-semibold text-lg hover:opacity-60 hover:text-blue-600 transition-all duration-300">Login</Link>
                <Link href={"/signup"}  className="bg-blue-400 text-white p-3 px-8 rounded-lg font-semibold text-lg hover:opacity-60 hover:text-blue-600 transition-all duration-300">Register</Link>
            </div>
            <Link href={"/tasks"} className='underline text-gray-700 text-lg hover:opacity-60 transition-all duration-300'>Continue as guest</Link>
        </div>
    )
}