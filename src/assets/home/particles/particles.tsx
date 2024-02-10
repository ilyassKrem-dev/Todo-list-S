import {useCallback} from "react"
import {Particles}  from 'react-tsparticles'
import { loadFull } from "tsparticles";
export default function Particales() {

    const particlesInit = useCallback(async (engine:any) => { await loadFull(engine);
    }, []);
    const particlesLoaded = useCallback(async () => {}, []);
    return (
        <Particles 
        className="w-full h-full absolute translate-z-0 -z-50 bottom-0 opacity-50"
        id="tsparticles"
        init={particlesInit} 
        loaded={particlesLoaded}
        options={
            {
                fullScreen: {enable: false},
                background: {
                color:{
                    value: ""
                },
                },
                fps_limit: 120,
                interactivity: {
                events: {
                    onClick:{
                    enable: false,
                    mode: 'push'
                    },
                    onHover: {
                    enable:true,
                    mode: 'repulse'
                    },
                    resize: true,
                },
                modes: {
                    push: {
                    quantity: 90
                    },
                    repulse: {
                    distance:200,
                    duration: 0.4,
                    }
                }
                },
                particles:{
                color:{
                    value: '#42A5F5'
                },
                links: {
                    color: '#42A5F5',
                    distance: 150,
                    enable: true,
                    opacity: 1,
                    width: 1
                },
                collisions: {
                    enable:true
                },
                move: {
                    direction: 'none',
                    enable: true,
                    outModes: {
                    default : 'bounce'
                    } , 
                    random: false,
                    speed: 1,
                    straight: false
                },
                number: {
                    density: {
                    enable: true,
                    area:1000
                    },
                    value:200
                },
                opacity: {
                    value:0.5
                },
                shape: {
                    type: 'circle'
                },
                size: {
                    value: {min:1 , max:5}
                },
                },
                direction: true,
            }
            
        }
        />
    )
}