import  {AppBar, Button, Typography } from "@mui/material";
import React,{ useState, useEffect } from "react";

import image from "../../../images/download.jpg";

const styledAppBar = {
  width: "100vw",
  height: "11%",
  display: "flex",
  flexDirection: "row",
  backgroundColor: "#1a1a1a",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 5% 0 2%",
  [`&.MuiAppBar-root`]: {
    boxShadow: "none",
  },
  zIndex: 1,
};

const styledButton = {
  width: "content-size",
  fontFamily: "poppins",
  background: "linear-gradient(to left ,#7962E1 0% ,#906EE8 100% )",
  color: "black",
};

const logoText = {
  fontFamily: "poppins",
  fontSize: "26px",
  fontWeight: "bold",
  marginLeft: "15px",
};

const NavBar = (props) => {

  const { Join, setCreateRoom, createRoom ,loginedUserType } =props;

  const handleJoinRoom=()=>{
    setCreateRoom(false);
  }

  const handleCreateRoom=()=>{
    setCreateRoom(true);
  }

  return (
    <AppBar sx={{ ...styledAppBar }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={image} alt="logo" style={{ width: "50px", height: "50px" }} />
        <Typography sx={{ ...logoText }}>CCSIT CU</Typography>
      </div>
      {Join && !createRoom && loginedUserType === "teacher" ? (
        <Button sx={{ ...styledButton }} onClick={handleCreateRoom}>Create Room</Button>
      ) : Join && createRoom && loginedUserType === "teacher"? (
        <Button sx={{ ...styledButton }} onClick={handleJoinRoom}>Join Room</Button>
      ) : (
        !Join &&
        <Button sx={{ ...styledButton }}>SnapShot</Button>   
      )}
    </AppBar>
  );
};

export default NavBar;
