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
  handleWSRequest,
};
