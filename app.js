const express = require('express')
const app = express();
const socket = require('socket.io');
const cors = require('cors');
app.use(cors({
    origin:"http://localhost:5173"
}));
const server = app.listen(5100,()=>{
    console.log("Server running at http://localhost:5100")
})

const io = socket(server);
var users=[];
app.get('/',async(req,res)=>{
    res.json("working server")
})
io.on('connection',function(socket){
    console.log(socket.id+"user connected")
    socket.on('msg', function (data) {
        console.log("user sent message: ", data);  // Log the message data
        io.emit('msg', data);  // Broadcast the message to all clients
    });
    socket.on('disconnect',function(){
        console.log("user disconnected ");
        users.pop();
    })
})