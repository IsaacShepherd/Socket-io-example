let socket = io();

let messages = document.getElementById('messages');
let form = document.getElementById('form');
let input = document.getElementById('input');


form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
    }
});
// выводим сообщение на экран
socket.on('chat message', function(msg) {
    let item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
//делаем из ключевого слова ссылку, по которой можно скачать файл
socket.on('add link', (msg)=> {
    let link = document.createElement('a');
    link.setAttribute('href', msg);
    link.setAttribute('download','')
    link.textContent = msg;       
    messages.appendChild(link);
    window.scrollTo(0, document.body.scrollHeight);
});




   
    


  

   
  
