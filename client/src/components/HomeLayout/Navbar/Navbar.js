import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  IconButton,
  Drawer,
  Button,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import { NavButton } from "./Button";
import { StyledAvatar } from "./Avatar";

import {setLoginTry} from "../../../features/user";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: "4px 4px 0 0",
    backgroundColor: "#FFFFFF !important",
    minHeight: "10%",
    position: "absolute",
    top: "0 important",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navHead: {
    color: "#000000",
  },

  navLeft__lg: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: "0.15",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  navLeft__sm: {
    display: "block",
    position: "relative",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  navCenter__lg: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: "0.7",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  navCenter__sm: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: "0.6",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  navRight__lg: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: "0.15",
    textOverflow:"ellipsis",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  navRight__sm: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  loginButton: {
    backgroundColor: "#6355D5 !important",
    color: "#FFFFFF !important",
  },
  disabled:{
    display:"flex",
    flex: "0.15",
  }
}));

const Navbar = () => {
  const classes = useStyles();
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [user, setUser] = useState(null);
  const [userLogin,setUserLogin]=useState(false)

  console.log(user);

  const pages = [
    ["About", "/about"],
    ["Infrastructure", "/infra"],
    [
      "Library",
      [
        ["E-books", "/lib/ebooks"],
        ["E Journals", "/lib/study-materials"],
      ],
    ],
    [
      "Placement Cell",
      [
        ["Recent Placements", "/placement/recent-placement"],
        ["Upcoming Interviews", "/placement/upcming"],
        ["Connect with Us", "/placement/connect"],
        ["Ask Queries", "/placement/queries"],
        ["Alumni Section", "/placement/alumni"],
      ],
    ],
    ["Hire Students", "/hire"],
    [
      "Events",
      [
        ["Insight", "/events/insight"],
        ["Upcoming Events", "/events/upcoming"],
      ],
    ],
  ];

  const [sideBarOpen, setsideBarOpen] = useState(false);

  const toggleDrawer = (value) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setsideBarOpen(value);
  };

  const handleClick = () => {
    dispatch(setLoginTry({value:true}));
    navigate("/login");
  };

  const response = useSelector((state) =>
    state.user.userData !== "" || localStorage.getItem("user") !== "" ? localStorage.getItem("user") : ""
  );

  console.log(response);


  const loginTry = useSelector((state)=>
  state.user.loginTry
  )

  useEffect(() => {
    setUserLogin(loginTry);
  }, [loginTry]);
  

  useEffect(() => {
    if (response === null) {
      setUser(null);
    } else {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [response]);

  return (
    <AppBar className={classes.appBar} elevation={4}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.navLeft__lg}>
          <Avatar />
          <Typography variant={"h6"} className={classes.navHead}>
            CCSIT CU
          </Typography>
        </div>
        <div className={classes.navLeft__sm}>
          <IconButton onClick={toggleDrawer(true)} className={classes.menuIcon}>
            <MenuIcon />
          </IconButton>

          <Drawer
            anchor="left"
            open={sideBarOpen}
            onClose={toggleDrawer(false)}
            className={classes.drawerSidebar}
          >
            <Sidebar toggleDrawer={toggleDrawer} />
          </Drawer>
        </div>

        <div className={classes.navCenter__lg}>
          {pages.map((p, index) => {
            return <NavButton key={index} page={p} />;
          })}
        </div>

        <div className={classes.navCenter__sm}>
          <Avatar />
          <Typography variant={"h6"} className={classes.navHead}>
            CCSIT CU
          </Typography>
        </div>
        {user ? (
          <>
            <div className={classes.navRight__lg}>
              <Typography variant="p" fontWeight={500} sx={{ color: "black" }}>
                {user.name ? user.name.split(" ")[0] : user.username}
              </Typography>
              <StyledAvatar user={user} />
            </div>
            <div className={classes.navRight__sm}>
              <StyledAvatar user={user} />
            </div>
          </>
        ) : (
          <>
            {!userLogin ? (
              <>
                <div className={classes.navRight__lg}>
                  <Button
                    text="Login"
                    onClick={handleClick}
                    className={classes.loginButton}
                  >
                    Login
                  </Button>
                </div>
                <div className={classes.navRight__sm}>
                  <Button
                    text="Login"
                    onClick={handleClick}
                    className={classes.loginButton}
                  >
                    Login
                  </Button>
                </div>
              </>
            ):(
              <div className={classes.disabled}>
              </div>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
