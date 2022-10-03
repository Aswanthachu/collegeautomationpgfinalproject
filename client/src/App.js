import "./App.css";
import React,{ useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";

import HomeLayout from "./components/HomeLayout/HomeLayout";
import Home from "./components/Home/Home";
import LoginPage from "./components/Home/Login/LoginPage";
import Profile from "./components/Profile/Profile";
import VideoStream from "./components/VideoConference/VideoStream/VideoStream";
import Join from "./components/VideoConference/ConferenceJoin/Join";
import ChatRoom from "./components/ChatRoom/ChatRoom";

import { RoomProvider } from "./context/socketContext";
import AddResume from "./components/AddResume/AddResume";

function App() {
  const [loginedUser, setLoginedUser] = useState(false);
  // const [isLoginTry,setIsLoginTry]=useState(false);

  const loginTry = useSelector((state) => (state.user.loginTry ? true : false));

  const user = localStorage.getItem("user") ? true : false;

  const tokenObj = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : "";
  const { token } = tokenObj;

  console.log(token);

  useEffect(() => {
    setLoginedUser(user);
  }, [user]);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, [token]);

  // useEffect(() => {
  //   setIsLoginTry(true)
  // }, [loginTry]);

  return (
    <div className="App">
      <Router>
        <RoomProvider>
          <Routes>
            <Route path="/" element={<HomeLayout Component={Home} />} />
            <Route
              path="/login"
              element={
                loginTry ? <HomeLayout Component={Home} /> : <Navigate to="/" />
              }
            />
            <Route
              path="/login/types"
              element={
                loginTry ? (
                  <HomeLayout Component={LoginPage} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/videoconference/stream/:id" element={<VideoStream />} />
            <Route path="/videoconference/join" element={<Join />} />
            <Route path="/chatroom" element={<ChatRoom />} />
            <Route path="/add-resume" element={<AddResume />} />
          </Routes>
        </RoomProvider>
      </Router>
    </div>
  );
}

export default App;