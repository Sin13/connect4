const { handleRequest } = require('./handler');
const aiService = require('../models/ai/ai.service');

async function aiPlay(req, res) {
  const handle = async () => {
    const { game } = res.body;
    console.log(game);
    return aiService.play(game);
  };
  const extractOutput = async (outputs) => outputs;
  await handleRequest({ req, res, extractOutput, handle });
}

exports.handler = aiPlay;
