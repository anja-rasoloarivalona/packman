import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    background: red;
    position: absolute;
    z-index: 5;
    left: 0;
    bottom: 0;
    ${props => {
        console.log({
            props
        })
        return {
            width: `${props.theme.settings.block}rem`,
            height: `${props.theme.settings.block}rem`,
        }
    }};
    display: flex;
    align-items: center;
    justify-content: center;
`

const Player = () => {
    return (
        <Container>
            player
        </Container>
    )
}

export default Player
