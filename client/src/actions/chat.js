import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
// import {postAuthAxios} from "../api/index.js";
import {baseUrl} from "../api/index.js";

export const loadContacts=createAsyncThunk("chat/loadContacts",async()=>{
    // console.log(getState)
    try {
        const {data}= await axios.get(`${baseUrl}/chat/loadcontacts`);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
});


export const getMessages =createAsyncThunk('chat/getMessages',async({id})=>{
   try {
    const {data} = await axios.get(`${baseUrl}/chat/getmessage/${id}`);
    // console.log(data);
    return data;
   } catch (error) {
    console.log(error);
   } 
});

export const sendMessage =createAsyncThunk('chat/sendMessage',async({message,receiver})=>{
    console.log(message,receiver);
    try {
        const {data}= await axios.post(`${baseUrl}/chat/updatemessage/${receiver}`,{message:message});
    // console.log(data.insertMessage);
        return data.insertMessage;
    } catch (error) {
        console.log(error)
    }
})