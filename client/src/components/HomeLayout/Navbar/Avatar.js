import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Badge,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  VoiceChatOutlined,
  PermIdentityOutlined,
  MailOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {Logout} from "../../../features/user";
import {clearLogOutChat} from "../../../features/chat";

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const StyledMenu = ({ Icon, text, onclick,navigate }) => {
  return (
    <>
      {text === "Logout" ? (
        <MenuItem sx={{ padding: "10px 20px 10px 25px", color: "#808080" }} onClick={onclick} >
          <Icon />
          <Typography varinat="p" sx={{ paddingLeft: "1rem" }}>
            {text}
          </Typography>
        </MenuItem>
      ) : (
        <MenuItem sx={{ padding: "10px 20px 10px 25px", color: "#808080" }} onClick={()=>navigate(onclick)}>
          <Icon />
          <Typography varinat="p" sx={{ paddingLeft: "1rem" }}>
            {text}
          </Typography>
        </MenuItem>
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  menuBox: {
    display: "flex",
    alignItems: "center",
    margin: "0 70px 0 20px",
  },
  menuAvatar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: "0.6rem",
  },
  menuUserName: {
    fontSize: "18px",
    fontWeight: "600",
  },
  menuUserType: {
    fontSize: "14px",
    color: "#808080",
  },
  menuDivider: {
    margin: "0 !important",
  },
  menuItem: {
    padding: "0px",
  },
}));

export const StyledAvatar = ({ user }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate =useNavigate();
  const dispatch =useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut=(e)=>{
    e.preventDefault();
    dispatch(Logout());
    dispatch(clearLogOutChat());
  }

  return (
    <>
      <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar src={user.profilepic}>
            {user.name
              ? user.name.charAt(0).toUpperCase()
              : user.username.charAt(0).toUpperCase()}
          </Avatar>
        </StyledBadge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 40,
              height: 40,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box className={classes.menuBox}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar src={user.profilepic}>
              {user.name
                ? user.name.charAt(0).toUpperCase()
                : user.username.charAt(0).toUpperCase()}
            </Avatar>
          </StyledBadge>
          <div className={classes.menuAvatar}>
            <Typography variant="p" className={classes.menuUserName}>
              {user.name || user.username}
            </Typography>
            <Typography variant="p" className={classes.menuUserType}>
              {user.usertype}
            </Typography>
          </div>
        </Box>

        <Divider sx={{ marginTop: "10px" }} />
        <StyledMenu
          Icon={PermIdentityOutlined}
          text="Profile"
          onclick="/profile"
          navigate={navigate}
        />
        {/* || user.usertype === "staff" || user.usertype === "librarian" || user.usertype === "hod" || user.usertype === "placement" */}
        {(user.usertype === "student" || user.usertype === "teacher") &&
        <StyledMenu Icon={MailOutlined} text="Chatroom" onclick="/chatroom" navigate={navigate} />
        }
        {(user.usertype === "student" || user.usertype === "teacher") &&
        <StyledMenu Icon={VoiceChatOutlined} text="Webinar" onclick="/videoconference/join" navigate={navigate} />
        }
        <Divider className={classes.menuDivider} />

        <StyledMenu
          Icon={LogoutOutlined}
          text="Logout"
          onclick={handleLogOut}
          navigate={navigate}
        />
      </Menu>
    </>
  );
};
