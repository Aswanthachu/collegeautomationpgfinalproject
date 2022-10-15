import styles from "./Styles";
import {
  Container,
  Paper,
  Typography
} from "@mui/material";
import React,{useState,useEffect,useRef} from "react";
import {useSelector,useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
// import {useTheme,ThemeProvider} from "@mui/styles";

import { io } from "socket.io-client";

import {displaySocketMessages} from "../../features/chat";

import ContactContainer from "./ContactContainer/ContactContainer";
import MessageContanier from "./MessageContainer/MessageContanier";
import OppentUser from "./OppentUser/OppentUser";

import messengerWelcome from "../../images/messengerWelcome.svg";

const ChatRoom = () => {
 
  const [selectedContact,setSelectedContact]=useState(null);
  const [loginedUser, setLoginedUser] = useState("");
  const [activeUsers,setActiveUsers]=useState([]);
  const [messages, setMessages] = useState([]);
  const [active,setActive]=useState(false);
  const [socketMessages,setSocketMessages]=useState("");
  const [typing,setTyping]=useState(null);

  const [finishStatus, setfinishStatus] = useState(false);
  const [tabClose,setTabClose]=useState(false);

  const socket = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  console.log(socketMessages);

  const ENDPOINT='localhost:5000';


  const message = useSelector((state) =>
  state.chat.message !== [] ? state.chat.message : ""
  );

  const response = useSelector((state)=>
  state.user.userData && state.user.userData !== JSON.parse(localStorage.getItem("user")) && state.user.userData
  )

  const user = useSelector((state) =>
  state.user.userData !== "" || localStorage.getItem("user") !== ""
    ? JSON.parse(localStorage.getItem("user"))
    : ""
  );

  useEffect(() => {
    setLoginedUser(user);
  }, [response]);

  useEffect(() => {
    setMessages(message);
  }, [message]);

  const status= activeUsers.some(u=>u.userId === selectedContact);

  useEffect(()=>{
    if(selectedContact){
      console.log(status);
      setActive(status);
    }
  },[selectedContact,status])


  // ############# Socket #############

  useEffect(() => {
    socket.current = io("ws://localhost:8000");

    socket.current.on('getMessage',(message)=>{
      setSocketMessages(message);
    });

    socket.current.on('typingNotification',(notificationData)=>{
      console.log(notificationData)
      setTyping(notificationData)
    })
  }, []);

  useEffect(()=>{
    if(socketMessages && selectedContact){
      if(socketMessages.receiver === loginedUser._id && socketMessages.sender === selectedContact){
        dispatch(displaySocketMessages(socketMessages));
      }
    }
  },[socketMessages])

  useEffect(() => {
    socket.current.emit("addUser", loginedUser._id);
  }, [loginedUser]);

  useEffect(() => {
    socket.current.on("getUser", (users) => {
      setActiveUsers(users)
    });
  },[ENDPOINT,selectedContact,tabClose]);


const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!finishStatus) {
        if (window.confirm("Do you want to go back ?")) {
            socket.current.emit("userPageChanged",JSON.parse(localStorage.getItem('user'))._id);
            setfinishStatus(true);
            navigate("/");
            
        } else {
            window.history.pushState(null, null, window.location.pathname);
            setfinishStatus(false)
        }
    }
}

  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);  
    };
  },[]);


  useEffect(() => {
    const handleTabClose = event => {
      event.preventDefault();
      setTabClose(true);
    };
    window.addEventListener('onbeforeunload', handleTabClose);
    return () => {
      window.removeEventListener('onbeforeunload', handleTabClose);
    };
  }, []);



  return (
    <Container sx={styles.mainContainer}>
      <Paper sx={styles.mainPaper}>
        <ContactContainer selectedContact={selectedContact} setSelectedContact={setSelectedContact} loginedUser={loginedUser}/>
        {selectedContact?
        <>
        <MessageContanier selectedContact={selectedContact} loginedUser={loginedUser} active={active} socket={socket} typing={typing}/>
        <OppentUser selectedContact={selectedContact} messages={messages} active={active}/>
        </>:
            <div style={styles.welcomeBox}>
            <img src={messengerWelcome} alt="" style={styles.welcomeImg} />
            <Typography variant="p" sx={styles.welcomeText}>Get Connected CCSIT CU..  Solve Your Queries..</Typography>
            </div>
        }
      </Paper>
    </Container>
  );
};

export default ChatRoom;
