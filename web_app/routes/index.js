const router = require('express').Router();

const { handler: aiPlayController } = require('../controllers/aiPlay');

router.get('/ai/play', aiPlayController);

module.exports = router;
