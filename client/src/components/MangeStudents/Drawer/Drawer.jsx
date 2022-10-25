import useStyles from "./style";
import React, { useState } from 'react';
import {useDispatch} from "react-redux";

import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Avatar, Typography } from "@mui/material";
import { PersonAddOutlined, PersonOffOutlined, SaveAsOutlined } from "@mui/icons-material";

import { setActionType } from "../../../features/user";

const studentsArray = [["Add Students", <PersonAddOutlined />, "add"], ["Remove Students", <PersonOffOutlined />, "remove"], ["Edit Details", <SaveAsOutlined />, "edit"]];
const techersArray = [["Add Teachers", <PersonAddOutlined />, "add"], ["Remove Teachers", <PersonOffOutlined />, "remove"], ["Edit Details", <SaveAsOutlined />, "edit"]];

const DrawerComponent = ({ loginedUser, mobileDrawerOpen }) => {

    const classes = useStyles();
    const dispatch=useDispatch();

    const handleActionSelect = (name) => {
        dispatch(setActionType({name:name}))
    };

    const drawer = (
        <div>
            <Toolbar>
                <Box className={classes.avatarBox}>
                    <Avatar className={classes.avatar} src={loginedUser?.profilepic}>
                        <Typography variant="h4">
                            {
                                loginedUser?.name?.charAt(0) ||
                                loginedUser?.username?.charAt(0)
                            }
                        </Typography>
                    </Avatar>
                    <Typography className={classes.loginedUserName}>{loginedUser?.name || loginedUser?.username}</Typography>
                </Box>
            </Toolbar>
            <Divider />
            <List>
                {(loginedUser?.usertype === "teacher") && studentsArray.map((student) => (
                    <ListItem key={student[0]} disablePadding>
                        <ListItemButton id={student[2]} className={classes.listButton} onClick={(e) => handleActionSelect(student[2])}>
                            <ListItemIcon sx={{ color: "#000" }}>
                                {student[1]}
                                {console.log(student[2])}
                            </ListItemIcon>
                            <ListItemText primary={student[0]} />
                        </ListItemButton>
                    </ListItem>
                ))}
                {loginedUser?.usertype ==="hod" && techersArray.map((teacher) => (
                    <ListItem key={teacher[0]} disablePadding onClick={() => handleActionSelect(teacher[2])}>
                        <ListItemButton className={classes.listButton} >
                            <ListItemIcon sx={{ color: "#000" }}>
                                {teacher[1]}
                            </ListItemIcon >
                            <ListItemText primary={teacher[0]} sx={{ color: "#333" }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>
    )

    return (
        <>
            {!mobileDrawerOpen ?
                <Box className={classes.drawerBox} sx={{ height: "inherit" }}>
                    {drawer}
                </Box> :
                <Box className={classes.drawerBox__mobile} sx={{ height: "inherit" }}>
                    {drawer}
                </Box>
            }
        </>
    )
}

export default DrawerComponent;