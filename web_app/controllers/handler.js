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

async function handleWSRequest({ socket, handle, response }) {
  try {
    const result = await handle();
    if (result.error) {
      socket.emit('error', result.error);
      socket.disconnect();
      return result.error;
    }
    if (response) {
      socket.emit(response.msg, await response.extractOutputs(result.outputs));
    }
    return result;
  } catch (error) {
    console.log('error: ', error);
    return error;
  }
}

module.exports = {
  handleRequest,
  handleWSRequest,
};
