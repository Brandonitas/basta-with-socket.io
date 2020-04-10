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

    socket.on('disconnect', () =>{
        console.log("User disconnected");
    });
    
})



server.listen(3000, ()=>{
    console.log("Server up on port 3000");
});

//Socket io