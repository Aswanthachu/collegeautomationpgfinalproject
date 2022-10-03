import React from "react";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

import LoginTypes from "./LoginTypes";

import studentLogin from "../../../images/student-login-2.svg";
import teacherLogin from "../../../images/teaher-login.svg";
import staffLogin from "../../../images/secure-login-animate.svg";
import placementLogin from "../../../images/placementLogin.svg";
import librarian from "../../../images/library.svg";
import hodLogin from "../../../images/hod.svg";

import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  loginPage: {
    width: "100% ",
    height: "100%",
    backgroundColor: "#FFFFFF",
    display: "flex",
  },
}));



const LoginPage = () => {
  const classes = useStyles();

  const userType = useSelector(state=>
  state.user.userType
  )

  return (
    <Paper className={classes.loginPage}>
      {userType.student && (
        <LoginTypes
          image={studentLogin}
          type="student"
        />
      )}
      {userType.teacher && (
        <LoginTypes
          left
          image={teacherLogin}
          type="teacher"
        />
      )}
      {userType.staff && (
        <LoginTypes
          image={staffLogin}
          type="staff"
        />
      )}
      {userType.librarian && (
        <LoginTypes
          left
          image={librarian}
          type="librarian"
        />
      )}
      {userType.placement && (
        <LoginTypes
          image={placementLogin}
          type="placement"
        />
      )}
      {userType.hod && (
        <LoginTypes
          left
          image={hodLogin}
          type="hod"
        />
      )}
    </Paper>
  );
};

export default LoginPage;
