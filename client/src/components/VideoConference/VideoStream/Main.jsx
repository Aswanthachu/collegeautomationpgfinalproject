import React,{ useState,useRef,useEffect } from "react";
import { Container, Typography, Box, Paper, IconButton } from "@mui/material";
import {
  PhotoCamera,
  NoPhotography,
  Mic,
  MicOff,
  ScreenShare,
  StopScreenShare,
  ExitToApp,
} from "@mui/icons-material";

import chatbot from "../../../images/chatbot.png";


const styledVideoContainer = {
  height: "100vh",
  [`&.MuiContainer-root`]: {
    maxWidth: "100vw",
    padding: 0,
  },
  color: "#ffffff",
  paddingTop: "11vh !important",
  display: "flex",
  // alignItems: "center"
};

const memberBox = {
  width: "19vw",
  backgroundColor: "#262625",
  borderRight: "0.5px solid #797a79",
  display: "flex",
  flexDirection: "column",
  fontFamily: 'poppins',
  [`::-webkit-scrollbar-thumb`]: {
    visibility: "hidden",
  },
};

// ##### Member Box Style ##########

const memberCountBox = {
  width: "100%",
  backgroundColor: "#323143",
  padding: "10px 0",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  position: "sticky",
  top: 0,
  left: 0,
  zIndex: 999,
};

const memberCount = {
  width: "40px",
  height: "40px",
  backgroundColor: "#262625",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const memberBody = {
  display: "flex",
  alignItems: "center",
  padding: "8px 0 8px 8px",
};

const memberGreenButton = {
  width: "10px",
  height: "10px",
  backgroundColor: "#2aca3e",
  borderRadius: "50%",
};

// ##### Member Box Style ##########

const streamBox = {
  width: "61vw",
  overflow: "hidden",
  overflowY: "auto",
};

const focusedStream = {
  padding: 0,
  margin: 0,
  width: "100%",
  // backgroundColor:"red",
  height: "430px",
  border: "1px solid black",
  position:"relative",
  overflow:"hidden"
};

const streamParticipants = {
  margin: 0,
  padding: "3% 2.3%",
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  width: "auto",
  justifyContent: "flex-start",
  alignItems: "center",
};

const streamPartcipantBox = {
  minWidth: "22%",
  height: "100px",
  // backgroundColor: "green",
  cursor: "pointer",
  [`&.MuiBox-root`]: {
    borderRadius: "8px",
    border:"1px solid green"
  },
};

const streamBoxControl__paper = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "7%",
  backgroundColor: "transparent",
  position: "sticky",
  zIndex: 4,
  bottom: "5%",
  [`&.MuiPaper-root`]: {
    margin: 0,
    boxShadow: "none",
  },
  color: "red",
};

const iconButton = {
  [`&.MuiIconButton-root`]: {
    width: "5rem",
    height: "5rem",
  },
  [`&.MuiIconButton-root:hover`]: {
    background: "none",
  },
};

const styledIcon = {
  fontSize: "3rem",
  color: "blue",
  [`&.MuiSvgIcon-root:hover`]: {
    color: "blue",
    fontSize: "4rem",
  },
};

// ##### Chat Box Style ##########

const chatBox = {
  width: "25vw",
  backgroundColor: "#262625",
  borderLeft: "1px solid #111",
  overflow: "hidden",
  overflowY: "auto",
  padding: "15px 25px",
};

const styledBotmessage4Welcome = {
  padding: "15px 0",
};

const stylebotReference = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
};

const chatbotImage = {
  width: "25px",
  height: "25px",
};

const chatbotName = {
  fontSize: "15px",
  marginLeft: "10px",
  // color: "#7962E1",
  color:"#ffffff",
  fontWeight: "bold",
  fontFamily: 'poppins'
};

const botWelcomeMessage = {
  fontSize: "15px",
  color: "#bdbdbd",
  marginTop: "2px",
  marginLeft: "2px",
};

const userMessage = {
  backgroundColor: "#363739",
  borderRadius: "10px",
  padding: "10px 15px",
  width: "fit-content",
  maxWidth: "900px",
  marginTop: "10px",
};

const messageAuthor = {
  marginRight: "10px",
  color: "#2aca3e",
  fontSize: "13px",
  fontWeight: "bold",
  display: "flex",
  flexDirection: "column",
  fontFamily: 'poppins'
};

const userMessageContent = {
  fontSize: "13px",
  fontFamily: 'poppins'
};

const Main = ({stream}) => {
  
  const videoRef=useRef(null);
  useEffect(()=>{
    if(videoRef.current) videoRef.current.srcObject=stream;
  },[stream])


  return (
    <Container sx={{ ...styledVideoContainer }}>
      <Box sx={{ ...memberBox }}>
        <Box sx={{ ...memberCountBox }}>
          <Typography sx={{fontFamily: 'poppins'}}>Participants</Typography>
          <div style={{ ...memberCount }}>
            <Typography>1</Typography>
          </div>
        </Box>
        <div style={{ overflow: "hidden", overflowY: "auto" }}>
          <div style={{ ...memberBody }}>
            <div style={{ ...memberGreenButton }}></div>
            <Typography sx={{ marginLeft: "13px",fontFamily: 'poppins'}}>Aswanth Pnk</Typography>
          </div>
        </div>
      </Box>

      <Box sx={{ ...streamBox }}>

        <Box sx={{ ...focusedStream }}>
          <video ref={videoRef} autoPlay muted={true} style={{width:"100%"}}/>
        </Box>
        
        <Box sx={{ ...streamParticipants }}>
          <Box sx={{ ...streamPartcipantBox }}>
            {/* {users?.length > 0 &&
              users.map((user) => {
                if (user.videoTrack) {
                  return (<AgoraVideoPlayer
                    videoTrack={user.videoTrack}
                    key={user.uid}
                    style={{ width: "100%", height: "100%" }}
                  />);
                }else{          
                  return null;
                }
              })} */}
          </Box>         
        </Box>


        <Paper sx={{ ...streamBoxControl__paper }}>
          <IconButton sx={{ ...iconButton }} >
            {"trackState.video" ? (
              <PhotoCamera sx={{ ...styledIcon }} />
            ) : (
              <NoPhotography sx={{ ...styledIcon }} />
            )}
          </IconButton>
          <IconButton sx={{ ...iconButton }} >  {/*  onClick={() => mute("audio")} */}
            {"trackState.audio" ? (
              <Mic sx={{ ...styledIcon }} />
            ) : (
              <MicOff sx={{ ...styledIcon }} />
            )}
          </IconButton>
          <IconButton sx={{ ...iconButton }}>
            {"trackState.screenShare" ? (
              <ScreenShare sx={{ ...styledIcon }} />
            ) : (
              <StopScreenShare sx={{ ...styledIcon }} />
            )}
          </IconButton>
          <IconButton sx={{ ...iconButton }} >
            <ExitToApp sx={{ ...styledIcon, color: "red",  [`&.MuiSvgIcon-root:hover`]: {color: "red",fontSize: "4rem"}}} />
          </IconButton>
        </Paper>

      </Box>

      <Box sx={{ ...chatBox }}>
        <div style={{ ...styledBotmessage4Welcome }}>
          <div style={{ ...stylebotReference }}>
            <img src={chatbot} alt="chatbot" style={{ ...chatbotImage }} />
            <Typography variant="h6" sx={{ ...chatbotName }}>
              CCSIT CU BOT
            </Typography>
          </div>
          <Typography variant="h6" sx={{ ...botWelcomeMessage }}>
            Welcome to the room Aswanth!👋
          </Typography>
        </div>
        <div style={{ ...userMessage }}>
          <Typography variant="h6" sx={{ ...messageAuthor }}>
            Aswanth
          </Typography>
          <Typography variant="h6" sx={{ ...userMessageContent }}>
            Hiiii
          </Typography>
        </div>
        <div style={{ ...styledBotmessage4Welcome }}>
          <div style={{ ...stylebotReference }}>
            <img src={chatbot} alt="chatbot" style={{ ...chatbotImage }} />
            <Typography variant="h6" sx={{ ...chatbotName }}>
              CCSIT CU BOT
            </Typography>
          </div>
          <Typography variant="h6" sx={{ ...botWelcomeMessage }}>
            Aswanth has left the room.
          </Typography>
        </div>
      </Box>
    </Container>
  );
};

export default Main;