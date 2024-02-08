
import {useState } from "react";
import Titleinfo from "./info/titleInfo";
import Basicinfo from "./info/basicInfo";
import Conctactinfo from "./info/contactInfo";
import Deleteacc from "./deleteAcc";
export default function Changeinfo({ user, setUser }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [newInfo, setnewInfo] = useState({
    username: user.username,
    password: "",
    confPassword: "",
    oldPass: "",
  });
  const [passEdit, setPassEdit] = useState(false);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setnewInfo((prev) => {
      return { ...prev, [name]: value };
    });
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
  return (
    <div className="flex flex-col gap-y-10 w-full items-center">
      <Titleinfo />
      <div className="flex items-center flex-col gap-y-12 sm:flex-row sm:justify-center sm:gap-x-64">
        <Basicinfo isEditing={isEditing} user={user}  newInfo={newInfo} handleEdit={handleEdit} handleClose={handleClose} setUser={setUser} setIsEditing={setIsEditing} handleChange={handleChange}/>
        <Conctactinfo user={user} newInfo={newInfo} setPassEdit={setPassEdit} passEdit={passEdit} handleChange={handleChange} handleEdit={handleEdit} handleClose={handleClose}/>
      </div>
      <Deleteacc />
    </div>
  );
}
