let board
const game = new Chess()

function gameOver(game, possibleMoves) {
  return (
    game.game_over() === true ||
    game.in_draw() === true ||
    possibleMoves.length === 0
  )
}

function makeRandomMove() {
  const possibleMoves = game.moves()

  if (gameOver(game, possibleMoves)) return;

  const randomIndex = Math.floor(Math.random() * possibleMoves.length)
  game.move(possibleMoves[randomIndex])
  board.position(game.fen())

  window.setTimeout(makeRandomMove, 500)
}

board = ChessBoard('board', 'start')

window.setTimeout(makeRandomMove, 500)
