
import Image from "next/image"
import { MdEdit, MdCheck } from "react-icons/md";
import axios from "axios";
export default function Basicinfo(props:any) {

    const calculateInputWidth = (text: string) => {
        return text.length * 8 + 40;
      };
    
    async function updateUser() {
        try {
          const token = localStorage.getItem("authToken");
          if (token) {
            await axios.patch(
              "/api/account",
              {
                username: props.newInfo.username,
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
              props.setUser(response.data.user);
              props.setIsEditing(false);
            }
          }
        } catch (error) {
          console.log(error);
        }
    }
    return(
        <div className="flex flex-col gap-y-5 items-center sm:order-1 sm:self-start">
          <h1 className="h1 border-b-2 border-gray-500 sm:hidden">Basic info</h1>

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
            {!props.isEditing ? (
              <div className="flex gap-x-2 items-center">
                <h3 className=" capitalize">{props.user.username}</h3>
                <MdEdit
                  onClick={() => props.handleEdit("name")}
                  className="text-green-500 cursor-pointer hover:opacity-50 transition-all duration-300"
                />
              </div>
            ) : (
              <div className="flex gap-x-4 items-center">
                <input
                  type="text"
                  name="username"
                  autoComplete="off"
                  value={props.newInfo.username}
                  onChange={props.handleChange}
                  className="bg-white border border-blue-400 pl-2 rounded-lg focus-within:outline-blue-400 capitalize border-x-0"
                  style={{
                    width: calculateInputWidth(props.newInfo.username) + "px",
                  }}
                />
                <MdCheck
                  className="text-green-500 cursor-pointer hover:opacity-50 transition-all duration-300"
                  onClick={updateUser}
                />
                <div
                  onClick={() =>props.handleClose("name")}
                  className="text-accent hover:opacity-50 transition-all duration-300 cursor-pointer"
                >
                  X
                </div>
              </div>
            )}
          </div>
        </div>
    )
}