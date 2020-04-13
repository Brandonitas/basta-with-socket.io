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
    if(users.length > 2){
        alert("No pueden estar más de 2 usuarios en una sala. Intenta ingresas a otra sala o crea tu sala.")
        window.location.href = '/';
    }

    let ol = document.createElement('ol');
    users.forEach((user) =>{
        let li = document.createElement('li');
        li.innerHTML = user;
        ol.appendChild(li);
    });
    let userList = document.querySelector('#users');
    userList.innerHTML = "";
    userList.appendChild(ol);

    if(users.length == 2){
        //startGame();
        document.getElementById("play-btn").style.display ='block';
        
    }
    
});

socket.on('roomNumber', (room) =>{
    console.log("Room: ",room);
    let p = document.createElement('p');
    p.innerHTML = "El nombre de tu sala es: <br> <strong>"+room+"</strong>";
    let roomName = document.querySelector('#roomNumberName');
    roomName.innerHTML = "";
    roomName.appendChild(p);
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
        text: document.getElementById('mensaje').value
    }, () =>{

    })
})

document.querySelector("#play-btn").addEventListener('click', (e)=>{
    e.preventDefault();
    console.log("Click en btn play");

    socket.emit("playBtn", true);
});

socket.on("startGame", (character)=>{
    console.log("YA REGRESÉ");
    var timeleft = 5;
    var countDownTimer = setInterval(function(){
    if(timeleft <= 0){
        clearInterval(countDownTimer);
        startGame(character);

    } else {
        document.getElementById("countdown").innerHTML = "El juego comenzará en: " + timeleft;
    }
    timeleft -= 1;
    }, 1000);
})

socket.on('basta', (user) =>{
    var timeleft = 10;
    var countDownTimer = setInterval(function(){
    if(timeleft <= 0){
        clearInterval(countDownTimer);
        document.getElementById("final-countdown").innerHTML = "TIEMPO";
        document.getElementById("game-form").style.display = "none";
    } else {
        document.getElementById("final-countdown").innerHTML = "El jugador: "+user+" ha dicho BASTA, tienes " + timeleft +"segundos para terminar";
    }
    timeleft -= 1;
    }, 1000);
});



document.querySelector("#basta-btn").addEventListener('click', (e)=>{
    e.preventDefault();
    console.log("BASTA");
    socket.emit("basta");
});


startGame = (character) =>{
    document.getElementById("countdown").innerHTML = "EMPIEZA";
    document.getElementById("game-form").style.display = "block";
    //let character = getCharacter();
    document.getElementById("character").innerHTML = "La letra es: "+character;
}



//socket emit mando el evento
//socket on espero a recibir 