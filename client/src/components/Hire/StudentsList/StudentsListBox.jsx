import React, { useState, useEffect } from 'react';
import { Box, Paper, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import useStyles from './style';

import StudentsList from './List/StudentsList';
import StudentDescription from "./StudentDescription/StudentDescription";

import { getAllResume } from "../../../actions/resume";

const StudentsListBox = ({ search }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [selectedItem, setSelectedItem] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [selectedData, setSelectedData] = useState({});


  const data = useSelector(state => state.resume?.resumes ? state.resume?.resumes : null);

  useEffect(() => {
    dispatch(getAllResume());
  }, []);

  useEffect(() => {
    if (data) {
      setResumeData(data);
    }
  }, [data]);

  useEffect(() => {
    if (selectedItem) {
      const selectedDataGet = data.filter(d => d.userRef === selectedItem);
      setSelectedData(...selectedDataGet);
    }
  }, [selectedItem])



  return (
    <Box className={classes.studentsBox} >
      <Paper className={classes.studentsPaper} elevation={0}>
        <Grid container spacing={2}>

          {!selectedItem && !search &&
            <Grid item xs={12} className={classes.studentsList__lg}>
              {resumeData && resumeData.map(resume => (
                <StudentsList selectedItem={selectedItem} setSelectedItem={setSelectedItem} resume={resume} key={resume.userRef} />
              ))}
            </Grid>
          }
          {!selectedItem && search &&
            <Grid item xs={12} className={classes.studentsList__lg}>
              {resumeData && resumeData?.filter(r => { return r?.username?.toLowerCase().includes(search) || r?.name?.toLowerCase().includes(search) || r?.position?.toLowerCase().includes(search) || r?.skills.some(s => s.toLowerCase().includes(search)) }).map(resume => (
                <StudentsList selectedItem={selectedItem} setSelectedItem={setSelectedItem} resume={resume} key={resume.userRef} />
              ))}
            </Grid>
          }

          {selectedItem && !search &&
            <Grid item xs={12} md={6} lg={8} className={classes.studentsList__lg}>
              {resumeData && resumeData.map(resume => (
                <StudentsList selectedItem={selectedItem} setSelectedItem={setSelectedItem} resume={resume} key={resume.userRef} />
              ))}
            </Grid>
          }
          {selectedItem && search &&
            <Grid item xs={12} md={6} lg={8} className={classes.studentsList__lg}>
              {resumeData && resumeData.filter(r => { return r?.username?.toLowerCase().includes(search) || r?.name?.toLowerCase().includes(search) || r?.position?.toLowerCase().includes(search) || r?.skills.some(s => s.toLowerCase().includes(search)) }).map(resume => (
                <StudentsList selectedItem={selectedItem} setSelectedItem={setSelectedItem} resume={resume} key={resume.userRef} />
              ))}
            </Grid>
          }

          {selectedItem && selectedData &&
            <Grid item xs={12} md={6} lg={4} sx={{ position: 'relative' }}>
              <StudentDescription selectedData={selectedData} setSelectedItem={setSelectedItem} />
            </Grid>
          }
        </Grid>
      </Paper>
    </Box>
  )
}

export default StudentsListBox;