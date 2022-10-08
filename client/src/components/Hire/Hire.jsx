import React from 'react';
import { Container} from '@mui/material';

import NavBar from "./NavBar/NavBar";
import StudentsList from './StudentsList/StudentsList';

import useStyles from "./style";

const Hire = () => {
  const classes=useStyles();
  return (
    <Container className={classes.styledMainContainer}>
      <NavBar />
      <StudentsList />
    </Container>
  )
}

export default Hire