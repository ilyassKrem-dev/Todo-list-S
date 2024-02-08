import Link from "next/link"
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
export default function Accountnav() {
    const [user,setUser] = useState()
    const [logedIn,setLogedIn] = useState<boolean | null>(null)
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
                            setLogedIn(true)})
                                .catch(() => {
                                    localStorage.removeItem('authToken')
                                    setLogedIn(false)
                                
                                })
            } else {
                setLogedIn(false)
            }
           
        
    },[])

    return (
        <div className="hover:text-blue-700 transition-all duration-300">
            <Link href={"/account"} className="hidden">
                <CgProfile  className="text-4xl"/>
            </Link>
            <div className="sm:flex hidden">
                <CgProfile  className="text-4xl cursor-pointer"/>
            </div>
        </div>
    )
}