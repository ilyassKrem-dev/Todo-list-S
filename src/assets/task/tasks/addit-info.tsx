



export default function Additinfo({allTasks}:any) {
    
    const numT = allTasks.filter((task:any) => task.completed).length
    
    return (
            <div className="flex justify-between w-[80%] sm:w-[60%]">
                <div className="flex items-center flex-col font-semibold">
                    <div className=" text-blue-400 font-semibold text-xl">
                        Tasks
                    </div>
                    <div className="text-blue-400">
                        {allTasks.length}
                    </div>
                </div>
                <div className="flex items-center flex-col font-semibold">
                    <div className=" text-accent font-semibold text-xl">
                        Finished
                    </div>
                    <div className="text-accent">
                        {numT} of {allTasks.length}
                    </div>
                </div>

            </div>
    )
}