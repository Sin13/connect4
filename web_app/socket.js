const { handler: createGame } = require('./controllers/createGame');
const { handler: playGame } = require('./controllers/playGame');

function setListeners(io) {
  try {
    io.on('connection', async (socket) => {
      console.log('a user connected');
      const game = (await createGame(socket)).outputs;
      console.log('game started.');
      socket.on('play', async (humanMove, callback) => {
        if (game.gameOver) {
          socket.emit('game over', game.winner);
          return;
        }
        if (!game.canPlay(humanMove)) {
          callback({ error: "can't play this move" });
          return;
        }
        const aiMove = (await playGame(socket, { game, humanMove })).outputs;
        console.log('🚀 ~ file: socket.js ~ line 19 ~ socket.on ~ aiMove', aiMove);
        callback({ aiMove });
        if (game.gameOver) {
          socket.emit('game over', game.winner);
        }
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
