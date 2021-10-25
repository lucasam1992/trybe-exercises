const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('clientMessage', inputMessage.value);
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
    const messagesUl = document.querySelector('#messages');
    const li = document.createElement('li');
    li.innerText = message;
    messagesUl.appendChild(li);
};
  
socket.on('serverMessage', (message) => createMessage(message)); //detecta quando o evento ServerMessage é disparado pelo back-end. 
// Dispara a função createMessage, colocando a mensagem no front