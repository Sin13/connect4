const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const socket = require('./socket');

const port = 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));

socket.setListeners(io);

app.get('/', (req, res) => {
  res.render('index', { foo: 'FOO' });
});

server.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
