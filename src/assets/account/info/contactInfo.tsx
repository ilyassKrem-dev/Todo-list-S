import { useEffect, useState } from "react";
import { MdEdit} from "react-icons/md";
import axios from "axios";


export default function Conctactinfo({user , newInfo,setPassEdit,passEdit,handleChange,handleClose,handleEdit}:any) {
    const [errorP, setErrorP] = useState("");
    const [succesP, setSuccesP] = useState("");
    const [oldError,setOldError] = useState("");
    const [maskedPassword, setMaskedPassword] = useState("");
    const maskPassword = () => {
        const masked = user.password.replace(/./g, ".");
        setMaskedPassword(masked.slice(0, 7));
    };
    useEffect(() => {
        maskPassword();
    }, []);
    function handleChanges(e:any) {
        handleChange(e);
        setErrorP("")
        setErrorP('')
        setOldError('')
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (newInfo.password.length < 6) {
          return setErrorP("Passwords must be 6 character or more");
        }
        if (newInfo.password !== newInfo.confPassword) {
          return setErrorP("Passwords dont match");
        }
        try {
          const token = localStorage.getItem("authToken");
          if (token) {
            const response = await axios.patch(
              "/api/account",
              {
                oldPass: newInfo.oldPass,
                newPass: newInfo.password,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response) {
              setPassEdit(false);
              setSuccesP("Password changed");
              setTimeout(() => {
                window.location.href = '/account'
              },5000)
            }
          }
        } catch (error:any) {
           if(error.response) {
            const {data} = error.response
            setOldError(data.error)
           }
        }
      };
    return (
        <div className="px-3 flex flex-col gap-y-4">
          <h1 className="h1 border-b-2 border-gray-500 sm:text-3xl">Contact info</h1>
          <div className="flex flex-col items-center gap-y-2 sm:items-start">
            <h1
              className="font-bold text-xl text-blue-400
                            "
            >
              Email
            </h1>
            <p className=" font-normal text-xl">{user.email}</p>
            <div
              className={`flex flex-col items-center ${passEdit && "gap-y-4"} sm:items-start`}
            >
              <div className="flex items-center justify-center relative sm:items-start">
                <h1
                  className="font-bold text-xl text-blue-400 
                                    "
                >
                  Password
                </h1>
                {!passEdit ? (
                  <MdEdit
                    onClick={() => handleEdit("pass")}
                    className="text-green-500 cursor-pointer hover:opacity-50 transition-all duration-300 text-2xl absolute -right-8 "
                  />
                ) : (
                  <div
                    onClick={() => handleClose("pass")}
                    className="text-accent hover:opacity-50 transition-all duration-300 cursor-pointer absolute -right-7 text-2xl"
                  >
                    X
                  </div>
                )}
              </div>
              {!passEdit ? (
                <p className="text-4xl font-bold">{maskedPassword}</p>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-3 items-center">
                    {oldError&&<p className="text-accent">{oldError}</p>}
                  <input
                    className="input border-blue-400"
                    name="oldPass"
                    autoComplete="off"
                    value={newInfo.oldPass}
                    onChange={handleChanges}
                    type="password"
                    placeholder="Old password"
                  />
                  {errorP && newInfo.password.length < 6 && <p className="text-accent">{errorP}</p>}
                  <input
                    className="input border-blue-400"
                    onChange={handleChanges}
                    autoComplete="off"
                    type="password"
                    name="password"
                    value={newInfo.password}
                    placeholder="new password"
                  />
                  {errorP !== "Passwords must be 6 character or more" && <p className="text-accent">{errorP}</p>}
                  <input
                    className="input border-blue-400"
                    onChange={handleChanges}
                    autoComplete="off"
                    name="confPassword"
                    value={newInfo.confPassword}
                    type="password"
                    placeholder="Confirm password"
                  />
                  <div className="flex gap-x-3">
                    <button
                      type="submit"
                      className="bg-blue-400 text-white p-2 px-6 rounded-lg mt-4 hover:opacity-50 transition-all duration-300"
                    >
                      Change
                    </button>
                    <button
                      onClick={(e) => {
                       e.preventDefault();
                        handleClose("pass");
                      }}
                      className="bg-accent text-white p-2 px-6 rounded-lg mt-4 hover:opacity-50 transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
              {succesP && (
                <p className="text-green-500 font-semibold text-lg">
                  {succesP}
                </p>
              )}
            </div>
          </div>
        </div>
    )
}