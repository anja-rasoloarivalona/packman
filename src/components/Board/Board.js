import React from 'react'
import styled from 'styled-components'
import Player from '../Player/Player'


const Container = styled.div`
    ${props => {
        return {
            width: `calc(${props.theme.settings.width}rem + 4px)`,
            height: `calc(${props.theme.settings.height}rem + 4px)`,
        }
    }}
    position: relative;
    border: 2px solid grey;
    border-radius: .3rem;
`

const Board = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0,0,0, .5);
    display: grid;

    ${props => {
        return {
            width: `${props.theme.settings.width}rem`,
            height: `${props.theme.settings.height}rem`,
            gridTemplateColumns: `repeat(auto-fit, ${props.theme.settings.block}rem)`
        }
    }}
`
const Block = styled.div`
    ${props => {
        return {
            width: `${props.theme.settings.size}rem`,
            height: `${props.theme.settings.size}rem`
        }
    }}
`


const BoardNode = props => {

    const { settings } = props

    const getNumberOfBlocks = () => {
        const cols = settings.width / settings.block
        const rows = settings.height / settings.block
        return cols * rows
    }

    const renderBlocks = () => {
        const nbBlocks = getNumberOfBlocks()
        const blockArrays = []
        for(let i = 0; i < nbBlocks; i++){
            blockArrays.push(
                <Block key={i} size={settings.block}/>
            )
        }
        return blockArrays
    }


    return (

        <Container>
            <Board>
                {renderBlocks()}
                <Player settings={settings}/>
            </Board>
        </Container>
    )
}

export default BoardNode
