const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const keywords = require('./keywords');
const io = new Server(server);

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'public/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  io.emit('chat message', 'Choose photo to download')
  io.emit('chat message', 'Type  - cat , dog or flower')
});

server.listen(3000, () => {
  console.log('listening on *:3000');
}); 

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    const urls = keywords[msg];
    if (urls) {
      urls.forEach(element => {
        socket.emit('add link', element)
        io.emit('chat message', '---------------')
      });
    }
    else{
      io.emit('chat message', 'No keywords found')
    }    
  });  
});