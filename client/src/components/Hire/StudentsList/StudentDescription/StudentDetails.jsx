import React from 'react';
import { Typography,Button } from '@mui/material';
import {Download} from "@mui/icons-material";
import useStyles from './style';

const StudentDetails = ({ selectedData }) => {
  const classes = useStyles();
  console.log(selectedData.studentResume)

  const handleDownload=() => {
    const linkSource = `${selectedData.studentResume}`;
    const downloadLink = document.createElement("a");
    const fileName = selectedData.name ? `${selectedData.name}.pdf` : `${selectedData.username}.pdf`;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
}

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between",marginTop:"19px" }}>
        <Typography className={classes.studentDetailsTypography}>Position :</Typography>
        <Typography className={classes.studentDetailsTypography}>{selectedData.position}</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" ,marginTop:"19px" }}>
        <Typography className={classes.studentDetailsTypography}>Bio :</Typography>
        <Typography className={classes.studentDetailsTypography}>{selectedData.bio}</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop:"19px" }}>
        <Typography className={classes.studentDetailsTypography}>Phone :</Typography>
        <Typography className={classes.studentDetailsTypography}>{selectedData.phone}</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop:"19px" }}>
        <Typography className={classes.studentDetailsTypography}>Email :</Typography>
        <Typography className={classes.studentDetailsTypography}>{selectedData.email}</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" ,marginTop:"19px" }}>
        <Typography className={classes.studentDetailsTypography}>LinkedIn :</Typography>
        <Typography className={classes.studentDetailsTypography}>{selectedData.linkedin}</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop:"19px" }}>
        <Typography className={classes.studentDetailsTypography}>Github :</Typography>
        <Typography className={classes.studentDetailsTypography}>{selectedData.github}</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" ,marginTop:"19px" }}>
        <Typography className={classes.studentDetailsTypography}>Skills :</Typography>
        <Typography className={classes.studentDetailsTypography}>{selectedData.skills?.join(',')}</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop:"19px" }}>
        <Typography className={classes.studentDetailsTypography}>Location :</Typography>
        <Typography className={classes.studentDetailsTypography}>{selectedData.address}</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" ,marginTop:"19px" }}>
        <Typography className={classes.studentDetailsTypography}>Download Resume :</Typography>
        <Button variant="contained" size="small">
          <Download sx={{width:"17px",height:"17px",marginRight:"5px"}} onClick={(e)=>handleDownload(e)}/>
          <Typography sx={{fontSize:"12px"}}>Download</Typography>
        </Button>
      </div>
    </>
  )
}

export default StudentDetails;
