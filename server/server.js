const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '/../public');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);


app.use(express.static(publicPath));


//Liste event
io.on('connection', (socket)=>{
    console.log("New user connected");


    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Bienvenido al juego',
        createdAt: new Date().getTime
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'Un nuevo usuario se unio al juego',
        createdAt: new Date().getTime
    });



    socket.on('message', (message) =>{
        console.log("message", message);
        //io es para todos los conectados y socket es para cada uno individual
        io.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })

        //socket broadcast manda mensaje menos a la permisa que hizo el emit

    })

    socket.on('disconnect', () =>{
        console.log("User disconnected");
    });
    
})



server.listen(3000, ()=>{
    console.log("Server up on port 3000");
});

//Socket io