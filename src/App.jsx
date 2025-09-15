import { useState, useEffect } from 'react'
import GameBoard from './components/GameBoard/GameBoard'
import Controls from './components/Controls/Controls'
import Status from './components/Status/Status'
import './App.css'

function App() {
  const [numPlayers, setNumPlayers] = useState(2)
  const [numBombs, setNumBombs] = useState(2)
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [gameStarted, setGameStarted] = useState(false)
  const [cells, setCells] = useState([])
  const [gameStatus, setGameStatus] = useState('waiting') // waiting, playing, bomb, win
  const [statusMessage, setStatusMessage] = useState('')

  const totalCells = numPlayers * 5


  const generateField = () => {
    const newCells = Array.from({ length: totalCells }, (_, index) => ({
      id: index,
      isBomb: false,
      isRevealed: false
    }))

   
    const bombPositions = []
    while (bombPositions.length < Math.min(numBombs, totalCells - 1)) {
      const position = Math.floor(Math.random() * totalCells)
      if (!bombPositions.includes(position)) {
        bombPositions.push(position)
        newCells[position].isBomb = true
      }
    }

    setCells(newCells)
  }

  
  const startGame = () => {
    generateField()
    setCurrentPlayer(1)
    setGameStarted(true)
    setGameStatus('playing')
    setStatusMessage('')
  }


  const resetGame = () => {
    generateField()
    setCurrentPlayer(1)
    setGameStatus('playing')
    setStatusMessage('')
  }


  const handleCellClick = (cellId) => {
    if (gameStatus !== 'playing') return

    const newCells = [...cells]
    const clickedCell = newCells[cellId]

    if (clickedCell.isRevealed) return

    clickedCell.isRevealed = true

    if (clickedCell.isBomb) {
   
      setGameStatus('bomb')
      setStatusMessage('💥 Бомба! Игра начинается заново')
      setCells(newCells)
      
    
      setTimeout(() => {
        resetGame()
      }, 2000)
    } else {
  
      setCells(newCells)
      

      const safeCells = newCells.filter(cell => !cell.isBomb)
      const revealedSafeCells = safeCells.filter(cell => cell.isRevealed)
      
      if (revealedSafeCells.length === safeCells.length) {
        setGameStatus('win')
        setStatusMessage('🎉 Все выиграли!')
      } else {
  
        setCurrentPlayer(prev => prev === numPlayers ? 1 : prev + 1)
      }
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">🎮 Бомбочки</h1>
        
        <Controls 
          numPlayers={numPlayers}
          setNumPlayers={setNumPlayers}
          numBombs={numBombs}
          setNumBombs={setNumBombs}
          onStartGame={startGame}
          gameStarted={gameStarted}
          totalCells={totalCells}
        />

        {gameStarted && (
          <>
            <Status 
              currentPlayer={currentPlayer}
              gameStatus={gameStatus}
              statusMessage={statusMessage}
              numPlayers={numPlayers}
            />
            
            <GameBoard 
              cells={cells}
              onCellClick={handleCellClick}
              numPlayers={numPlayers}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default App