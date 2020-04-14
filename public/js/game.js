let socket = io();

let resultados = {
    char: '',
    nombre: '',
    color: '',
    fruto: '',
    objeto: '',
    lugar: '',
    animal: ''
}

let char = '';

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
    /*if(users.length > 2){
        alert("No pueden estar más de 2 usuarios en una sala. Intenta ingresas a otra sala o crea tu sala.")
        window.location.href = '/';
    }*/

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
        
    }else{
        document.getElementById("play-btn").style.display ='none';
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


document.querySelector("#play-btn").addEventListener('click', (e)=>{
    e.preventDefault();
    console.log("Click en btn play");

    socket.emit("playBtn", true);
});

socket.on("startGame", (character)=>{
    document.getElementById("final-countdown").innerHTML = "";
    document.getElementById("winner").innerHTML = '';
    document.getElementById("character").innerHTML = '';
    char = '';
    document.getElementById('nombre').value = '';
    document.getElementById('color').value = '';
    document.getElementById('fruto').value = '';
    document.getElementById('objeto').value = '';
    document.getElementById('lugar').value = '';
    document.getElementById('animal').value = '';

    char = character;
    console.log("YA REGRESÉ");
    var timeleft = 5;
    var countDownTimer = setInterval(function(){
    if(timeleft <= 0){
        clearInterval(countDownTimer);
        startGame(char);

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

        endGame();

    } else {
        document.getElementById("final-countdown").innerHTML = "El jugador: "+user+" ha dicho BASTA, tienes " + timeleft +" segundos para terminar";
    }
    timeleft -= 1;
    }, 1000);
});


socket.on('showResults', (user, results) =>{
    console.log("El usuario es:", user);
    console.log("Sus resultados fueron:", results);
})

socket.on('endGame', (winner)=>{
    document.getElementById("winner").innerHTML = winner;
})

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

endGame= ()=>{
    resultados.char = char;
    resultados.nombre = document.getElementById('nombre').value;
    resultados.color = document.getElementById('color').value;
    resultados.fruto = document.getElementById('fruto').value;
    resultados.objeto = document.getElementById('objeto').value;
    resultados.lugar = document.getElementById('lugar').value;
    resultados.animal = document.getElementById('animal').value;
    console.log("RESULTADOS", resultados);
    socket.emit('endGame', resultados);
}



//socket emit mando el evento
//socket on espero a recibir 