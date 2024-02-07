import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Changeinfo from "@/assets/account/changeInfo";
export default function Account() {

    const [logedIn , setLogedIn] = useState<boolean | null>(null)
    
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
                        setLogedIn(true)})
                        .catch(() => {
                            router.push('/login')
                        })
        } else {
            setLogedIn(false)
        }
       
    },[])

    return (
        <div className="flex justify-center items-center py-36">
            {!logedIn
            ?
            <div>
                <h1 className="h1">Not</h1>
            </div>
            :
            <Changeinfo user={user} setUser={setUser}/>}
        </div>
    )
}
