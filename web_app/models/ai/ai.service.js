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
    console.error('error:', error);
    return {
      error: {
        statusCode: constants.statusCodes.ise,
      },
    };
  }
}

async function playHuman(game, humanMove) {
  try {
    game.play(humanMove);
    return {
      success: true,
    };
  } catch (error) {
    console.error('error:', error);
    return {
      error: {
        statusCode: constants.statusCodes.ise,
      },
    };
  }
}

async function playAI(game) {
  try {
    const aiMove = game.playAI('hard');
    return {
      success: true,
      outputs: aiMove,
    };
  } catch (error) {
    console.error('error:', error);
    return {
      error: {
        statusCode: constants.statusCodes.ise,
      },
    };
  }
}

module.exports = {
  playHuman,
  playAI,
  createGame,
};
