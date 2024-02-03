

import Logo from "@/assets/Images/logo"
import Homeinputs from "@/assets/home/Inputs/inputs"
import Brush from "@/assets/home/bg/brush"
export default function Homepage() {


    return (
        <div className="flex flex-col justify-center items-center py-32 sm:py-36 gap-y-6 max-[300px]:py-24">
            <Logo />
            <div className="mt-28">
                <h1 className="h1 text-center text-3xl">Start creating your own <span className="text-blue-400">task</span>  list</h1>
            </div>
            <Homeinputs />
            <Brush />
        </div>
    )
}