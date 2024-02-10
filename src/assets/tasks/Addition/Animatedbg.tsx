
import { useScroll, animated, useSpring } from '@react-spring/web'
import { useRef } from 'react'

export default function Animatedbg() {
    const X_LINES = 40
    const containerRef = useRef<HTMLDivElement>(null!)
    const barContainerRef = useRef<HTMLDivElement>(null!)
    const INITIAL_WIDTH = 20
    const [textStyles,textApi] = useSpring(() => ({
        y: '100%',
      }))
    const { scrollYProgress } = useScroll({
        container: containerRef,
        onChange: ({ value: { scrollYProgress } }) => {
          if (scrollYProgress > 0.7) {
            textApi.start({ y: '0' })
          } else {
            textApi.start({ y: '100%' })
          }
        },
        default: {
          immediate: true,
        },
      })

    return (
        <>
            <div className="fixed w-full h-full -z-40 pointer-events-none inset-0 animate-pulse">
                <animated.div ref={barContainerRef} className={`flex flex-col items-end z-10 justify-between h-full`}>
                {Array.from({ length: X_LINES }).map((_, i) => (
                    <animated.div
                    key={i}
                    className={` h-[1vh] bg-blue-400`}
                    style={{
                        width: scrollYProgress.to(scrollP => {
                        const percentilePosition = (i + 1) / X_LINES

                        return INITIAL_WIDTH / 4 + 40 * Math.cos(((percentilePosition - scrollP) * Math.PI) / 1.5) ** 32
                        }),
                    }}
                    />
                ))}
                </animated.div>
            </div>
            <div className="fixed w-full h-full -z-40 pointer-events-none inset-0 animate-pulse">
                <animated.div  className={`flex flex-col items-start z-10 justify-between h-full`}>
                {Array.from({ length: X_LINES }).map((_, i) => (
                    <animated.div
                    key={i}
                    className={` h-[1vh] bg-blue-400`}
                    style={{
                        width: scrollYProgress.to(scrollP => {
                        const percentilePosition = 1 - (i + 1) / X_LINES

                        return INITIAL_WIDTH / 4 + 40 * Math.cos(((percentilePosition - scrollP) * Math.PI) / 1.5) ** 32
                        }),
                    }}
                    />
                ))}
                </animated.div>
            </div>
        </>
    )
}