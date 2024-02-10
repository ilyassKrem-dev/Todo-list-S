import Image from "next/image"


export default function Taskimg() {


    return (
        <>
            <div className="fixed -top-[5rem] -left-[6rem] -z-20 sm:-bottom-[14rem] sm:-top-0">
                <Image src={"/top-left.png"} priority={true} width={140} height={140} alt="circle"  className="w-auto h-auto"/>
            </div>
            <div className="fixed -bottom-[12rem] -right-[18rem] -z-10 sm:-bottom-[14rem] ">
                <Image src={"/circle.png"} width={500} height={500} priority={true} alt="circle"  className="w-auto h-auto "/>
            </div>
        </>
    )
}