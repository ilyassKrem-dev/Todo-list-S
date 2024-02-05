
import Link from "next/link"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import axios from "axios"
export default function Signupform({info,setInfo}:any) {

    const [passMatch,setPassMatch] = useState("")
    const [emailError, setEmailError] = useState("");
    const [allEmpty,setAllEmpty] = useState('');
    const [passShort,setpassShort] = useState('');
    const [nameCheck,setNameCheck] = useState('')
    const [loading, setLoading] = useState(false);
    const [msg,setMsg] = useState("")
    const router = useRouter()
    function handleChange(e:any) {
        const {name,type,checked,value} = e.target
        setInfo((prev:any) => {
            return {...prev,
                    [name]:type === 'checkbox'?checked:value}
        })
        setPassMatch("");
        setpassShort("");
        setEmailError('');
        setPassMatch('');
        setNameCheck('')
    }
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        try {
            if (info.password !== info.confirmPas) {
                setPassMatch("Passwords do not match");
                return 
            }
            setLoading(true);
            const response = await axios.post('/api/account/signup',{
                username:info.name.toLowerCase(),
                email:info.email.toLowerCase(),
                password:info.password,
                News:info.checkedN
            })
            if(response) {
                setMsg("Account created")
            }
        } catch (error:any) {
            if (error.response) {
                    const {data} = error.response
                    if (data.error === "All fields are required") {
                        setAllEmpty("All fields are required")
                    } else if (data.error === "Email is already in use") {
                        setEmailError("Email is already in use")
                    } else if (data.error === 'Password must be 6 character long') {
                        setpassShort('Password must be 6 character long')
                    } else if (data.error === "Username is already in use") {
                        setNameCheck("Username is already in use")
                    }
            }
        } finally {
            setLoading(false);
            
        }
    }
    useEffect(() => {
        const id = setTimeout(() => {
            setAllEmpty("")
        },3000)
        
        return () => {
            clearTimeout(id)
        }
    },[allEmpty])
    useEffect(() => {
        let id:any
        if(msg) {
            id = setTimeout(() => {
                router.push('/login')
            },5000)
        }
        
        
        return () => {
            clearTimeout(id)
        }
    },[msg])
    return(
        <>
            <div>
                <h1 className="h1 text-center">
                    Create an <span className="text-blue-400">account</span>:
                </h1>
            </div>
            <form onSubmit={handleSubmit} className="w-[80%] border border-blue-400 p-6 rounded-lg flex flex-col gap-y-6 items-center sm:w-[60%] lg:w-[60%] xl:w-[600px]">
                {nameCheck&&<p className="text-accent text-md font-semibold">{nameCheck}</p>}
                {msg&&
                <div className="flex flex-col gap-x-2 items-center justify-center">
                    <p className=" text-green-600 text-md font-semibold">{msg}</p>
                    <p className="text-green-600 text-md font-semibold">Redirect to login..</p>
                </div>
                }
                <input type="text" name="name" id="name"
                autoComplete="off"
                className="input"
                placeholder="name"
                value={info.name}
                onChange={handleChange}/>
                {emailError&&<p className="text-accent text-md font-semibold">{emailError}</p>}
                <input type="email" name="email" id="email"
                autoComplete="on"
                className="input"
                placeholder="email"
                value={info.email}
                onChange={handleChange}/>
                {passShort&&<p className="text-accent text-md font-semibold">{passShort}</p>}
                <input type="password" name="password" id="password" 
                className="input"
                placeholder="password"
                value={info.password}
                onChange={handleChange}/>
                {passMatch && (
                    <p className="text-accent text-md font-semibold">{passMatch}</p>
                )}
                <input type="password" name="confirmPas" id="confirmPas" 
                className="input"
                value={info.confirmPas}
                placeholder="confirm password"
                onChange={handleChange}/>
                <div className="flex items-center gap-x-3 self-start">
                    <input className=" scale-125 cursor-pointer" type="checkbox" name="checkedN" id="checkedN" checked={info.checkedN}
                    onChange={handleChange}/>
                    <label htmlFor="checkedN">Sign for newsletters</label>
                </div>
                
               {allEmpty&&<p className="text-accent text-md font-semibold">{allEmpty}</p>}
                <button className="bg-blue-400 text-white rounded-xl w-[40%] py-2 hover:opacity-60 font-semibold text-lg active:opacity-50 transition-all duration-300 max-[450px]:w-[60%]" disabled={loading}>{loading ? "Signing up..." : "Sign up"}</button>
            </form>
            <div className="flex gap-y-3 flex-col w-[80%] sm:w-[40%] items-center px-6">
                <Link href={"/login"} className="bg-blue-400 py-2 text-white rounded-xl w-[40%] xl:w-[130px] text-center font-semibold hover:opacity-60 active:opacity-50 transition-all duration-300 max-[450px]:w-[60%]">Login</Link>
                <Link href={"/tasks"} className=" text-gray-600 underline hover:opacity-70 hover:text-gray-900 font-semibold transition-all duration-300">Guest</Link>
            </div>
        </>
    )
}