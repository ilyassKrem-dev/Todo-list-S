import Image from "next/image";
import { useEffect, useState } from "react";
import { MdEdit, MdCheck } from "react-icons/md";
import axios from "axios";

export default function Changeinfo({ user, setUser }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [newInfo, setnewInfo] = useState({
    username: user.username,
    password: "",
    confPassword: "",
    oldPass: "",
  });
  const [maskedPassword, setMaskedPassword] = useState("");
  const [passEdit, setPassEdit] = useState(false);
  const [errorP, setErrorP] = useState("");
  const [succesP, setSuccesP] = useState("");
  const [oldError,setOldError] = useState("")
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setnewInfo((prev) => {
      return { ...prev, [name]: value };
    });
    setErrorP("")
    setErrorP('')
    setOldError('')
  };
  const calculateInputWidth = (text: string) => {
    return text.length * 8 + 40;
  };
  function handleEdit(func: any) {
    if (func === "name") {
      setIsEditing(true);
      setPassEdit(false);
    } else if (func === "pass") {
      setIsEditing(false);
      setPassEdit(true);
    }
  }
  function handleClose(func: any) {
    if (func === "name") {
      setIsEditing(false);
    } else if (func === "pass") {
      setPassEdit(false);
    }
    setnewInfo((prev) => {
      return {
        ...prev,
        username: user.username,
        password: "",
        confPassword: "",
        oldPass: "",
      };
    });
  }
  async function updateUser() {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        await axios.patch(
          "/api/account",
          {
            username: newInfo.username,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const response = await axios.get("/api/account", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response) {
          setUser(response.data.user);
          setIsEditing(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  const maskPassword = () => {
    const masked = user.password.replace(/./g, ".");
    setMaskedPassword(masked.slice(0, 7));
  };
  useEffect(() => {
    maskPassword();
  }, []);
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
    <div className="flex flex-col gap-y-10 w-full">
      <div className="flex flex-col items-center gap-y-7">
        <h1 className="h1 text-blue-400 underline">Account</h1>
        <p className="text-black text-lg font-medium max-[300px]:text-base">
          Informations about your account
        </p>
      </div>
      <div className="flex  w-full items-end justify-end px-6 gap-x-5 relative">
        <div className=" text-xl font-semibold border-2 px-3 py-1 cursor-pointer rounded-t-xl border-black border-b-0 bg-white">
          Info
        </div>
        <div className="absolute bottom-0 h-px bg-black left-0 right-0 -z-10"></div>
      </div>
      <div className="flex items-center flex-col gap-y-12">
        <div className="flex flex-col gap-y-5 items-center">
          <h1 className="h1 border-b-2 border-gray-500">Basic info</h1>

          <div className="rounded-full group hover:bg-black/80 transition-all duration-300">
            <Image
              src="/profile.jpg"
              width={100}
              height={100}
              priority={true}
              alt="deafult profile"
              className="w-auto h-auto rounded-full border border-black cursor-pointer group-hover:opacity-60  transition-all duration-300"
            />
          </div>

          <div className="flex text-xl font-semibold">
            {!isEditing ? (
              <div className="flex gap-x-2 items-center">
                <h3 className=" capitalize">{user.username}</h3>
                <MdEdit
                  onClick={() => handleEdit("name")}
                  className="text-green-500 cursor-pointer hover:opacity-50 transition-all duration-300"
                />
              </div>
            ) : (
              <div className="flex gap-x-4 items-center">
                <input
                  type="text"
                  name="username"
                  value={newInfo.username}
                  onChange={handleChange}
                  className="bg-white border border-blue-400 pl-2 rounded-lg focus-within:outline-blue-400 capitalize border-x-0"
                  style={{
                    width: calculateInputWidth(newInfo.username) + "px",
                  }}
                />
                <MdCheck
                  className="text-green-500 cursor-pointer hover:opacity-50 transition-all duration-300"
                  onClick={updateUser}
                />
                <div
                  onClick={() => handleClose("name")}
                  className="text-accent hover:opacity-50 transition-all duration-300 cursor-pointer"
                >
                  X
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-3 flex flex-col gap-y-4">
          <h1 className="h1 border-b-2 border-gray-500">Contact info</h1>
          <div className="flex flex-col items-center gap-y-2">
            <h1
              className="font-bold text-xl text-blue-400
                            "
            >
              Email
            </h1>
            <p className=" font-normal text-xl">{user.email}</p>
            <div
              className={`flex flex-col items-center ${passEdit && "gap-y-4"}`}
            >
              <div className="flex items-center justify-center relative">
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
                    value={newInfo.oldPass}
                    onChange={handleChange}
                    type="password"
                    placeholder="Old password"
                  />
                  {errorP && newInfo.password.length < 6 && <p className="text-accent">{errorP}</p>}
                  <input
                    className="input border-blue-400"
                    onChange={handleChange}
                    type="password"
                    name="password"
                    value={newInfo.password}
                    placeholder="new password"
                  />
                  {errorP !== "Passwords must be 6 character or more" && <p className="text-accent">{errorP}</p>}
                  <input
                    className="input border-blue-400"
                    onChange={handleChange}
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
      </div>
    </div>
  );
}
