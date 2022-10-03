import mongoose from "mongoose";

const messageSchema=mongoose.Schema({
    senderId:{
        type:String,
        required:true
    },
    receiverId:{
        type:String,
        required:true
    },
    message:{
        text:{
            type:String,
            default:""
        },
        image:{
            type:String,
            default:""
        }
    }
},{timestamps:true});

const chat = mongoose.model('chat',messageSchema);
export default chat;