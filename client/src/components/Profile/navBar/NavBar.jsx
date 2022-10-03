import { AppBar, Toolbar, Typography, Avatar } from "@mui/material";
import React,{useEffect,useState} from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import {Link} from "react-router-dom";

import { StyledBadge } from "../../HomeLayout/Navbar/Avatar";

import image from "../../../images/download.jpg";

// const styledText=styled(Typography)((theme)=>({
//   "&.MuiTypography-root":{
//     whiteSpa
//   }
// }))

const useStyles = makeStyles((theme) => ({
  toolBar: {
    height: "13vh",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 10% 0 7% ",
  },

  profileBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    width: "fit-content",
  },
  profileLogo: {
    width: "50px",
    height: "50px",
    borderRadius: "15%",
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const [user,setUser]=useState("")

  // const response =useSelector((state)=>
  // (state.user.userData !=="" || JSON.parse(localStorage.getItem("user")) !== "") ? JSON.parse(localStorage.getItem("user")) : ""
  // );  
  const response =useSelector((state)=>state.user.userData !=="" ? state.user.userData : "")

  // console.log(response);

  useEffect(() => {
    if(JSON.parse(localStorage.getItem("user"))) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }else{
      setUser("")
    }
  },[response]);
  
  return (
    <>
      <AppBar sx={{ backgroundColor: "#FFFFFF" }} elevation={0}>
        <Toolbar className={classes.toolBar} disableGutters>
          <div className={classes.profileBox}>
            <Link to={'/'}>
            <img className={classes.profileLogo} src={image} alt=""  />
            </Link>
            <Typography
              variant="h4"
              sx={{ marginLeft: "10vw", color: "black" }}
            >
              Profile
            </Typography>
          </div>
          <div className={classes.profileBox}>
            <div>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar src={user.profilepic}>
                  {/* {user?.name
              ? user?.name.charAt(0).toUpperCase()
              :user?.username.charAt(0).toUpperCase()} */}
                </Avatar>
              </StyledBadge>
            </div>
            <Typography
              variant="p"
              sx={{ whiteSpace: "nowrap", paddingLeft: "10%", color: "black" }}
            >
              Welcome , {user.name || user.username}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
