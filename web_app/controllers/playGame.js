const aiService = require('../models/ai/ai.service');

async function playGame(game, humanMove) {
  const result = await aiService.play(game, humanMove);
  return result.outputs;
}

exports.handler = playGame;
