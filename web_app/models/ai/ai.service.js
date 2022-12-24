const { Connect4AI } = require('connect4-ai');
const constants = require('../../utils/constants');

async function createGame() {
  try {
    const game = new Connect4AI();
    return {
      success: true,
      outputs: game,
    };
  } catch (error) {
    console.error('error:', error.message);
    return {
      error: {
        statusCode: constants.statusCodes.ise,
      },
    };
  }
}

async function play(game, humanMove) {
  try {
    game.play(humanMove);
    const aiMove = game.playAI('hard');
    return {
      success: true,
      outputs: aiMove,
    };
  } catch (error) {
    console.error('error:', error.message);
    return {
      error: {
        statusCode: constants.statusCodes.ise,
      },
    };
  }
}

module.exports = {
  play,
  createGame,
};
