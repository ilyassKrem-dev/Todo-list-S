
import Link from "next/link"
import { MdHome } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaTasks } from "react-icons/fa";

export default function Navicons() {



    return (
        <>
            <div className="  hover:text-blue-700 transition-all duration-300">
                    <Link href={"/"}>
                        <MdHome  className="text-4xl"/>
                    </Link>
            </div>
            <div className="hover:text-blue-700 transition-all duration-300">
                    <Link href={"/"}>
                        <FaTasks  className="text-4xl"/>
                    </Link>
            </div>
            <div className="hover:text-blue-700 transition-all duration-300">
                    <Link href={"/"}>
                        <CgProfile  className="text-4xl"/>
                    </Link>
            </div>
        </>
    )
}