import { useEffect, useState } from "react"
import Loginform from "@/assets/forms/login/loginForm";
import Defaultpage from "@/assets/forms/defaultPage";
export default function LoginPa() {
    const [userInfo,setUserInfo] = useState({
        email:"",password:""
    })
    const [loggedIn,setLoggedIn] = useState<boolean |null>(null)

    useEffect(() => {
        const token = localStorage.getItem('authToken')
        if(token) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    } , [])
    if(loggedIn === null) {
        return (
            <div className="flex justify-center items-center text-blue-400">
                Loading...
            </div>
        )
    }
    const leaveAcc = () => {
        localStorage.removeItem('authToken')
        window.location.href = "/login"
    }
    return (
        <div className="py-36 flex justify-center items-center flex-col gap-y-6">
            {!loggedIn
            ?
            <Loginform userInfo={userInfo} setUserInfo={setUserInfo} />
            :
            <Defaultpage path="login" />}
        </div>
    )
}