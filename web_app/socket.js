const { handler: createGame } = require('./controllers/createGame');
const { handler: playGame } = require('./controllers/playGame');

function setListeners(io) {
  try {
    io.on('connection', async (socket) => {
      console.log('a user connected');
      const game = (await createGame(socket)).outputs;
      console.log('game started.');
      socket.on('play', async (humanMove, callback) => {
        console.log('🚀 ~ humanMove', humanMove);
        if (!game.canPlay(humanMove)) {
          callback({ error: "can't play this move" });
          return;
        }
        // play as human
        await playGame(socket, { game, humanMove });
        if (game.gameOver) {
          socket.emit('game over', game.winner);
          return;
        }
        // play as AI
        const aiMove = (await playGame(socket, { game })).outputs;
        console.log('🚀 ~ aiMove', aiMove);
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
