import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LoginButton from "./Login/LoginButton";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper1: {
    width: "100%",
    height: "100%",
    backgroundImage:
      'url("https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29sbGVnZSUyMGNhbXB1c3xlbnwwfHwwfHw%3D&w=1000&q=80")',
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    objectFit: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginBox: {
    position: "relative",
    width: "80%",
    height: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

const Home = () => {
  const classes = useStyles();

  const links = [
    ["Student", "student"],
    ["Teacher", "teacher"],
    ["Staff", "staff"],
    ["Librarian", "librarian"],
    ["Placement Cell", "placement"],
    ["Head of Department", "hod"],
  ];

  const loginTry = useSelector((state) => state.user.loginTry);

  return (
    <Paper className={classes.paper1}>
      <Box className={classes.loginBox}>
        {!loginTry ? (
          <Typography varinat="h1" sx={{ color: "#000000" }}>
            CCSIT CU
          </Typography>
        ) : (
          <>
            <Typography
              variant="h2"
              sx={{ color: "#ffffff", position: "absolute", top: 0 }}
            >
              Login As
            </Typography>
            <div className={classes.buttonContainer}>
              {links.map((link, index) => {
                return (
                  <LoginButton key={index} text={link[0]} name={link[1]} />
                );
              })}
            </div>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default Home;
