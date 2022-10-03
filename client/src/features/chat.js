import {createSlice} from "@reduxjs/toolkit";

import {loadContacts,sendMessage,getMessages} from "../actions/chat.js";

const chatSlice=createSlice({
    name:"chat",
    initialState:{
        message:[],
        loading:false,
        contacts:[]
    },
    reducers:{
        clearLogOutChat:(state)=>{
            return {
                ...state,
                message:[],
                loading:false,
                contacts:[]
            }
        },
        displaySocketMessages:(state,action)=>{
            console.log(action.payload);
            return {
                ...state,
                message:[
                    ...state.message,
                    action.payload
                ]
            }
        }
    },
    extraReducers:{
        [loadContacts.pending]:(state,action)=>{
            return{
                ...state,
                loading:true
            }
        },
        [loadContacts.fulfilled]:(state,action)=>{
            const {contacts}=action.payload;
            return {
                ...state,
                contacts:contacts,
                loading:false
            }
        },
        [sendMessage.fulfilled]:(state,action)=>{
            const newMessage=action.payload;
            console.log(newMessage);
            return {
                ...state,
                message:[
                    ...state.message,
                    newMessage
                ],
            }
        },
        [getMessages.pending]:(state)=>{
            return {
                ...state,
                loading:true
            }
        },
        [getMessages.fulfilled]:(state,action)=>{
            const message=action.payload;
            return {
                ...state,
                message:message,
                loading:false,
            }
        },
    
    }
})

export default chatSlice.reducer;
export const {clearLogOutChat,displaySocketMessages} = chatSlice.actions;