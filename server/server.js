const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage} = require('./utils/message');
const {isRealString} = require('./utils/isRealString');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '/../public');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

let connectCounter = 0;

//Liste event
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

         //Con emit le aviso al front end
         io.to(params.room).emit('updateUsersList', users.getUserList(params.room));




        //Mensaje le sale cada que se conecta el usuario
        socket.emit('newMessage', generateMessage('Admin', 'Bienvenido al juego en el room: '+params.room));

        //Mensaje le sale cada que se conecta el usuario a todos los demas
        socket.broadcast.emit('newMessage', generateMessage('Admin', 'Un nuevo usuario se unio al juego'));


         callback();
    });

    socket.on('message', (message, callback) =>{
        console.log("message", message);
        let user = users.getUser(socket.id);
        if(user && isRealString(message.text)){
            
        }
        //io es para todos los conectados y socket es para cada uno individual
        //io.emit('newMessage',generateMessage(message.from, message.text))
        io.to(user.room).emit('newMessage',generateMessage(user.name, message.text))
        //socket broadcast manda mensaje menos a la permisa que hizo el emit

        callback('Esto es el servidor');
    })

    
    socket.on('disconnect', () =>{
        console.log("User disconnected");
        let user = users.removeUser(socket.id);
        if(user){
            io.to(users.room).emit('updateUsersList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} ha dejado la sala: ${user.room}`));
        }
        connectCounter--;
        console.log("Usuarios conectados", connectCounter);
    });
    
})



server.listen(3000, ()=>{
    console.log("Server up on port 3000");
});

//Socket io