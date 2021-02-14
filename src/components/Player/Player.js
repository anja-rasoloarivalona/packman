import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    background: red;
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

    const onKeyDownHandler = event => {

        const key = event.key.toLowerCase()

        switch(key){
            case "arrowup":
                setYpos(prev => prev + settings.block)
                break;
            case "arrowdown":
                setYpos(prev => prev - settings.block)
                break;
            case "arrowright":
                setXpos(prev => prev + settings.block)
                break;
            case "arrowleft":
                setXpos(prev => prev - settings.block)
                break;
            default: break;
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", onKeyDownHandler)
        return () => {
            window.removeEventListener("keydown", onKeyDownHandler)
        }
    }, [])

    return (
        <Container
            x={xPos}
            y={yPos}
        >
            player
        </Container>
    )
}

export default Player
