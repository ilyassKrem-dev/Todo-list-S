
import Homeinputs from "@/assets/home/Inputs/inputs"
import Brush from "@/assets/home/bg/brush"

export default function Homenormal() {

    return (
        <>
            <div className="mt-28">
                <h1 className="h1 text-center text-3xl">Start creating your own <span className="text-blue-400">
                    task
                </span>  list</h1>
            </div>
            <Homeinputs />
            <Brush />
        </>
    )
}