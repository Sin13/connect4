const constants = require('../../utils/constants');
// const { Connect4 } = require('connect4-ai')

async function play() {
  try {
    console.log('played!');
    return {
      success: true,
    };
  } catch (error) {
    console.error('error:', error.message);
    return {
      error: {
        statusCode: constants.statusCodes.ise,
      },
    };
  }
}

module.exports = {
  play,
};
