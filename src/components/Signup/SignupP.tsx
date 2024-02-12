
import { useEffect, useState } from "react"
import Signupform from "@/assets/forms/signup/signupForm"
import Defaultpage from "@/assets/forms/defaultPage"
export default function SignupPa() {

    const [info ,setInfo] = useState({
        name:"",email:"",password:"",confirmPas:"",checkedN:true
    })
    const [loggedIn,setLoggedIn] = useState<boolean|null>(null)
    useEffect(() => {
        const token = localStorage.getItem('authToken')
        if(token) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    },[])
    if(loggedIn === null) {
        return (
            <div className="flex justify-center items-center text-blue-400"></div>
        )
    }
    return (
        <div className="py-36 flex flex-col  items-center justify-center gap-y-6">
            {!loggedIn
            ?
            <Signupform info={info} setInfo={setInfo} />
            :
            <Defaultpage path="signup"/>}
        </div>
    )
}