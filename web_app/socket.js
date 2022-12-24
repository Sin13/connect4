const { handler: createGame } = require('./controllers/createGame');
const { handler: playGame } = require('./controllers/playGame');

function setListeners(io) {
  try {
    io.on('connection', async (socket) => {
      console.log('a user connected');
      const game = await createGame(socket);
      console.log('game started.');
      socket.join(socket.id); // remove this
      socket.on('human play', async (humanMove) => {
        const aiMove = await playGame(game, humanMove);
        console.log('sid: ', socket.id);
        socket.emit('ai play', aiMove); // add to()
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
