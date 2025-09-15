import './Controls.css'

function Controls({ 
  numPlayers, 
  setNumPlayers, 
  numBombs, 
  setNumBombs, 
  onStartGame, 
  gameStarted,
  totalCells 
}) {
  const maxBombs = Math.max(1, totalCells - 1)

  return (
    <div className="controls">
      <div className="controls-grid">
        <div className="control-group">
          <label htmlFor="players">Количество игроков:</label>
          <select 
            id="players"
            value={numPlayers} 
            onChange={(e) => setNumPlayers(Number(e.target.value))}
            disabled={gameStarted}
          >
            <option value={1}>1 игрок</option>
            <option value={2}>2 игрока</option>
            <option value={3}>3 игрока</option>
            <option value={4}>4 игрока</option>
            <option value={5}>5 игроков</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="bombs">Количество бомб:</label>
          <select 
            id="bombs"
            value={numBombs} 
            onChange={(e) => setNumBombs(Number(e.target.value))}
            disabled={gameStarted}
          >
            {Array.from({ length: Math.min(10, maxBombs) }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} {i === 0 ? 'бомба' : i < 4 ? 'бомбы' : 'бомб'}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group info">
          <span className="info-text">
            Всего ячеек: <strong>{totalCells}</strong>
          </span>
        </div>
      </div>

      <button 
        className="start-button"
        onClick={onStartGame}
      >
        {gameStarted ? '🔄 Новая игра' : '🚀 Начать игру'}
      </button>
    </div>
  )
}

export default Controls