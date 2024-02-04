import axios from "axios"
import { useEffect, useState } from "react"



export default function SignupPa() {

    const [info ,setInfo] = useState({
        name:"",email:"",password:"",confirmPas:"",checkedN:true
    })
    const [passMatch,setPassMatch] = useState("")
    const [emailError, setEmailError] = useState("");
    const [allEmpty,setAllEmpty] = useState('');
    const [passShort,setpassShort] = useState('');
    const [nameCheck,setNameCheck] = useState('')
    const [loading, setLoading] = useState(false);
    function handleChange(e:any) {
        const {name,type,checked,value} = e.target
        setInfo(prev => {
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
            setLoading(false)
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
    return (
        <div className="py-36 flex items-center justify-center">
            <form onSubmit={handleSubmit} className="w-[50%]">
                {nameCheck&&<p>{nameCheck}</p>}
                <input type="text" name="name" id="name"
                autoComplete="off"
                className="input"
                placeholder="name"
                value={info.name}
                onChange={handleChange}/>
                {emailError&&<p>{emailError}</p>}
                <input type="email" name="email" id="email"
                autoComplete="on"
                className="input"
                placeholder="email"
                value={info.email}
                onChange={handleChange}/>
                {passShort&&<p>{passShort}</p>}
                <input type="password" name="password" id="password" 
                className="input"
                placeholder="password"
                value={info.password}
                onChange={handleChange}/>
                {passMatch && (
                    <p className="text-red-500">{passMatch}</p>
                )}
                <input type="password" name="confirmPas" id="confirmPas" 
                className="input"
                value={info.confirmPas}
                placeholder="confirm password"
                onChange={handleChange}/>

                <input type="checkbox" name="checkedN" id="checkedN" checked={info.checkedN}
                onChange={handleChange}/>
               {allEmpty&&<p>{allEmpty}</p>}
                <button disabled={loading}>{loading ? "Signing up..." : "Sign up"}</button>
            </form>
        </div>
    )
}