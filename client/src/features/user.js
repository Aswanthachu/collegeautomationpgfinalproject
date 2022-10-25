import { createSlice } from "@reduxjs/toolkit";

import { signUp, signIn, updateProfile, requestOtp, verifyOtp, verifyPassword, searchUser, userAction } from "../actions/user.js";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: "",
    message: "",
    userId: "",
    successMessage: "",
    errorMessage: "",
    profileSnackBar: false,
    loginTry: false,
    smsHash: "",
    userType: {
      student: false,
      teacher: false,
      staff: false,
      librarian: false,
      placement: false,
      hod: false,
    },
    actionType: {
      add: false,
      remove: false,
      edit: false
    },
    searchedUser: ""
  },
  reducers: {
    Logout: (state) => {
      localStorage.clear();
      return {
        ...state,
        userData: "",
        message: "",
        userId: "",
        successMessage: "",
        errorMessage: "",
        profileSnackBar: false,
        loginTry: false,
        smsHash: "",
        token: "",
        userType: {
          student: false,
          teacher: false,
          staff: false,
          librarian: false,
          placement: false,
          hod: false,
        }
      };
    },
    setLoginTry: (state, action) => {
      console.log(action.payload);
      const { value } = action.payload;
      return {
        ...state,
        loginTry: value
      }
    },
    setUserType: (state, action) => {
      console.log(action.payload);
      const { name, value } = action.payload;
      return {
        ...state,
        userType: {
          ...state.userType,
          student: false,
          teacher: false,
          staff: false,
          librarian: false,
          placement: false,
          hod: false,
          [name]: value
        }
      }
    },
    closeUpdateSnackBar: (state) => {
      return {
        ...state,
        profileSnackBar: false,
        successMessage: "",
        errorMessage: "",
        message: ""
      }
    },
    setActionType: (state, action) => {
      const { name } = action.payload;
      return {
        ...state,
        actionType: {
          ...state.actionType,
          add: false,
          remove: false,
          edit: false,
          [name]: true
        }
      }
    },

    // ######clear search
    clearSearch: (state) => {
      return {
        ...state,
        searchedUser: ""
      }
    }
  },
  extraReducers: {
    [signUp.fulfilled]: (state, action) => {
      const { result, token } = action.payload;
      localStorage.setItem("user", JSON.stringify({ ...result }));
      localStorage.setItem("token", JSON.stringify({ token }));
      return {
        ...state,
        userData: { ...result },
      };
    },
    [signIn.fulfilled]: (state, action) => {
      console.log(action);
      if (action.payload.message) {
        const { message } = action.payload;
        return {
          ...state,
          message: message
        }
      } else {
        const { result, token } = action.payload;

        localStorage.setItem("user", JSON.stringify({ ...result }));
        localStorage.setItem("token", JSON.stringify({ token }));
        return {
          ...state,
          userData: { ...result },
          message: "",
          token: token
        };
      }
    },
    [updateProfile.fulfilled]: (state, action) => {
      const Data = action.payload.data;
      const { data, message } = Data;
      localStorage.setItem("user", JSON.stringify({ ...data }));
      return {
        ...state,
        userData: data,
        successMessage: message,
        profileSnackBar: true
      };
    },
    [requestOtp.fulfilled]: (state, action) => {

      const { hash, message, userId } = action.payload.data;

      console.log(action.payload);

      if (!hash) {
        return {
          ...state,
          errorMessage: message,
        }
      } else {
        return {
          ...state,
          successMessage: message,
          smsHash: hash,
          userId: userId,
          profileSnackBar: true
        }
      }
    },
    [verifyOtp.fulfilled]: (state, action) => {
      const updatedData = action.payload;
      const { message, status } = updatedData;
      console.log(message);
      if (status) {
        return {
          ...state,
          smsHash: "",
          successMessage: message,
          profileSnackBar: true
        }
      } else {
        return {
          ...state,
          errorMessage: message,
        }
      }
    },
    [verifyPassword.fulfilled]: (state, action) => {
      const updatedData = action.payload;
      const { message, status } = updatedData;
      if (status) {
        return {
          ...state,
          successMessage: message,
          profileSnackBar: true
        }
      } else {
        return {
          ...state,
          errorMessage: message
        }
      }
    },

    // serach students or user
    [searchUser.fulfilled]: (state, action) => {
      console.log(action.payload);
      if (action.payload.message) {
        const { message } = action.payload;
        return {
          ...state,
          message: message
        }
      } else {
        if (action.payload) {
          const search = action.payload[0];
          // console.log(search)
          return {
            ...state,
            message: "",
            searchedUser: search
          }
        }
      }
    },
    [userAction.fulfilled]: (state, action) => {
      
      if(action.payload.message){
        const {message}=action.payload;
        return {
          ...state,
          successMessage:message
        }
      }else{
        const errorMessage=action.payload;
        return{
          ...state,
          errorMessage:errorMessage
        }
      }
    }

  }
});

export default userSlice.reducer;

export const { Logout, setLoginTry, setUserType, closeUpdateSnackBar, setActionType, clearSearch } = userSlice.actions;
