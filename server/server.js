const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {isRealString} = require('./utils/isRealString');
const {Users} = require('./utils/users');
const {Answer} = require('./utils/answers');
const {Winner} = require('./utils/winner');

const publicPath = path.join(__dirname, '/../public');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();
let answer = new Answer();
let winner = new Winner();

app.use(express.static(publicPath));

let connectCounter = 0;

//on escucha los mensajes que le lleguen del front, recibe un socket
io.on('connection', (socket)=>{
    
    connectCounter++;
    console.log("Usuarios conectados", connectCounter);
    console.log("New user connected");

    //Vamos a estar escuchando si entra a un nuevo room
    socket.on('join', (params, callback) =>{
         //Nos falta validar que sean string los inputs
         if(!isRealString(params.name) || !isRealString(params.room)){
             return callback('Nombre y room son requeridos');
         }

         console.log("Socket id", socket.id);
         socket.join(params.room);
        
         users.removeUser(socket.id);
         users.addUser(socket.id, params.name, params.room);

         if(users.getUserList(params.room).length > 2){
             return callback('Sala llena');
         }

         //Con emit le aviso al front end
         io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
         io.to(params.room).emit('roomNumber', params.room);

        callback();
    });
    
    socket.on('disconnect', () =>{
        console.log("User disconnected");
        let user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
        }
        connectCounter--;
        console.log("Usuarios conectados", connectCounter);
    });

    socket.on('playBtn', (startGame) =>{
        console.log("Btn del lado del servidor");
        let user = users.getUser(socket.id);
        if(startGame){
            console.log("Entre al if del lado del servidor y el room es:" + user.room);
            let character = getCharacter()
            io.to(user.room).emit('startGame', character);
        }
    });

    socket.on('basta', () =>{
        console.log("BASTA del lado del server");
        let user = users.getUser(socket.id);
        io.to(user.room).emit('basta',user.name);
    });

    socket.on('endGame', (resultados) =>{
        let user = users.getUser(socket.id);
        //console.log("Usuario",user.name);
        //console.log("Resultados",resultados);

        answer.addAnswer(resultados.char,socket.id, user.name, user.room, resultados.nombre,resultados.color,resultados.fruto,resultados.objeto,resultados.lugar,resultados.animal)
        if(answer.getAnswerList(user.room).length == 2){
            let winnerResult = winner.getWinner(answer.getAnswerList(user.room));
            console.log(winnerResult);
            io.to(user.room).emit('endGame', winnerResult);
        }
        //let winner = calculateWinner(resultadosToCompare);        
    })
    
})


getCharacter = () =>{
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    result = characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
}

server.listen(3000, ()=>{
    console.log("Server up on port 3000");
});
