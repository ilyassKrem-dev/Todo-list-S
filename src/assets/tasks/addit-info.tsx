



export default function Additinfo() {


    return (
            <div className="flex justify-between w-[80%] sm:w-[60%]">
                <div className="flex items-center flex-col font-semibold">
                    <div className=" text-blue-400 font-semibold text-xl">
                        Tasks
                    </div>
                    <div className="text-blue-400">
                        0/0
                    </div>
                </div>
                <div className="flex items-center flex-col font-semibold">
                    <div className=" text-accent font-semibold text-xl">
                        Finished
                    </div>
                    <div className="text-accent">
                        0/0
                    </div>
                </div>

            </div>
    )
}