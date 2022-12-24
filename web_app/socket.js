const { handler: createGame } = require('./controllers/createGame');
const { handler: playGame } = require('./controllers/playGame');

function setListeners(io) {
  try {
    io.on('connection', async (socket) => {
      console.log('a user connected');
      const game = (await createGame(socket)).outputs;
      console.log('game started.');
      socket.on('human play', async (humanMove) => {
        await playGame(socket, { game, humanMove });
        console.log('sid: ', socket.id);
        console.log(game.ascii());
      });
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
    return {
      success: true,
    };
  } catch (error) {
    console.error('error:', error.message);
    return {
      error: {
        message: 'socket.io initialization failed',
      },
    };
  }
}

module.exports = {
  setListeners,
};
