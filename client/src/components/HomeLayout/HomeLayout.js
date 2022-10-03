import { useState,useEffect } from "react";
import { Container, Paper } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import {useLocation} from "react-router-dom";

import Untitled from "../../images/home-bg.svg";

import Navbar from "./Navbar/Navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    margin: 0,
    minWidth: "100vw",
    height: "100vh",
    backgroundImage: `url(${Untitled})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top 0 right 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    position:"fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "95vw !important",
    height: "90vh !important",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      height: "100vh",
    },
  },
  navBar:{
    height:"11%",
  },
  component: {
    height:"89%",
    width: "100%",
  },
}));

const HomeLayout = ({ Component}) => {
  const classes = useStyles();
  const location=useLocation();

  const [loginTry, setLoginTry] = useState(false);
  const [userType, setUserType] = useState({
    student: false,
    teacher: false,
    staff: false,
    librarian: false,
    placement: false,
    hod: false,
  });

  useEffect(()=>{
    console.log(location)
  },[location])
  
  return (
    <Container className={classes.root}>
      <Paper className={classes.paper} elevation={9}>
        <div className={classes.navBar}>
          <Navbar loginTry={loginTry} setLoginTry={setLoginTry} />
        </div>
        <div className={classes.component}>
          <Component loginTry={loginTry} userType={userType} setUserType={setUserType} setLoginTry={setLoginTry}/>
        </div>
      </Paper>
    </Container>
  );
};

export default HomeLayout;
