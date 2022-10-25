import React from 'react';
import { Paper, Avatar, Typography, Stack, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

import useStyles from './style';
import StudentDetails from './StudentDetails';

const StudentDescription = ({ selectedData, setSelectedItem }) => {
    const classes = useStyles();

    const handleClose = (e) => {
        e.preventDefault();
        setSelectedItem(null);
    };

    function randomColor() {
        let hex = Math.floor(Math.random() * 0xFFFFFF);
        let color = "#" + hex.toString(16);
    
        return color;
      }

    return (
        <Paper className={classes.studentDescriptionMain}>
            <Paper className={classes.studentDetailsPaper} elevation={0}>
                <IconButton className={classes.closeButton} onClick={(e) => handleClose(e)}>
                    <Close sx={{ color: "#000" }} />
                </IconButton>
                <Avatar className={classes.avatar} src={selectedData?.profilepic} sx={{backgroundColor:randomColor()}}>
                    <Typography variant="h2">
                        {
                            selectedData?.name?.charAt(0)?.toUpperCase() ||
                            selectedData?.username?.charAt(0)?.toUpperCase()
                        }
                    </Typography>
                </Avatar>
                <div className={classes.studentDetailsHead}>
                    <Typography className={classes.studentDetailsName}>{selectedData?.name || selectedData?.username}</Typography>
                    <Typography className={classes.studentDetailsTypography}>{selectedData?.position}</Typography>
                </div>
            </Paper>
            <Paper elevation={0}>
                <Stack direction="column" spacing={3} className={classes.descriptionStack}>
                    {selectedData && <StudentDetails selectedData={selectedData} />}
                </Stack>
            </Paper >
        </Paper>
    )
}

export default StudentDescription;