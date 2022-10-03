import { Server } from "socket.io";

const io = new Server(8000,{
  cors:{
    origin:"*",
    methods:["GET","POST"]
  }
});

let users=[];
let notification,sendData;

const addUser=(userId,socketId)=>{
    
    if(userId !== null){
      const checkUser=users.some(u=> u.userId=== userId);
      if(!checkUser){
        users.push({userId,socketId});
      }
    }
}


const userDisconnect=(socketId)=>{
  users=users.filter(u=>u.socketId !== socketId);
  console.log(users)
  console.log("user disconnected...");
}

const removeUser=(userId)=>{
  users=users.filter(u=>u.userId !== userId);
  console.log(users)
  console.log("user disconnected by page changing...");
}

const findUser=(userId)=>{
  console.log(userId)
  return users.find(u=>u.userId === userId)

}

io.on("connection", (socket) => {
    console.log("user connected successfully...");
    socket.on("addUser",(userId)=>{
        addUser(userId,socket.id);
        io.emit("getUser",users)
    });    

    socket.on("userPageChanged",(userId)=>{
        console.log(userId);
        removeUser(userId);
        io.emit("getUser",users);
    });

    socket.on("sendMessage",(message)=>{
      const user = findUser(message.receiver);
      console.log(user)
      if(user !== undefined){
        socket.to(user.socketId).emit("getMessage",message)
      }
    });

    socket.on("messageTyping",(data)=>{
      const user= findUser(data.receiver);
      console.log(data.sender)
      if(user !== undefined){
        notification=true
        sendData={notification,receiver:data.receiver,sender:data.sender}
        socket.to(user.socketId).emit("typingNotification",sendData);
      }
    });

    socket.on("userStopTyping",(data)=>{
      const user=findUser(data.receiver);
      console.log(data.sender)
      if(user !== undefined){
        notification=false;
        sendData={notification,receiver:data.receiver,sender:data.sender}
        socket.to(user.socketId).emit("typingNotification",sendData);
      }
    })

    socket.on("disconnect",()=>{
        userDisconnect(socket.id);
        io.emit("getUser",users);
    })
});


