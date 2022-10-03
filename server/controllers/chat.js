import user from "../models/user.js";
import chat from "../models/chat.js";

export const loadContacts=async(req,res)=>{
    // console.log("hiii");

    const userId=req.userId;
    let contacts;
    try {
        const requestedUser=await user.findById(userId);
        
        if(requestedUser.usertype === "student"){
            contacts= await user.find({usertype:"teacher"},{username:true,name:true,profilepic:true,_id:true});
        // console.log(contacts);
        }
        if(requestedUser.usertype === "teacher"){
            contacts= await user.find({usertype:"student"},{username:true,name:true,profilepic:true,_id:true});
        }
        res.status(200).json({contacts});

    } catch (error) {
        console.log(error);
    }
}

export const updateMessage=async(req,res)=>{
    const senderId=req.userId;
    const {receiverId}=req.params;
    const messages=req.body.message;

    try {
        const insertMessage= await chat.create({
            senderId:senderId,
            receiverId:receiverId,
            message:messages
        });
        if(insertMessage)
          res.status(200).json({insertMessage});
    } catch (error) {
        console.log(error);
    }
}

export const getMessage=async(req,res)=>{
    const senderId=req.userId;
    const {receiverId}=req.params;


    try {
        let messages= await chat.find({});
        messages=messages.filter((m)=>m.senderId === senderId && m.receiverId === receiverId || m.senderId === receiverId && m.receiverId === senderId);
        if(messages)
          res.status(200).json(messages);
    } catch (error) {
        console.log(error);
    }
    
};
