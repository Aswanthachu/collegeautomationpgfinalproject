import React from 'react';
import { Paper, Avatar, Typography, Button } from '@mui/material';

import useStyles from './style';

const StudentsList = ({ selectedItem, setSelectedItem, resume }) => {
  const classes = useStyles();

  const handleUserView = (e) => {
    e.preventDefault();
    setSelectedItem(e.target.id);
  }

  function randomColor() {
    let hex = Math.floor(Math.random() * 0xFFFFFF);
    let color = "#" + hex.toString(16);

    return color;
  }

  return (
    <Paper className={classes.listPaper} elevation={1} sx={{ justifyContent: "space-between" }} >
      <Avatar sx={{ bgcolor: randomColor() }} variant="rounded" src={resume.profilepic}>
        <Typography variant="h4">
          {
            resume.name?.charAt(0).toUpperCase() ||
            resume.username?.charAt(0).toLowerCase()
          }
        </Typography>
      </Avatar>
      <Typography className={classes.listTypography}>
        {resume?.name || resume?.username}
      </Typography >
      <Typography className={classes.listTypography}>
        {resume?.position}
      </Typography>
      {!selectedItem &&
        <Typography className={classes.listTypography__md}>
          {resume?.email}
        </Typography>
      }
      {!selectedItem &&
        <Typography className={classes.listTypography__lg} >
          {resume?.phone}
        </Typography>
      }
      <Button variant="contained" size="small" id={resume?.userRef} onClick={(e) => handleUserView(e)}>
        View
      </Button>
    </Paper>
  )
}

export default StudentsList;