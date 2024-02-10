import { useEffect, useState } from "react"
import { FaArrowUp } from "react-icons/fa";


export default function Totop() {
    const [showBackToTop, setShowBackToTop] = useState(false);
    const handleScroll = () => {
        const scrollThreshold = 200
        if (window.scrollY > scrollThreshold) {
            setShowBackToTop(true);
        } else {
            setShowBackToTop(false);
        }
    };
    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    } , [])
    
    return (
        <>
            {showBackToTop && (
            <>
                <button
                    onClick={handleBackToTop}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md fixed bottom-10 right-10 hover:opacity-80 active:opacity-70 transition-all duration-300 hidden sm:flex"
                >
                    Back to Top
                </button>
                <button
                onClick={handleBackToTop}
                className="fixed bottom-[7rem] right-[46%] text-2xl border border-blue-400 rounded-full p-1 bg-white text-blue-400 hover:opacity-80 active:opacity-70 transition-all duration-300 sm:hidden">
                    <FaArrowUp/>
                </button>
            </>
        )}
        </>
    )
}