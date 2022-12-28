const { handleWSRequest } = require('./handler');
const aiService = require('../models/ai/ai.service');

async function playGame(socket, data) {
  const { game, humanMove } = data;
  const handle = async () => {
    if (humanMove !== undefined) {
      return aiService.playHuman(game, humanMove);
    }
    return aiService.playAI(game);
  };
  return handleWSRequest({ socket, handle });
}

exports.handler = playGame;
