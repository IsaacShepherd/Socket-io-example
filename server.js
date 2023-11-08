const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const keywords = require('./keywords'); // модуль с ключевыми словами и ссылками на них
const io = new Server(server);

app.use(express.static('public'))
app.use(express.static('img'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'public/index.html');
});

// при запросе к папке img выдать запршиваемый файл
app.get(/img\/.*/, (req, res) => {
  console.log(req.path);
  res.sendFile(__dirname +req.path);
  console.log(__dirname + req.path);
});
//приветсвенные сообщения
io.on('connection', (socket) => {
  console.log('a user connected');
  io.emit('chat message', 'Choose photo to download')
  io.emit('chat message', 'Type  - cat , dog or flower')
});



io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    const urls = keywords[msg];
    if (urls) { // если в сообщении есть ключевое слово, отправляем клиенту, чтобы тот сделал из него ссылку
      io.emit('chat message', `Here are some ${msg}s that we have. Click link to download.`);
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

server.listen(3000, () => {
  console.log('listening on *:3000');
}); 