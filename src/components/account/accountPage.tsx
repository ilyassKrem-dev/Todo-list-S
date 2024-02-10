import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Changeinfo from "@/assets/account/Access/changeInfo";
import Pageaccess from "@/assets/account/noAccess/pageAccess";

export default function Account() {

    const [loggedIn , setLoggedIn] = useState<boolean | null>(null)
    
    const [user,setUser] = useState<any>()
   
    const router = useRouter()
    
    useEffect(() => {
        const token = localStorage.getItem('authToken')
        if(token) {
            fetch('/api/account',{
                method:'GET',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res=> {
                    if(!res.ok) {
                        throw new Error('Token expired')
                    }
                    return res.json()
                })
                    .then(data => {
                        setUser(data.user)
                        setLoggedIn(true)})
                        .catch(() => {
                            router.push('/login')
                        })
        } else {
            setLoggedIn(false)
        }
       
    },[])
    if(loggedIn === null) {
        return (
            <div className="flex justify-center items-center">
                
            </div>
        )
    }
    return (
        <div className="flex justify-center items-center pt-12 pb-36  sm:py-36">

            {!loggedIn
            ?
            <Pageaccess />
            :
            <Changeinfo user={user} setUser={setUser}/>}
        </div>
    )
}
