



export default function Logo() {


    return (
        <>
            <div className="flex text-blue-500 font-bold relative gap-2 items-center underline">
                <div className="flex">
                    <div className="text-5xl absolute -top-5  text-accent">
                        °
                    </div>
                    <div className="text-5xl" style={{fontFamily:"fantasy"}}>
                        T
                    </div>
                    <div className="text-5xl">o<span style={{fontFamily:"cursive"}} className="text-5">d</span>o</div>
                </div>     
                <div className="text-5xl text-accent">
                    <span style={{fontFamily:"cursive"}}>L</span>
                    ist
                </div>
            </div>
        </>
    )
}