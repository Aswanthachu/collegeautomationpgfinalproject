import React, { useState, useEffect, useContext } from "react";
import { Container } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import NavBar from "./NavBar";
import Main from "./Main";

import { RoomContext } from "../../../context/socketContext";

const styledMainContainer = {
  backgroundColor: "#1a1a1a",
  height: "100vh",
  padding: 0,
  margin: 0,
  [`&.MuiContainer-root`]: {
    maxWidth: "100vw",
    padding: 0,
  },
  zIndex: 2,
};

const VideoStream = () => {

  const [activeUsers,setActiveUsers]=useState(null);

  const { socket, me ,users,stream} = useContext(RoomContext);
  const { id } = useParams();
  const navigate=useNavigate();

  // console.log(stream)

  const peerId = me._id ? me._id : JSON.parse(localStorage.getItem("peer"));

  useEffect(() => {
    socket.emit("join-room", { roomId: id, peerId: me._id });
  }, [me,peerId,socket,id]);

  useEffect(()=>{
    setActiveUsers(users)
  },[users])


 
  const onBackButtonEvent = (e) => {
    e.preventDefault();

    if (window.confirm("Do you want to go back ?")) {
      localStorage.removeItem("RoomId");
      navigate("/");
    } else {
      window.history.pushState(null, null, window.location.pathname);
    }
  };

  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);

  useEffect(() => {
    const handleTabClose = (event) => {
      event.preventDefault();
      localStorage.removeItem("RoomId");
    };
    window.addEventListener("onbeforeunload", handleTabClose);
    return () => {
      window.removeEventListener("onbeforeunload", handleTabClose);
    };
  }, []);

  return (
    <Container sx={{ ...styledMainContainer }}>
      <NavBar />
      <Main stream={stream}/>
    </Container>
  );
};

export default VideoStream;
