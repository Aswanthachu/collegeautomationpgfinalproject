import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import {v4 as uuidv4} from "uuid";

const port = process.env.WEBSOCKET_PORT || 4000;
const app= express();
const server=http.createServer(app);

const io = new Server(server,{
    cors:{
      origin:"*",
      methods:["GET","POST"]
    }
});

const rooms={};


io.on('connection',(socket)=>{
    console.log("User connected");

    socket.on("create-room",()=>{
        const roomId=uuidv4();
        rooms[roomId]=[];
        socket.emit("room-created",{roomId});
    })

    socket.on("join-room",({roomId,peerId})=>{
        console.log("user joined the room");
        // console.log(roomId,peerId);
        if(rooms[roomId]){
            let checkUser=rooms[roomId].some(roomMember=>roomMember === peerId);
            console.log(checkUser);
            if(!checkUser && peerId){
               rooms[roomId].push(peerId);   
            }
            socket.emit("get-users",{
                roomId,
                participants: rooms[roomId]
            }) 
            socket.broadcast.emit("get-users",{
                roomId,
                participants: rooms[roomId]
            });
        }

        console.log(rooms)

        // socket.broadcast.emit("user-joined-update",{roomId,peerId})

        socket.on("disconnect",()=>{
            
            if(rooms[roomId]){
                console.log("user trying to disconnect");
                rooms[roomId]=rooms[roomId].filter(PeerId=> PeerId !== peerId);
                console.log(rooms);
                socket.broadcast.emit("user-disconnected",{roomId,peerId})
            }
        })
    })

    // socket.on("disconnect",()=>{
    //     console.log("User disconnected");

    // })
});

server.listen(port,()=>{
    console.log("Server listening on port " + port);
})
