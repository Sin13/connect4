const { handleWSRequest } = require('./handler');
const aiService = require('../models/ai/ai.service');

async function playGame(socket, data) {
  const { game, humanMove } = data;
  const handle = async () => aiService.play(game, humanMove);
  return handleWSRequest({ socket, handle });
}

exports.handler = playGame;
