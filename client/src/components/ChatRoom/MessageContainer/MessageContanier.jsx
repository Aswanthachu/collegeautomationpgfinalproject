import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  Avatar,
  Badge,
  Typography,
  IconButton,
  TextField,
  // ButtonBase,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Telegram,
  Call,
  Sms,
  Videocam,
  ControlPointOutlined,
  AddPhotoAlternateOutlined,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { css, keyframes } from "@emotion/react";
// import ScrollableFeed from "react-scrollable-feed";

import { sendMessage, getMessages } from "../../../actions/chat";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    //   boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "30px !important",
      height: "30px",
      borderRadius: "50%",
      // animation: 'ripple 1.2s infinite ease-in-out',
      // border: '2px solid currentColor',
      content: '""',
    },
  },
}));

// const typing = keyframes`
// 0% {
//   width: 0

// }
// 90% {
//   width: 0
// }
// 100% {
//   width: 0
// }
// 30% {
//   width:"17.27px"
// }
// 60%{
//   width:"17.27px"
// }
// `;

const useStyle = (theme) => ({
  messageConatiner: {
    width: "50%",
    borderRight: "2px solid #213156bf",
    margin: 0,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    position: "relative",
  },
  messageTopBar: {
    width: "100%",
    height: "14%",
    backgroundColor: "inherit",
    display: "flex",
    justifyContent: "space-between",
    // margin:0
    // padding:"5px 15px",
    borderRadius: "none",
    boxShadow: "none",
    borderBottom: "2px solid #213156bf",
  },
  messageContainerUsername: {
    marginLeft: "10px",
    fontFamily: "poppins",
    color: "#fff",
  },
  messageTopBarLeft: {
    width: "fit-content",
    display: "flex",
    alignItems: "center",
  },
  messageTopBarRight: {
    display: "flex",
    alignItems: "center",
  },
  messageTopBarIcon: {
    backgroundColor: "#0a0a1357",
    color: "white",
    margin: "0 8px",
    [`&.MuiButtonBase-root:hover,&.MuiButtonBase-root:focus,&.MuiButtonBase-root:active`]:
      {
        backgroundColor: "#0a0a1357",
      },
  },

  messageSendSection: {
    backgroundColor: "inherit",
    width: "100%",
    height: "76%",
    display: "flex",
    flexDirection: "column",
    // backgroundColor:"red"
    overflow: "hidden",
    overflowY: "auto",
    position: "relative !important",
    boxShadow: "none",
  },
  messageSection: {
    width: "100%",
    height: "76%",
  },
  // messageBody:{
  //   width:"100%",
  //   display:"flex",
  //   flexDirection:"column",
  //   // backgroundColor:"inherit",
  //   height:"91%",
  //   overflowY:"auto",
  //   overflow:"hidden",
  //   boxShadow:"none"
  // },
  messageContent: {
    // backgroundColor:"red",
    margin: "10px 10px 0 10px",
    width: "fit-content",
    wordWrap: "break-word",
    maxWidth: "45%",
    display: "flex",
    flexDirection: "column",
    float: "right",
  },
  userMessage: {
    marginLeft: "auto",
  },
  imgMessageMain: {
    width: "fit-content",
    height: "fit-content",
    marginBottom: 0,
    paddingBottom: 0,
    margin: "15px 20px 15px 0",
  },
  messageContentImage: {
    margin: "10px 0 0 10px",
    width: "100%",
    height: "100%",
    backgroundColor: "#28324ed9",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
  },
  imgMessage: {
    width: "200px",
    height: "200px",
  },
  messageText: {
    width: "auto",
    // float:"right",
    maxWidth: "100%",
    padding: "8px 10px ",
    fontSize: "15px",
    color: "#fff",
    backgroundColor: "#28324ed9",
    borderRadius: "8px",
    // width:"fit-content",
    fontWeight: "100",
    marginTop: "15px",
  },
  messageTimeStamp: {
    margin: "0 0 0 0",
    padding: "0 9px",
    fontSize: "11px",
    color: "yellowgreen",
  },
  messageSendPaper: {
    // width:"auto",
    height: "10%",
    position: "fixed",
    // bottom:0,
    display: "flex",
    alignItems: "center",
    width: "100%",
    backgroundColor: "red",
    // backgroundColor:"inherit",
    // backgroundColor:"red",
    // zIndex:"999"
  },
  msgTypeField: {
    margin: "25px 5px 25px 0",
    backgroundColor: "#15162559",
    border: "none !important",
    borderRadius: "20px",
    marginLeft: "10px",
    paddingLeft: "0 !important",
    height: "35px",
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    [`& .MuiOutlinedInput-root`]: {
      "& > fieldset": {
        border: "none",
      },
      width: "100%",
      color: "#fff",
      fontFamily: "poppins",
      fontSize: "13px",
      // paddingLeft: "15px",
      padding: "0 important",
    },
    [`& .MuiInputBase-root`]: {
      paddingRight: 0,
    },
  },
  messageBottom: {
    width: "100%",
    height: "10%",
    backgroundColor: "inherit",
    display: "flex",
    justifyContent: "space-between",
    // margin:0
    padding: "5px 0",
    alignItems: "center",
    borderRadius: "none",
    boxShadow: "none",
    borderBottom: "2px solid #213156bf",
  },
  noMessageYet: {
    width: "50%",
    height: "45%",
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  progress: {
    color: "#7962E1",
    position: "absolute",
    top: "40%",
    left: "40%",
    transform: "transalate(-50%,-50%)",
  },
  emojiButton: {
    width: "45px",
    height: "45px",
    [`&.MuiButtonBase-root:active`]: {
      backgroundColor: "inherit",
    },
  },
  emojiPaper: {
    width: "31%",
    height: "fit-content",
  },
  typingStatus: {
    position: "absolute",
    left: "10%",
    top: "60%",
    fontSize: "12px",
    color: "#44b700",
  },
  // animationDots:{
  //   fontSize:"20px",

  //   animation:`$typing 8s steps(4) infinite`
  // },
  // "@keyframes typing": {

  // },
});

const MessageContanier = ({
  selectedContact,
  loginedUser,
  active,
  socket,
  typing,
}) => {
  const styles = useStyle();
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const [selectedUserMessage, setSelectedUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState({
    text: "",
    image: "",
  });
  const [messages, setMessages] = useState([]);

  // const styledType =css`
  //   animation: ${typing} 8s steps(4) infinite;
  // `;

  const emojis = [
    "😃",
    "😁",
    "🤣",
    "😂",
    "😉",
    "😇",
    "😍",
    "👋",
    "🤚",
    "✋",
    "👌",
    "✌️",
    "👍",
    "👎",
    "🤝",
    "🙏",
    "✍️",
    "🙋",
    "🙋‍♂️",
    "👨‍🎓",
    "👩‍🎓",
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "🖤",
    "🤍",
    "💯",
  ];

  const message = useSelector((state) =>
    state.chat.message !== [] ? state.chat.message : ""
  );

  let selected = useSelector((state) =>
    state.chat.contacts
      ? state.chat.contacts.filter((contact) => contact._id === selectedContact)
      : null
  );

  const load = useSelector((state) =>
    state.chat.loading === true ? true : false
  );

  useEffect(() => {
    if (selectedContact) {
      dispatch(getMessages({ id: selectedContact }));
    }
  }, [selectedContact, dispatch]);

  useEffect(() => {
    setSelectedUserMessage(selected[0]);
  }, [selectedContact]);

  useEffect(() => {
    setLoading(load);
  }, [load]);

  useEffect(() => {
    setMessages(message);
  }, [message]);

  useEffect(() => {
    // console.log("hiiii")
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, selectedContact]);

  const handleMessageSend = (e) => {
    setNewMessage({
      ...newMessage,
      text: e.target.value,
    });
    socket.current.emit("messageTyping", {
      receiver: selectedContact,
      sender: loginedUser._id,
    });
  };

  const handleMessageSendClick = (e) => {
    e.preventDefault();
    if (newMessage.text !== "" || newMessage.image !== "") {
      dispatch(sendMessage({ message: newMessage, receiver: selectedContact }));
      const messageToSocket = {
        message: newMessage,
        receiver: selectedContact,
        sender: JSON.parse(localStorage.getItem("user"))._id,
        updatedAt: new Date(),
      };
      socket.current.emit("sendMessage", messageToSocket);
      socket.current.emit("userStopTyping", {
        receiver: selectedContact,
        sender: JSON.parse(localStorage.getItem("user"))._id,
      });
    }
    setNewMessage({
      text: "",
      image: "",
    });
  };

  const convert2base64 = (e) => {
    const files = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewMessage({
        ...newMessage,
        image: reader.result.toString(),
      });
    };
    reader.readAsDataURL(files);
  };

  return (
    <Box sx={styles.messageConatiner}>
      {!loading && selectedUserMessage ? (
        <>
          <Paper sx={styles.messageTopBar}>
            <div style={styles.messageTopBarLeft}>
              {active ? (
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    sx={{ marginLeft: "15px" }}
                    src={selectedUserMessage?.profilepic}
                  >
                    {(selectedUserMessage.name &&
                      selectedUserMessage?.name.charAt(0)) ||
                      selectedUserMessage?.username.charAt(0)}
                  </Avatar>
                </StyledBadge>
              ) : (
                <Avatar
                  sx={{ marginLeft: "15px" }}
                  src={selectedUserMessage?.profilepic}
                >
                  {(selectedUserMessage.name &&
                    selectedUserMessage?.name.charAt(0)) ||
                    selectedUserMessage?.username.charAt(0)}
                </Avatar>
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  position: "relative",
                  height: "50px",
                  padding: 0,
                }}
              >
                <Typography sx={styles.messageContainerUsername}>
                  {(selectedUserMessage?.name && selectedUserMessage?.name) ||
                    selectedUserMessage?.username}
                </Typography>
                {
                typing?.notification &&
                  typing?.receiver === loginedUser._id &&
                  typing?.sender === selectedContact && (
                    <Typography sx={styles.typingStatus}>
                      Typing<span style={styles.animationDots}>....</span>
                    </Typography>
                  )}
              </div>
            </div>
            <div style={styles.messageTopBarRight}>
              <IconButton sx={styles.messageTopBarIcon}>
                <Call />
              </IconButton>
              <IconButton sx={styles.messageTopBarIcon}>
                <Videocam />
              </IconButton>
              <IconButton sx={styles.messageTopBarIcon}>
                <Sms />
              </IconButton>
            </div>
          </Paper>
          <Paper sx={styles.messageSendSection}>
            {messages.length === 0 ? (
              <Box sx={styles.noMessageYet}>
                <Avatar
                  sx={{ width: "100px", height: "100px", fontSize: "20px" }}
                  src={selectedUserMessage?.profilepic}
                >
                  <Typography sx={{ fontSize: "40px" }}>
                    {(selectedUserMessage.name &&
                      selectedUserMessage?.name.charAt(0)) ||
                      selectedUserMessage?.username.charAt(0)}
                  </Typography>
                </Avatar>
                <Typography
                  variant="p"
                  sx={{ fontSize: "22px", fontWeight: "bold", color: "#fff" }}
                >
                  {selectedUserMessage?.name || selectedUserMessage?.username}
                  {"   "}
                  is connected
                </Typography>
                <Typography variant="p" sx={{ color: "#fff" }}>
                  4 days ago
                </Typography>
              </Box>
            ) : (
              <div
                style={{
                  height: "76%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {messages.map((m, index) =>
                  m.message.text !== "" ? (
                    <>
                      <div
                        style={{
                          ...styles.messageContent,
                          ...(m.senderId === loginedUser._id &&
                            styles.userMessage),
                        }}
                        key={index}
                      >
                        <Typography variant="p" sx={styles.messageText}>
                          {m.message.text}
                        </Typography>
                        <Typography
                          variant="p"
                          sx={{
                            ...styles.messageTimeStamp,
                            ...(m.senderId === loginedUser._id &&
                              styles.userMessage),
                          }}
                        >
                          {moment(m.createdAt).fromNow()}
                        </Typography>
                      </div>
                      <div ref={scrollRef}></div>
                    </>
                  ) : (
                    <>
                      <div
                        style={{
                          ...styles.imgMessageMain,
                          ...(m.senderId === loginedUser._id &&
                            styles.userMessage),
                        }}
                        key={index}
                      >
                        <div style={styles.messageContentImage}>
                          <img
                            src={m.message.image}
                            alt=""
                            style={styles.imgMessage}
                          />
                        </div>
                        <Typography
                          variant="p"
                          sx={{
                            ...styles.messageTimeStamp,
                            width: "100%",
                            // marginLeft: "5px",
                            // paddingTop: "-10px",
                            // marginTop: "-10px",
                            // marginBottom:"10px",
                            ...(m.senderId === loginedUser._id &&
                              styles.userMessage),
                          }}
                        >
                          {moment(m.createdAt).fromNow()}
                        </Typography>
                      </div>
                      <div ref={scrollRef}>{"  "}</div>
                    </>
                  )
                )}
              </div>
            )}
          </Paper>
          <Paper sx={styles.messageBottom}>
            <IconButton sx={styles.messageTopBarIcon}>
              <ControlPointOutlined />
            </IconButton>
            <div>
              <IconButton sx={styles.messageTopBarIcon} component="label">
                <input
                  hidden
                  // style={{width:"100%",height:"100%"}}
                  accept="image/*"
                  type="file"
                  onChange={(e) => convert2base64(e)}
                />
                <AddPhotoAlternateOutlined />
              </IconButton>
            </div>
            <IconButton sx={styles.messageTopBarIcon}>
              <ControlPointOutlined />
            </IconButton>
            <IconButton sx={styles.messageTopBarIcon}>
              <ControlPointOutlined />
            </IconButton>
            <TextField
              autoComplete="off"
              placeholder="Type Something.."
              sx={styles.msgTypeField}
              InputProps={{
                // endAdornment: <ButtonBase style={styles.emojiButton} onClick={() => 0}>😃</ButtonBase>,
                endAdornment: (
                  <IconButton sx={styles.emojiButton} onClick={() => 0}>
                    😃
                  </IconButton>
                ),
                autoComplete: "off",
              }}
              onChange={handleMessageSend}
              value={newMessage.text}
              onKeyPress={(e) => e.key === "Enter" && handleMessageSendClick(e)}
            />
            <IconButton sx={styles.messageTopBarIcon}>
              <Telegram
                sx={{ color: "yellowgreen" }}
                onClick={handleMessageSendClick}
              />
            </IconButton>
          </Paper>
          {/* <Paper sx={styles.emojiPaper}>
            {emojis.map((em,index )=><span key={index} >{em}</span>)}
          </Paper> */}
        </>
      ) : (
        <CircularProgress sx={styles.progress} size="15%" />
      )}
    </Box>
  );
};

export default MessageContanier;
