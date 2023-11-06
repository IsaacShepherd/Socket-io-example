let socket = io();

let messages = document.getElementById('messages');
let form = document.getElementById('form');
let input = document.getElementById('input');


// function getUrls() {
//     const keyword = input.value;
//     socket.emit()
//   }

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
    }
});

socket.on('chat message', function(msg) {
    let item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('add link', (msg)=> {
    let link = document.createElement('span');
    link.setAttribute('href', msg);
    link.textContent = msg;
    /* function downloadFile() {
        let neededUrl = link.textContent
        console.log(neededUrl);
        } */
       
    messages.appendChild(link);
    window.scrollTo(0, document.body.scrollHeight);
});




   
    


  

   
  
