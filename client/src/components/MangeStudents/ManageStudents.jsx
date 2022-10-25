import useStyles from './style';
import React, { useState,useEffect } from 'react';
import { Container, CssBaseline, Paper,Box } from "@mui/material";

import DrawerComponent from "./Drawer/Drawer";
import FieldBox from './FieldBox/FieldBox';

const ManageStudents = () => {
  const classes = useStyles();
  const [loginedUser, setLoginedUser] = useState("");

  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  useEffect(() => {
    if(user) setLoginedUser(user);
  }, []);

return (
  <>
    <CssBaseline />
    <Container className={classes.styledMainContainer}>
      <Paper className={classes.mainBox} elevation={3} position="relative">
        <DrawerComponent loginedUser={loginedUser}/>
        <Box className={classes.contentBox}>
          <FieldBox loginedUser={loginedUser}/>
        </Box>
      </Paper>
    </Container>
  </>
)
}

export default ManageStudents;