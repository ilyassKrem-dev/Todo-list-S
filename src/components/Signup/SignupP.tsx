import { useState } from "react"



export default function SignupPa() {

    const [info ,setInfo] = useState({
        name:"",email:"",password:"",confirmPas:"",checkedN:true
    })

    function handleChange(e:any) {
        const {name,type,checked,value} = e.target
        setInfo(prev => {
            return {...prev,
                    [name]:type === 'checkbox'?checked:value}
        })
    }

    return (
        <div className="py-36 flex items-center justify-center">
            <form action="" className="w-[50%]">
                <input type="text" name="name" id="name"
                className="input"
                placeholder="name"
                value={info.name}
                onChange={handleChange}/>

                <input type="email" name="email" id="email" 
                className="input"
                placeholder="email"
                value={info.email}
                onChange={handleChange}/>

                <input type="password" name="password" id="password" 
                className="input"
                placeholder="password"
                value={info.password}
                onChange={handleChange}/>

                <input type="password" name="confirmPas" id="confirmPas" 
                className="input"
                value={info.confirmPas}
                placeholder="confirm password"
                onChange={handleChange}/>

                <input type="checkbox" name="checkedN" id="checkedN" checked={info.checkedN}
                onChange={handleChange}/>
                
                <button>Sign up</button>
            </form>
        </div>
    )
}