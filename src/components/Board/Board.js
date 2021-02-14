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
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    
    ${props => {
        return {
            width: `${props.theme.settings.block}rem`,
            height: `${props.theme.settings.block}rem`
        }
    }};


    ${props => {
        const { border } = props

        if(border !== "none"){

            let data = {}

            if(border === "top"){
                data = {
                    width: "100%",
                    top: 0,
                    left: 0,
                    height: "1px"
                }
            }

            if(border === "bottom"){
                data = {
                    width: "100%",
                    bottom: "-1px",
                    left: 0,
                    height: "1px"
                }
            }


            
            if(border === "left"){
                data = {
                    width: "1px",
                    top: 0,
                    left: 0,
                    height: "100%"
                }
            }

            if(border === "right"){
                data = {
                    width: "1px",
                    top: 0,
                    right: "-1px",
                    height: "100%"
                }
            }

            return {
                "& .bar": {
                    position: "absolute",
                    background: "grey",
                    ...data
                }
            }
        }
    }}

`
const Food = styled.div`
    width: .6rem;
    height: .6rem;
    background: white;
    border-radius: 50%;
`

const Bar = styled.div``


const barGenerator = {
    1: "top",
    2: "right",
    3: "bottom",
    4: "left"
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log("init", getRandomInt(1, 4))


const BoardNode = props => {

    const { settings } = props

    const cols = settings.width / settings.block // 24
    const rows = settings.height / settings.block // 16

    const getNumberOfBlocks = () => {
        return cols * rows
    }

    const nb = getNumberOfBlocks()

    const forbiddenBorders = ["x0", `y0`, `x${cols-1}`, `y${rows-1}`]
    
    const initialFoods = {}

    for(let i = 0; i < nb; i++){

        const x = i < cols ? i :  Math.floor(i % cols)
        const y = i < cols ? 0 : Math.floor(i / cols)

        let border = "toSet"

        forbiddenBorders.forEach(forbid => {
            if(`x${x}` === forbid || `y${y}` === forbid){
                border = "none"
            }
        })

        if(border === "toSet"){
            border = barGenerator[getRandomInt(1, 4)]
        }

        initialFoods[`x${x}y${y}`] = {
            active: true,
            x,
            y,
            border
        }
    }

    console.log({
        initialFoods
    })

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
                        {...foods[food]}
                    >   
                        {foods[food].active && (
                            <Food />
                        )}
                        {foods[food].border !== "none" && (
                            <Bar className="bar"/>
                        )}
                        {/* x{foods[food].x}
                        y{foods[food].y} */}
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
