import React, { useState, useEffect } from 'react'
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
    background: #3d3c3c;
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
    }};
    display: flex;
    align-items: center;
    justify-content: center;
`
const Food = styled.div`
    width: .6rem;
    height: .6rem;
    background: white;
    border-radius: 50%;
`

const BoardNode = props => {

    const { settings } = props

    const cols = settings.width / settings.block
    const rows = settings.height / settings.block

    const getNumberOfBlocks = () => {
        return cols * rows
    }

    const nb = getNumberOfBlocks()
    
    const initialFoods = {}

    for(let i = 0; i < nb; i++){
        const x = i < cols ? i :  Math.floor(i % cols)
        const y = i < cols ? 0 : Math.floor(i / cols)
        initialFoods[`x${x}y${y}`] = {
            active: true,
            x,
            y
        }
    }

    const [foods, setFoods] = useState(initialFoods)


    const [xPos, setXpos] = useState(-5)
    const [yPos, setYpos] = useState(0)
    const [direction, setDirection] = useState("right")

    useEffect(() => {

        const updatedX = xPos / 5
        const updatedY = yPos / 5

        if(foods[`x${updatedX}y${updatedY}`] && foods[`x${updatedX}y${updatedY}`].active){
            const updatedFoods = {
                ...foods,
                [`x${updatedX}y${updatedY}`]: {
                    ...foods[`x${updatedX}y${updatedY}`],
                    active: false
                }
            }
            setFoods(updatedFoods)
        }
    }, [xPos, yPos])

    return (

        <Container>
            <Board>
                {Object.keys(foods).map(food => (
                    <Block
                        key={food}
                        id={food}
                        size={settings.block}
                    >   
                        {foods[food].active && (
                            <Food />
                        )}
                    </Block>
                ))}
                <Player
                    settings={settings}
                    xPos={xPos}
                    setXpos={setXpos}
                    yPos={yPos}
                    setYpos={setYpos}
                    direction={direction}
                    setDirection={setDirection}
                />
            </Board>
        </Container>
    )
}

export default BoardNode
