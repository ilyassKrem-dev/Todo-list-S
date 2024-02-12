import { useState } from "react";

import axios from "axios"
import Link from "next/link";

export default function Loginform({userInfo,setUserInfo}:any) {
    const [error, setError] = useState<string>("");
    const [noPass,setNoPass] = useState('');
    const [noEmail,setNoEmail] = useState('');const [wrongPass,setWrongPass] = useState('')
    const handleChange = (e:any) => {
        const {name,value} = e.target;
        setUserInfo((prev:any) => {
            return (
                {...prev,[name]:value}
            )
        })
        setError("")
        setNoPass("");
        setNoEmail("");
        setWrongPass("")
    }
    const handleSubmit=async (e:React.FormEvent) => {
        e.preventDefault();
        try {
            if (!userInfo.password && !userInfo.email) {
                return setError("Invalid info")
            } else if (!userInfo.password) {
                return setNoPass("Provide the password")}
            const response = await axios.post('/api/account/login' , {
                email:userInfo.email.toLowerCase(),
                password:userInfo.password
            })
            const loginTime = new Date();
            
            localStorage.setItem('loginTime', loginTime.getHours().toString());

            const {token} = response.data;
            localStorage.setItem('authToken',token)
            if(response) {
                window.location.href = "/"
            }
            
        } catch (error:any) {
            if(error.response) {
                const {data} = error.response
                if (data.error === "No user found with this email") {
                    setNoEmail("No user found with this email")
                } else if (data.error == "Incorrect password") {
                    setWrongPass("Incorrect password")
                }
            }
        }
    }

    return (
        <>
            <div>
                <h1 className="h1 text-center text-blue-400">
                    Login<span className="text-black">:</span>
                </h1>
            </div>
            <form onSubmit={handleSubmit} className="w-[80%] border border-blue-400 p-6 rounded-lg flex flex-col gap-y-6 items-center sm:w-[60%] lg:w-[60%] xl:w-[500px]">
                {noEmail&&<p className="text-accent font-semibold text-md">{noEmail}</p>}
                <input type="email" name="email" id="email" autoComplete="on" className="input"
                placeholder="email" onChange={handleChange} value={userInfo.email}/>
                {noPass&&<p className="text-accent font-semibold text-md">{noPass}</p>}
                {wrongPass&&<p className="text-accent font-semibold text-md">{wrongPass}</p>}
                <input type="password" name="password" id="password" 
                className="input" placeholder="password" onChange={handleChange} value={userInfo.password}/>
                <button  className="bg-blue-400 text-white rounded-xl w-[40%] py-2 hover:opacity-60 font-semibold text-lg active:opacity-50 transition-all duration-300 max-[450px]:w-[60%]">Login</button>
                {error && <p className="text-accent font-semibold text-md">{error}</p>}
            </form>
            <div className="flex gap-y-3 flex-col w-[80%] sm:w-[40%] items-center px-6">
                <Link href={"/signup"} className="bg-blue-400 py-2 text-white rounded-xl w-[30%] xl:w-[130px] text-center font-semibold hover:opacity-60 active:opacity-50 transition-all duration-300 max-[450px]:w-[60%]">Sign up</Link>
                
            </div>
        </>

    )
}