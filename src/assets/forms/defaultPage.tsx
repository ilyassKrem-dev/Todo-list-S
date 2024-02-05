import Link from "next/link"

export default function Defaultpage({path}:any) {
    const leaveAcc = () => {
        localStorage.removeItem('authToken')
        window.location.href = `/${path}`
    }
    return (
        <div className="flex flex-col items-center justify-center text-center mt-24 gap-y-12">
                <h1 className="h1 max-[380px]:text-3xl">You already logged into your account </h1>
                <div className="flex flex-col sm:flex-row gap-y-12 sm:gap-x-12">
                    <Link  href={"/"} className={` cursor-pointer bg-blue-400 text-white font-semibold p-3 px-10 rounded-lg hover:opacity-50 transition-all duration-300`}>Home</Link>
                    <Link onClick={leaveAcc} className={` cursor-pointer bg-accent text-white font-semibold p-3 px-10 rounded-lg hover:opacity-50 transition-all duration-300`} href="/login">Sign out</Link>
                </div>
                
        </div>
    )
}