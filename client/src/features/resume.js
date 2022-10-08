import { createSlice } from "@reduxjs/toolkit";
import {resumeUpload,getResumeData} from "../actions/resume";

const resumeSlice=createSlice({
    name:"resume",
    initialState:{
        resumeData:"",
        message:""
    },
    reducers:{
        claerMessage:(state)=>{
            return{
                ...state,
                message:""
            }
        }
    },
    extraReducers:{
        [resumeUpload.fulfilled]:(state,action)=>{
            const {data,message}=action.payload;
            return {
                ...state,
                resumeData:data,
                message
            }
        },
        [getResumeData.fulfilled]:(state,action)=>{
            const {data}=action.payload;
            return{
                ...state,
                resumeData:data
            }
        }
    }
});

export default resumeSlice.reducer;

export const {claerMessage} = resumeSlice.actions;