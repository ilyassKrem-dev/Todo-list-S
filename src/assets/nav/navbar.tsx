"use client"
import Link from "next/link"
import { CgProfile } from "react-icons/cg";
import Navicons from "./nav-icons";

export default function Navbar() {
    
    return (
        <div className=" bg-blue-400 p-6 fixed w-full bottom-0 sm:top-0 sm:bottom-auto z-50 "> 
            <div className=" text-white font-bold gap-x-24">
                <div className="flex items-center justify-center  gap-x-24 sm:hidden max-[300px]:gap-x-16">
                    <Navicons />
                </div>
                <div className=" hidden sm:flex justify-between items-center">
                    <div className="  hover:text-blue-700 transition-all duration-300">
                        <Link href={"/"} className="text-2xl">
                            Home
                        </Link>
                    </div>
                    <div className="hover:text-blue-700 transition-all duration-300">
                        <Link href={"/"}>
                            <CgProfile  className="text-4xl"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
    
}