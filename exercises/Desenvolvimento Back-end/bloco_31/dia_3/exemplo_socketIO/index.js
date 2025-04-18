const express = require('express');
const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
    cors: {
      origin: 'http://localhost:3000', // url aceita pelo cors
      methods: ['GET', 'POST'], // Métodos aceitos pela url
}});

io.on('connection', (socket) => { //executa sempre que um cliente se conectar no servidor
  console.log(`Usuário conectado. ID: ${socket.id} `);

  //mandar uma mensagem para o cliente assim que ele se conectar:
  socket.emit('ola', 'Que bom que você chegou aqui! Fica mais um cadin, vai ter bolo :)');

    socket.on('ping', () => {
        console.log(`${socket.id} emitiu um ping!`);
        io.emit('pong', `${socket.id} enviou um ping!`)
    });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});