"use client"
import {motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation";
import Transition from "@/assets/transition/Transition";

export default function AnimatedWrapper({ children }: { children: React.ReactNode }) {
const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div  key={pathname} className="h-full">
        <Transition />
        {children}
      </motion.div>
    </AnimatePresence>);
}
