import { Box, List, Typography, Avatar } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

import {
  EmojiEvents,
  Handshake,
  HelpCenter,
  HomeWork,
  Man,
  MenuBook,
} from "@mui/icons-material";

import { ListItemContent } from "./list";

const useStyles = makeStyles((theme) => ({
  box: {
    padding: 0,
    margin: 0,
  },
  drawer__main: {
    padding: "8px 16px",
    paddingRight: "20%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#D3D3D3",
  },
}));

const Sidebar = ({ toggleDrawer }) => {
  const classes = useStyles();
  return (
    <Box
      sx={{ width: "57vw" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className={classes.box}
    >
      <div className={classes.drawer__main}>
        <Avatar sx={{ width: "60px", height: "60px" }} />
        <Typography variant="p" sx={{ fontWeight: "bold" }}>
          CCSIT CU
        </Typography>
      </div>

      <List sx={{ padding: 0 }}>
        <ListItemContent Icon={HelpCenter} listText="About" disablePadding />
        <ListItemContent Icon={HomeWork} listText="Infrastructure" disablePadding />
        <ListItemContent Icon={MenuBook} listText="Library" disablePadding />
        <ListItemContent Icon={Man} listText="Placement" disablePadding />
        <ListItemContent Icon={Handshake} listText="Hire Students"disablePadding />
        <ListItemContent Icon={EmojiEvents} listText="Events" disablePadding />
      </List>
    </Box>
  );
};

export default Sidebar;
