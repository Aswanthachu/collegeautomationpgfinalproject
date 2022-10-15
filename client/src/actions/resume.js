import { createAsyncThunk } from "@reduxjs/toolkit";
import { postAuthAxios } from "../api";
import { baseUrl } from "../api";

export const resumeUpload=createAsyncThunk('resume/resumeUpload',async({resumeData,setErrorMessage})=>{

    if(!(/^[6-9]\d{9}$/.test(resumeData.phone))){
        setErrorMessage("Invalid Phone Number.");
        return;
    }
    if(!(resumeData.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))){
        setErrorMessage("Invalid Email.");
        return;
    }

    var regexpLink=new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi);

    if(!resumeData.linkedin.match(regexpLink)){
        setErrorMessage("Please provide a valid linkedIn profile.");
        return;
    }
    if(!resumeData.github.match(regexpLink)){
        setErrorMessage("Please provide a valid github repo.");
        return;
    }else{
        try {
            const {data}= await postAuthAxios.post(`${baseUrl}/resume/upload`,{resumeData});
            return data;
        } catch (error) {
            console.log(error);
        }
    }
});

export const getResumeData=createAsyncThunk('resume/getResumeData',async()=>{
    try {
        const {data}= await postAuthAxios.get(`${baseUrl}/resume/getresume`);
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const getAllResume=createAsyncThunk('resume/getAllResume',async()=>{
    try {
        const {data} = await postAuthAxios.get(`${baseUrl}/resume/getallresume`);
        return {data};
    } catch (error) {
        console.log(error);
    }
})


