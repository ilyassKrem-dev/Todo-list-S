
import { useEffect, useState } from "react"
import Homelogedin from "@/assets/home/homeVarients/LogedHome/homeLoged"
import Homenormal from "@/assets/home/homeVarients/normal/homeNormall"
import Logo_bg_home from "@/assets/home/logo_bg_home/logo_bg_home"

export default function Homepage() {
    const [user,setUser] = useState<any>()
    const [logedIn,setLogedIn] = useState<boolean | null>(null)
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
    if (logedIn === null) {
        return (
          <div className="flex justify-center items-center text-blue-400"></div>
        );
      }

    
    return (
        <div className="flex flex-col justify-center items-center py-32 sm:py-36 gap-y-6 max-[300px]:py-24 realtive">
            <Logo_bg_home />
            {!logedIn
            ?
            <Homenormal />
            :
            <Homelogedin user={user}/>}
            
        </div>
    )
}