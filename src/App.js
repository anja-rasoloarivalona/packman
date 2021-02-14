import React from 'react'
import Board from './components/Board/Board'
import styled, { ThemeProvider } from 'styled-components'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #323131;
  display: flex;
  align-items: center;
  justify-content: center;
`

const App = () => {

  const settings = {
    width: 120,
    height: 80,
    block: 5,
}

  return (
    <ThemeProvider
      theme={{
        settings: {...settings}
      }}
    >
      <Container>
          <Board settings={settings}/>
      </Container>
    </ThemeProvider>
  )
}

export default App
