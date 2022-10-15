import { createSlice } from "@reduxjs/toolkit";
import {resumeUpload,getResumeData, getAllResume} from "../actions/resume";

const resumeSlice=createSlice({
    name:"resume",
    initialState:{
        resumeData:"",
        message:"",
        resumes:[],
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
        },
        [getAllResume.fulfilled]:(state,action)=>{
            const {data}=action.payload.data;
            const existingUser=state.resumes.some(r=>r.username === data.username);
            if(!existingUser){
                return{
                    ...state,
                    resumes:data
                }
            }else{
                return state;
            }
        }
    }
});

export default resumeSlice.reducer;

export const {claerMessage} = resumeSlice.actions;