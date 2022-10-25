import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { baseUrl, postAuthAxios } from "../api/index";

import { setLoginTry, setUserType } from "../features/user";

export const signUp = createAsyncThunk(
  "user/signUp",
  async ({ userData, navigate }) => {
    try {
      const { data } = await axios.post(`${baseUrl}/user/signup`, userData);
      console.log(data);
      navigate("/");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const signIn = createAsyncThunk(
  "user/signIn",
  async ({ userData, navigate, dispatch }, thunkApi) => {
    try {
      const data = await postAuthAxios.post("/user/login", userData)
        .then(response => {
          console.log(response.data.token)
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
          return response.data
        });

      console.log(data);

      dispatch(setLoginTry({ value: false }));
      // const {userType}=thunkApi.getState().user;
      // console.log(userType);
      // const setUser= userType.filter(user => user === true);
      dispatch(setUserType({ name: userData.type, value: false }));
      navigate("/");
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      // const {rejectWithValue}=thunkApi;
      const { data } = error.response;
      return data;
      // return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ updatedProfile }) => {
    console.log(updatedProfile);
    try {
      const data = await axios.patch(
        `${baseUrl}/user/updateprofile`,
        updatedProfile
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const requestOtp = createAsyncThunk(
  "user/requestOtp",
  async ({ userId, setreqOtp, guestVerifyData, setErrorMessage, setGuestChange }) => {
    // console.log(userId);
    // console.log(guestVerifyData);
    if (guestVerifyData && guestVerifyData.username === "") {
      return { message: "Username Must Be Provided." }
    }
    if (guestVerifyData && guestVerifyData.phone === "") {
      return { message: "Phone  Must Be Provided." }
    }
    var data;
    try {
      if (userId)
        data = await axios.post(`${baseUrl}/user/requestotp/${userId}`);
      else
        data = await axios.post(`${baseUrl}/user/requestotp`, { guestVerifyData: { ...guestVerifyData } })
      console.log(data);
      setreqOtp && setreqOtp(true);
      setErrorMessage && setErrorMessage("");
      setGuestChange && setGuestChange({
        username: "",
        phone: ""
      })
      return data;
    } catch (error) {
      console.log(error);
      const data = error.response;
      return data;
    }
  }
);

export const verifyOtp = createAsyncThunk("user/verifyOtp", async ({ otp, setVerified, setreqOtp, setOtp, setErrorMessage }, thunkApi) => {
  const { smsHash } = thunkApi.getState().user;
  console.log(smsHash);
  if (otp === "") {
    return { message: "Please Enter OTP" }
  } else {
    try {
      const { data, status } = await axios.post(`${baseUrl}/user/otpverify/${otp}`, { smsHash });
      console.log(data, status);

      if (status === 200) {
        setreqOtp(false);
        setVerified(true);
        setOtp("");
        setErrorMessage("");

      }
      const updatedData = { ...data, status };
      console.log(updatedData);
      return updatedData;
    } catch (error) {
      console.log(error);
      const { data } = error.response;
      return data;
    }
  }
})

export const verifyPassword = createAsyncThunk("user/verifyPassword", async ({ password, setVerified, Id, setPassword, setErrorMessage }) => {
  console.log(password, Id);

  try {

    const { data, status } = await axios.post(`${baseUrl}/user/verifyPassword/${Id}`, { password: { ...password } });
    const updatedData = { ...data, status }
    if (status) {
      setVerified(false);
      setPassword({
        ...password,
        pass: "",
        cpass: ""
      });
      setErrorMessage("")
    }
    return updatedData;
  } catch (error) {
    console.log(error);
    const { data } = error.response;
    return data;
  }
});


// user Edit

export const searchUser = createAsyncThunk("user/searchUser", async ({ search }) => {
  // console.log(search);
  try {
    const { data} = await postAuthAxios.get(`${baseUrl}/user/searchuser/${search}`);
    return data;

  } catch (error) {
    const {message}=error.response.data;
    return {message:message};
  }
});

export const userAction=createAsyncThunk("user/userAction",async({userValues,action})=>{
  try {
    const {data}=await postAuthAxios.post(`${baseUrl}/user/performuseraction/${action}`,{...userValues});
    return data;
  } catch (error) {
    const {errorMessage}=error.response.data;
    return errorMessage;
  }
})

