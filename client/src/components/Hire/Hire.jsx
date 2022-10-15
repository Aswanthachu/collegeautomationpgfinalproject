import React,{ useState } from 'react';
import { Container} from '@mui/material';

import NavBar from "./NavBar/NavBar";
import StudentsListBox from './StudentsList/StudentsListBox';

import useStyles from "./style";

const Hire = () => {
  const classes=useStyles();

  const [search,setSearch]=useState();

  return (
    <Container className={classes.styledMainContainer}>
      <NavBar setSearch={setSearch} search={search}/>
      <StudentsListBox search={search}/>
    </Container>
  )
}

export default Hire