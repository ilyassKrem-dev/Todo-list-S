


export default function Titleinfo() {


    return (
        <>
           <div className="flex flex-col items-center gap-y-7">
                <h1 className="h1 text-blue-400 underline">Account</h1>
                <p className="text-black text-lg font-medium max-[300px]:text-base">
                Informations about your account
                </p>
            </div>
            <div className="flex w-full items-end justify-end px-6 gap-x-5 relative ">

                <div className=" text-xl font-semibold border-2 px-3 py-1 cursor-pointer rounded-t-xl border-blue-400 hover:opacity-60 transition-all duration-200 border-b-0 bg-white">
                Info
                </div>
                <div className="absolute bottom-0 h-px bg-black left-0 right-0 -z-10 "></div>
            </div> 
        </>
    )
}