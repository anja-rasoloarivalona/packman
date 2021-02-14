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
    top: ${props => `${props.y}rem`};
`


const Player = props => {

    const { settings, xPos, setXpos, yPos, setYpos, direction, setDirection, foods} = props

    const forbiddenY = settings.height - settings.block
    const forbiddenX = settings.width - settings.block

    // console.log({
    //     foods
    // })

    const onKeyDownHandler = event => {

        const key = event.key.toLowerCase()
        const currentId = `x${Math.floor(xPos / 5)}y${Math.floor(yPos / 5)}`

        switch(key){
            case "arrowdown":
                if(yPos + settings.block <= forbiddenY){
                    const nextId = `x${Math.floor(xPos / 5)}y${Math.floor(yPos / 5) + 1}`
                    setDirection("down")
                    if(foods[nextId].border !== "top" && foods[currentId].border !== "bottom"){
                        setYpos(prev => prev + settings.block)
                    }
                }          
                break;
            case "arrowup":
                if(yPos >= settings.block){
                    const nextId = `x${Math.floor(xPos / 5)}y${Math.floor(yPos / 5) - 1}`
                    setDirection("up")

                    if(foods[nextId].border !== "bottom" && foods[currentId].border !== "top"){
                        setYpos(prev => prev - settings.block)
                    }
                }
                break;
            case "arrowright":
                if(xPos + settings.block <= forbiddenX){

                    setDirection("right")

                    const nextId = `x${Math.floor(xPos / 5) + 1}y${Math.floor(yPos / 5)}`

                    if(xPos < 0){
                        setXpos(prev => prev + settings.block)
                    } else if(foods[nextId].border !== "left"  && foods[currentId].border !== "right"){
                        setXpos(prev => prev + settings.block)
                    }                    
                }
                break;
            case "arrowleft":
                if(xPos >= settings.block){
                    setDirection("left")

                    const nextId = `x${Math.floor(xPos / 5) - 1}y${Math.floor(yPos / 5)}`

                    if(foods[nextId].border !== "right" && foods[currentId].border !== "left"){
                        setXpos(prev => prev - settings.block)
                    }   
                 
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
