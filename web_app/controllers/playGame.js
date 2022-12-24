const { handleWSRequest } = require('./handler');
const aiService = require('../models/ai/ai.service');

async function playGame(socket, data) {
  const { game, humanMove } = data;
  const handle = async () => aiService.play(game, humanMove);
  const response = {
    msg: 'ai play',
    extractOutputs: async (outputs) => outputs,
  };
  return handleWSRequest({ socket, response, handle });
}

exports.handler = playGame;
