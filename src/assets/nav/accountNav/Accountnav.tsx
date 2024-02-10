import Link from "next/link"
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import Userinfonav from "./userInfoNav";
export default function Accountnav() {
    const [user,setUser] = useState("")
    const [loggedIn,setLoggedIn] = useState<boolean | null>(null)
    const [show,setShow] = useState<boolean>(false)
    useEffect(() => {
            const token = localStorage.getItem('authToken')
            if(token) {
                fetch('/api/account', {
                    method:'GET',
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                    .then(res => {
                        if(!res.ok) {
                            throw new Error('Token expired');
                        }
                        return res.json()
                    })
                        .then(data => {
                            setUser(data.user.username)
                            setLoggedIn(true)})
                                .catch(() => {
                                    localStorage.removeItem('authToken')
                                    setLoggedIn(false)
                                
                                })
            } else {
                setLoggedIn(false)
            }
    },[])
    if(loggedIn === null) {
        return (
            <div className="flex justify-center items-center"></div>
        )
    }
    
    return (
        <div>
            <Link href={"/account"} className="hidden hover:text-blue-700 transition-all duration-300">
                <CgProfile  className="text-4xl"/>
            </Link>
            <div className="sm:flex hidden relative items-center justify-center">
                <CgProfile onClick={() => setShow(prev => !prev)}  className="text-4xl cursor-pointer hover:text-blue-700 transition-all duration-300 profile-icon"/>
                {show&&
                <Userinfonav user={user} loggedIn={loggedIn} setShow={setShow} setLoggedIn={setLoggedIn}/>}
            </div>
        </div>
    )
}