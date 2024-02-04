import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation";

export default function LoginPa() {
    const [userInfo,setUserInfo] = useState({
        email:"",password:""
    })
    const [error, setError] = useState<string>("");
    const [noPass,setNoPass] = useState('');
    const [noEmail,setNoEmail] = useState('');const [wrongPass,setWrongPass] = useState('')
    const router = useRouter()
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
            const {token} = response.data;
            localStorage.setItem('authToken',token)
            router.push('/tasks')
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
        <div className="py-36 flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-[50%]">
                {noEmail&&<p>{noEmail}</p>}
                <input type="email" name="email" id="email" autoComplete="on" className="input"
                placeholder="email" onChange={handleChange} value={userInfo.email}/>
                {noPass&&<p>{noPass}</p>}
                {wrongPass&&<p>{wrongPass}</p>}
                <input type="password" name="password" id="password" 
                className="input" placeholder="password" onChange={handleChange} value={userInfo.password}/>
                <button>Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}