import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Packman from '../Packman/Packman'

const Container = styled.div`
    position: absolute;
    z-index: 5;
    transition: all .05s ease;
    ${props => {
        return {
            width: `${props.theme.settings.block}rem`,
            height: `${props.theme.settings.block}rem`,
        }
    }};
    display: flex;
    align-items: center;
    justify-content: center;

    left: ${props => `${props.x}rem`};
    bottom: ${props => `${props.y}rem`};
`


const Player = props => {

    const { settings } = props

    const [xPos, setXpos] = useState(0)
    const [yPos, setYpos] = useState(0)
    const [direction, setDirection] = useState("right")

    const onKeyDownHandler = event => {

        const key = event.key.toLowerCase()

        const forbiddenY = settings.height - settings.block
        const forbiddenX = settings.width - settings.block

        switch(key){
            case "arrowup":
                if(yPos + settings.block <= forbiddenY){
                    setYpos(prev => prev + settings.block)
                    setDirection("up")
                }          
                break;
            case "arrowdown":
                if(yPos >= settings.block){
                    setYpos(prev => prev - settings.block)
                    setDirection("down")
                }
                break;
            case "arrowright":
                if(xPos + settings.block <= forbiddenX){
                    setXpos(prev => prev + settings.block)
                    setDirection("right")
                }
                break;
            case "arrowleft":
                if(xPos >= settings.block){
                    setDirection("left")
                    setXpos(prev => prev - settings.block)
                }
                break;
            default: break;
        }
    }


    useEffect(() => {
        window.addEventListener("keydown", onKeyDownHandler)
        return () => {
            window.removeEventListener("keydown", onKeyDownHandler)
        }
    }, [onKeyDownHandler])

    return (
        <Container
            x={xPos}
            y={yPos}
        >
            <Packman direction={direction}/>
        </Container>
    )
}

export default Player
