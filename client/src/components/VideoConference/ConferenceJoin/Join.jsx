import { Container, TextField, Typography, Button } from "@mui/material";
import React,{ useState, useEffect, useContext } from "react";
// import {io} from "socket.io-client";
import { useNavigate } from "react-router-dom";

import NavBar from "../VideoStream/NavBar";

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

const styledFormContainer = {
  height: "100vh",
  [`&.MuiContainer-root`]: {
    maxWidth: "100vw",
    padding: 0,
  },
  color: "#ffffff",
  paddingTop: "11vh !important",
  display: "flex",
  // backgroundColor:"red",
};

const styledForm = {
  width: "90%",
  maxWidth: "600px",
  borderRadius: "10px",
  backgroundColor: "#262625",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const formHeader = {
  borderRadius: "10px 10px 0 0",
  padding: "20px",
  textAlign: "center",
  backgroundColor: "#363739",
  margin: 0,
  fontSize: "18px",
  fontWeight: 300,
  lineHeight: 0,
  fontFamily: "poppins",
};

const formBody = {
  width: "100%",
  boxSizing: "border-box",
  margin: "40px",
};

const roomName = {
  margin: "10px 0",
  display: "block",
  fontFamily: "poppins",
};

const roomNameTextField = {
  width: "86%",
  boxSizing: "border-box",
  margin: 0,
  borderRadius: "5px",
  color: "#fff !imporatant",
  // padding: "16px 20px",
  fontSize: "15px",
  backgroundColor: "#3f434a",
  [`& .MuiOutlinedInput-root`]: {
    "& > fieldset": {
      border: "none",
    },
    color: "#fff !important",
    fontFamily: "poppins",
  },
};

const joinButton = {
  boxSizing: "border-box",
  width: "86%",
  margin: "20px 0",
  [`&.MuiButton-root`]: {
    background: "linear-gradient(to left ,#7962E1 0% ,#906EE8 100% )",
    color: "#000",
    fontSize: "18px",
    fontWeight: "bold",
    fontFamily: "poppins",
  },
};

const Join = () => {
  const [createRoom, setCreateRoom] = useState(true);
  const [loginedUserType, setLoginedUserType] = useState("");
  const [room, setRoom] = useState("");

  const navigate = useNavigate();

  const { socket, newRoomId } = useContext(RoomContext);

  useEffect(() => {
    setLoginedUserType(JSON.parse(localStorage.getItem("user")).usertype);
  }, [loginedUserType]);

  const handleJoinRoom = () => {
    localStorage.setItem("RoomId",JSON.stringify(room));
    if(room) navigate(`/videoconference/stream/${room}`);
  };

  const handleCreateRoom = () => {
    socket.emit("create-room");
  };

  useEffect(() => {
    if (newRoomId) setRoom(newRoomId);
  }, [newRoomId]);

  return (
    <Container sx={{ ...styledMainContainer }}>
      <NavBar
        Join
        setCreateRoom={setCreateRoom}
        createRoom={createRoom}
        loginedUserType={loginedUserType}
      />
      <Container sx={{ ...styledFormContainer }}>
        <form style={{ ...styledForm }}>
          <div style={{ ...formHeader }}>
            {createRoom && loginedUserType === "teacher"
              ? "CREATE ROOM"
              : "JOIN ROOM"}
          </div>
          <div style={{ ...formBody }}>
            <Typography sx={{ ...roomName }}>
              {createRoom && loginedUserType === "teacher"
                ? (room 
                  ? "Copy room Id"
                  : "Create Room Id")
                : "Room Id"}
            </Typography>
            <TextField
              sx={{ ...roomNameTextField }}
              autoComplete="off"
              value={room}
              onChange={(e)=>setRoom(e.target.value)}
            />
            {createRoom && loginedUserType === "teacher" ? (
              <Button sx={{ ...joinButton }} onClick={handleCreateRoom}>
                Create Room Id
              </Button>
            ) : (
              <Button sx={{ ...joinButton }} onClick={handleJoinRoom}>
                Join
              </Button>
            )}
          </div>
        </form>
      </Container>
    </Container>
  );
};

export default Join;
