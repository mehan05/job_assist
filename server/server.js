import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
    }
})

io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);
    socket.on("disconnect", () => {
        console.log("user disconnected");
    })
    socket.on("join_workspace", (workspacename) => {
        socket.join(workspacename);
        console.log(`User with ID: ${socket.id} joined room: ${workspacename}`);
    })

    socket.on("send_message",({roomname,data})=>{
        console.log(data);
        socket.to(roomname).emit("message",data);
    })

    socket.on("leave_room",(workspacename)=>{ 
        socket.leave(workspacename);
        console.log("User with ID: ${socket.id} left room: ${workspacename}");

        socket.to(workspacename).emit("user_left",socket.id);
    })

})

server.listen(3001, () => {
    console.log("WS server is running on port 3001");
})