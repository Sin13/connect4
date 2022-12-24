const { handleWSRequest } = require('./handler');
const aiService = require('../models/ai/ai.service');

async function createGame(socket) {
  const handle = async () => aiService.createGame();
  return handleWSRequest({ socket, handle });
}

exports.handler = createGame;
