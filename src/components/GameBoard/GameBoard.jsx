import Cell from '../Cell/Cell'
import './GameBoard.css'

function GameBoard({ cells, onCellClick, numPlayers }) {
  return (
    <div className="game-board">
      <div className={`board-grid players-${numPlayers}`}>
        {cells.map((cell) => (
          <Cell
            key={cell.id}
            cell={cell}
            onClick={() => onCellClick(cell.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default GameBoard