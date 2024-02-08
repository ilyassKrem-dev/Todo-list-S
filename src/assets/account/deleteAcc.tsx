import { useEffect, useState } from "react"
import axios from "axios"


export default function Deleteacc() {

    const [showD,setShowD] = useState<boolean>(false)
    const [changeText,setChangeText] = useState("")
    const handleDelete = async() => {
        try {
            const token = localStorage.getItem('authToken')
            if(token) {
                const response = await axios.delete('/api/account',{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                if(response) {
                    setChangeText('Your account is deleted')
                    localStorage.removeItem('authToken')
                    setTimeout(() => {
                        window.location.href = "/"
                    },4000)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        function handleOutsideClick(event: any) {
          const overlay = document.querySelector(".background");
          if (overlay && !overlay.contains(event.target)) {
            
            setShowD(false);
          }
        }
    
        document.body.addEventListener("click", handleOutsideClick);
    
        return () => {
          document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    return (
        <div className="flex justify-center items-center mt-12">
            <button onClick={() =>setShowD(true)} className="bg-accent p-2 rounded-lg text-white px-10 font-semibold text-lg hover:opacity-50 transition-all duration-300">Delete account</button>
            {showD&&
            <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center z-40">
                <div className="bg-white/90 border-accent border-2 p-2 rounded-lg text-center flex flex-col gap-y-8 px-14 py-6 relative background">
                    {!changeText?
                    <>
                        <p className="font-semibold text-lg">Are you sure ?</p>
                        <button onClick={handleDelete} className="bg-accent p-2 rounded-lg text-white px-10 font-semibold text-md hover:opacity-50 transition-all duration-300 max-[300px]:px-4">Yes <br /> Delete account</button>
                        <div onClick={() =>setShowD(false)} className="absolute font-bold top-1 right-2 text-lg hover:opacity-80 hover:text-accent transition-all duration-300 cursor-pointer border-black border rounded-full p-1 px-3 hover:border-accent">X</div>
                    </>
                    :
                    <p className="font-semibold text-lg">{changeText}</p>}
                </div>
                
            </div>}
        </div>
    )
}