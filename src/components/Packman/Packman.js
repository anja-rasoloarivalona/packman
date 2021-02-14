import React from 'react'
import './Packman.css'
import styled from 'styled-components'

const setRotation = direction => {
    switch (direction){
        case "right": return "rotate(0deg)";
        case "left": return " scale(-1, 1)";
        case "up": return "rotate(-90deg)";
        case "down": return "rotate(90deg)";
        default: break
    }
}

const Container = styled.div`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: #F2D648;
    position: relative;
    transform: ${props => setRotation(props.direction)}
`

const Packman = props => {
    const { direction } = props
    return (
        <Container direction={direction}>
            <div class="pacman__eye"></div>
            <div class="pacman__mouth"></div>
        </Container>
    )
}

export default Packman