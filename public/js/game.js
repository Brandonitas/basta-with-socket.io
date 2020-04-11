let socket = io();

socket.on('connect', () =>{
    console.log("Connected to server");

    let searchQuery = window.location.search.substring(1);
    let params = JSON.parse('{"'+decodeURI(searchQuery).replace(/&/g, '","').replace(/\+/g,'').replace(/=/g,'":"')+'"}');

    socket.emit('join', params, (error) =>{
        if(error){
            alert(error);
            window.location.href = '/';
        }else{
            console.log("No hay error");
        }
    })
});

socket.on('disconnect', () =>{
    console.log("Disconnected from server");
});

socket.on('updateUsersList', (users) =>{
    console.log(users);
    let ol = document.createElement('ol');
    users.forEach((user) =>{
        let li = document.createElement('li');
        li.innerHTML = user;
        ol.appendChild(li);
    });
    let userList = document.querySelector('#users');
    userList.innerHTML = "";
    userList.appendChild(ol);
})

socket.on('newMessage', (message)=>{
    console.log("newMessage", message);
    let li = document.createElement('li');
    li.innerText = `${message.from} : ${message.text}`

    document.querySelector('body').appendChild(li);
});

socket.emit('message', {
    
    text: "Texto"
}, ()=>{
    console.log("Server obtuvo el mensaje")
});

document.querySelector("#submit-bnt").addEventListener('click', (e)=>{
    e.preventDefault();

    socket.emit("message", {
        from: "User",
        text: document.querySelector('input[name="message"]').value
    }, () =>{

    })
})

