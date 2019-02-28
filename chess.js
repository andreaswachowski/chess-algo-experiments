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

  if (gameOver(game, possibleMoves)) return

  const randomIndex = Math.floor(Math.random() * possibleMoves.length)
  game.move(possibleMoves[randomIndex])
  board.position(game.fen())

  window.setTimeout(makeRandomMove, 500)
}

function miniMaxDecision(game) {
  const possibleMoves = game.moves()
  let maxUtility = -Infinity
  let move, maxMove
  let depth = 0
  for (move of possibleMoves) {
    game.move(move)
    const utility = minValue(game, depth + 1)
    if (utility > maxUtility) {
      maxUtility = utility
      maxMove = move
    }
    game.undo(move)
  }
  return maxMove;
}

function minValue(game, depth) {
  if (terminalTest(game, depth)) {
    return utility(game);
  }
  let minUtility  = Infinity;
  const possibleMoves = game.moves()
  for (move of possibleMoves) {
    game.move(move)
    const max = maxValue(game, depth + 1)
    if (max < minUtility) {
      minUtility = max
    }
    game.undo(move)
  }
  return minUtility
}

function maxValue(game, depth) {
  if (terminalTest(game, depth)) {
    return utility(game);
  }
  let maxUtility = -Infinity;
  const possibleMoves = game.moves()
  for (move of possibleMoves) {
    game.move(move)
    const min = minValue(game, depth + 1)
    if (min > maxUtility) {
      maxUtility = min
    }
    game.undo(move)
  }
  return maxUtility
}

function terminalTest(game, depth) {
  return depth === 1
}

function utility(game) {
  return 1;
}

function makeMiniMaxMove() {
  const possibleMoves = game.moves()

  if (gameOver(game, possibleMoves)) return

  const move = miniMaxDecision(game)
  game.move(move)
  board.position(game.fen())

  window.setTimeout(makeMiniMaxMove, 500)
}

board = ChessBoard('board', 'start')

window.setTimeout(makeMiniMaxMove, 500)
