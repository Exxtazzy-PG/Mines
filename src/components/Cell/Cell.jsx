import './Cell.css'

function Cell({ cell, onClick }) {
  const getCellContent = () => {
    if (!cell.isRevealed) return ''
    if (cell.isBomb) return '💣'
    return '✅'
  }

  const getCellClass = () => {
    let className = 'cell'
    if (cell.isRevealed) {
      className += cell.isBomb ? ' cell-bomb' : ' cell-safe'
    }
    return className
  }

  return (
    <button
      className={getCellClass()}
      onClick={onClick}
      disabled={cell.isRevealed}
    >
      {getCellContent()}
    </button>
  )
}

export default Cell