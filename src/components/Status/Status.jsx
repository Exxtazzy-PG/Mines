import './Status.css'

function Status({ currentPlayer, gameStatus, statusMessage, numPlayers }) {
  const getStatusContent = () => {
    if (gameStatus === 'bomb') {
      return (
        <div className="status-message bomb-message">
          {statusMessage}
        </div>
      )
    }
    
    if (gameStatus === 'win') {
      return (
        <div className="status-message win-message">
          {statusMessage}
        </div>
      )
    }
    
    if (gameStatus === 'playing') {
      return (
        <div className="current-player">
          <span className="player-label">Ход игрока</span>
          <span className="player-number">#{currentPlayer}</span>
          <span className="player-info">из {numPlayers}</span>
        </div>
      )
    }
    
    return null
  }

  return (
    <div className="status">
      {getStatusContent()}
    </div>
  )
}

export default Status