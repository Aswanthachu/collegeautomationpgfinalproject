import {useEffect,useState} from "react";
import { createContext} from 'react';
import {io} from "socket.io-client";
import Peer from "peerjs";
import {v4 as uuidv4} from "uuid";

export const RoomContext=createContext(null);

const socket=io("ws://localhost:4000");

export const RoomProvider=({children})=>{
    
    const [me,setMe]=useState("");
    const [newRoomId,setNewRoomId]=useState("");
    const [users,setUsers]=useState(null);
    const [stream,setStream]=useState(null);

    // const RoomId=JSON.parse(localStorage.getItem("RoomId"));

    console.log(users)

    useEffect(() => {
        const meId=uuidv4();
        const peer= new Peer(meId);
        setMe(peer);
        socket.on("room-created",({roomId})=>{
            console.log(roomId);
            setNewRoomId(roomId);
            localStorage.setItem("RoomId",JSON.stringify(roomId));
        })

        socket.on('get-users',({participants,roomId})=>{
                console.log(participants);
                setUsers(participants);
        });

        try {
            navigator.mediaDevices.getUserMedia({video:true,audio:true}).then(stream=>
                setStream(stream)
            );
        } catch (error) {
            console.error(error);
        }

        socket.on('user-joined-update',({peerId,roomId})=>{
                console.log("new user joined " + peerId);
                if(!users?.some(u=> u === peerId)){
                    setUsers(prevState=>(
                        [...prevState,
                        peerId
                        ]
                    ));
                }
        })

        socket.on("user-disconnected",({peerId,roomId})=>{
                console.log("a user left");
       
                setUsers(prevState=>(
                    [...prevState,
                    peerId
                    ]
                ));
        });

    }, []);

    useEffect(()=>{

    },[])
    
    return <RoomContext.Provider value={{socket,me,newRoomId,users,stream}}>{children}</RoomContext.Provider>
}

