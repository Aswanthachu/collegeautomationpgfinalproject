import axios from 'axios';
// import {useSelector} from "react-redux";

export const baseUrl="http://localhost:5000";


// let token;
// if(localStorage.getItem('token') ===null){
//     token=""
// }else{
//     const tokenObj=JSON.parse(localStorage.getItem('token'));
//     const token=tokenObj.token;
//     console.log(token);
// }
    

    // const tokenObj =useSelector(state=>state.chat.token !=="" ? state.chat.token :JSON.parse(localStorage.getItem('token')));
    const tokenObj =localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):"";
    // let tokenObj=JSON.parse(localStorage.getItem('token'));
    const {token} = tokenObj;

    console.log(token)

export const postAuthAxios=axios.create({
    baseURL:baseUrl,
    headers:{
        Authorization:`Bearer ${token}`
    }
});

// tokenObj=null;

