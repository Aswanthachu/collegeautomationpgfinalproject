import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        default:null,
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    profilepic:{
        type:String,
        default:null
    },
    usertype:String,
    email:{
        type:String,
        default:null,
    },
    phone:{
        type:String,
        default:null
    }
});

const user=mongoose.model('user',userSchema);

export default user;