const constants = require('../utils/constants');

async function handleRequest({ res, handle, extractOutput }) {
  try {
    const result = await handle();
    if (result.error) {
      res
        .status(result.error.statusCode || constants.statusCodes.ise)
        .send({ message: result.error.message });
      return;
    }
    if (extractOutput) {
      res.status(constants.statusCodes.ok).send(await extractOutput(result.outputs));
    } else {
      res.sendStatus(constants.statusCodes.ok);
    }
  } catch (error) {
    console.error('error:', error);
    res.sendStatus(constants.statusCodes.ise);
  }
}

module.exports = {
  handleRequest,
};
