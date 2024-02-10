
import Image from "next/image"

export default function Brush() {


    return (
        <div className="fixed bottom-[2rem] -left-[6rem] rotate-[150deg] -z-20 sm:-bottom-[3rem] animate-pulse">
                <Image src={"/brush.png"} priority={true} width={140} height={140} alt="circle"  className="w-auto h-auto"/>
        </div>
    )
}