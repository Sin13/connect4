const { handleWSRequest } = require('./handler');
const aiService = require('../models/ai/ai.service');

async function createGame(socket) {
  const result = await aiService.createGame();
  return result.outputs;
  // const handle = async () => aiService.createGame();
  // const extractOutput = async (outputs) => outputs;
  // await handleWSRequest({ socket, extractOutput, handle });
}

exports.handler = createGame;
