import useStyles from "./style";
import React, { useState, useEffect } from 'react';
import { Box, Button, Dialog, FormControl, Snackbar, IconButton, Alert, Slide, TextField, Typography, Avatar, Select, MenuItem, InputLabel, DialogActions, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import { Report, Close } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import moment from "moment";

import { userAction} from "../../../../actions/user";
import { closeUpdateSnackBar } from "../../../../features/user";

import studentEditPage from "../../../../images/studentEditPage.svg";
import react from "../../../../images/react.svg";



const UserComponents = ({ loginedUser, actions }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [search, setSearch] = useState(null);
  const [msg, setMsg] = useState("");
  const [userValues, setUserValues] = useState({
    username: "",
    password: "",
    email: "",
    stream: "",
    startYear: dayjs(`${moment().toISOString()}`),
    endYear: dayjs(`${moment().toISOString()}`)
  });
  const [open, setOpen] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState("");
  const [snackOpen, setSnackOpen] = useState({
    success: false,
    error: false
  });
  const [messageFromState, setMessageFromState] = useState({
    successMessage: "",
    errorMessage: ""
  });

  console.log(messageFromState)

  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    console.log(e.target.value)
    setUserValues(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  };

  const handleChangeStartYear = (value) => {
    console.log(value)
    setUserValues(prevState => ({
      ...prevState,
      startYear: dayjs(`${value}`)
    }))
  };

  const handleChangeEndYear = (value) => {
    setUserValues(prevState => ({
      ...prevState,
      endYear: dayjs(`${value}`)
    }))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    dispatch(userAction({ userValues: { ...userValues, verifyPassword: verifyPassword }, action }));
    
    setUserValues(prevState=>({
      ...prevState,
      password: "",
      email: "",
      startYear: dayjs(`${moment().toISOString()}`),
      endYear: dayjs(`${moment().toISOString()}`)
    }));

  setVerifyPassword("");

  };

  const handlePassword = (e) => {
    setVerifyPassword(e.target.value);
  }

  const actionGet = () => {
    for (let key in actions) {
      if (actions[key] === true) return key;
    }
  };
  const action = actionGet();

  const searchedUser = useSelector(state => state.user.searchedUser ? state.user.searchedUser : null);
  const message = useSelector(state => state.user.message ? state.user.message : "");

  const stateSuccMessage = useSelector(state => state.user.successMessage ? state.user.successMessage : "");
  const stateErrorMessage = useSelector(state => state.user.errorMessage ? state.user.errorMessage : "");

  useEffect(() => {
    setSearch(searchedUser);
  }, [searchedUser]);

  useEffect(() => {
    setMsg(message);
  }, [message]);



  // ######### Snack Bar #######

  useEffect(() => {
    if (stateSuccMessage) {
      setMessageFromState(prevState => ({
        ...prevState,
        successMessage: stateSuccMessage,
        errorMessage: ""
      }));
      setSnackOpen(prevState => ({
        ...prevState,
        success: true,
        error: false
      }));
    }
    if (stateErrorMessage) {
      setMessageFromState(prevState => ({
        ...prevState,
        errorMessage: stateErrorMessage,
        successMessage: ""
      }));
      setSnackOpen(prevState => ({
        ...prevState,
        error: true,
        success: false    
      }));
    }
  }, [stateSuccMessage, stateErrorMessage])


  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(closeUpdateSnackBar());
    setSnackOpen(prevState => ({
      ...prevState,
      success: false,
      error: false
    }));
    setMessageFromState(prevState => ({
      ...prevState,
      errorMessage: "",
      successMessage: ""
    }));
  };

  const snackActions = (
    <IconButton
      size="small"
      color="inherit"
      onClick={handleSnackClose}
    >
      <Close fontSize="small" />
    </IconButton>
  );



  return (
    <>
      <Box className={classes.mainBox}>
        {action ?
          <>
            <Box className={classes.textFieldContainerBox}>
              {loginedUser?.usertype === "teacher" ?
                <Typography className={classes.heading}>{action.charAt(0).toUpperCase() + action.slice(1)} Student</Typography>
                : loginedUser?.usertype === "hod" &&
                <Typography className={classes.heading}>{action.charAt(0).toUpperCase() + action.slice(1)} Teacher</Typography>
              }
              <form onSubmit={handleClickOpen}>
                <div className={classes.formControl}>
                  <Typography className={classes.textFieldLabel} >UserName</Typography>
                  <TextField variant="outlined" autoComplete="off" required className={classes.textField} name="username" value={userValues.username} onChange={handleChange} />
                </div>

                {!(action === "remove") && <> <div className={classes.formControl}>
                  <Typography className={classes.textFieldLabel}>Password</Typography>
                  <TextField variant="outlined" required className={classes.textField} name="password" value={userValues.password} type="password" onChange={handleChange} />
                </div>
                  <div className={classes.formControl}>
                    <Typography className={classes.textFieldLabel}>Email</Typography>
                    <TextField variant="outlined" autoComplete="off" required className={classes.textField} name="email" type="email" value={userValues.email} onChange={handleChange} />
                  </div>
                </>}

                {!(action === "remove") && <div className={classes.dropDownBox}>
                  <FormControl size="small">
                    <InputLabel id="stream-select-label">Stream</InputLabel>
                    <Select
                      label="Stream"
                      name="stream"
                      labelId="stream-select-label"
                      value={userValues.stream}
                      onChange={handleChange}
                      className={classes.streamSelect}
                    >

                      <MenuItem value={"cs"}>Msc C S</MenuItem>
                      <MenuItem value={"mca"}>MCA</MenuItem>
                    </Select>
                  </FormControl >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className={classes.datePickerDiv}>
                      <FormControl className={classes.firstDatePicker}>
                        <DesktopDatePicker
                          label="Start Year"
                          inputFormat="MM/DD/YYYY"
                          name="startYear"
                          value={userValues.startYear}
                          onChange={handleChangeStartYear}
                          renderInput={(params) => <TextField size="small" {...params} />}
                          className={classes.deskTopDatePicker}
                        />
                      </FormControl>
                      <FormControl className={classes.secondDatePicker}>
                        <DesktopDatePicker
                          label="End Year"
                          inputFormat="MM/DD/YYYY"
                          value={userValues.endYear}
                          onChange={handleChangeEndYear}
                          renderInput={(params) => <TextField size="small" name="endYear" {...params} />}
                          className={classes.deskTopDatePicker}
                        />
                      </FormControl>
                    </div>
                    <div className={classes.datePickerDivMobile}>
                      <MobileDatePicker
                        label="Start Year"
                        inputFormat="MM/DD/YYYY"
                        name="startYear"
                        value={userValues.startYear}
                        onChange={handleChangeStartYear}
                        renderInput={(params) => <TextField size="small" {...params} />}
                      />
                      <FormControl sx={{ marginLeft: 1 }}>
                        <MobileDatePicker
                          label="End Year"
                          inputFormat="MM/DD/YYYY"
                          name="endYear"
                          value={userValues.endYear}
                          onChange={handleChangeEndYear}
                          renderInput={(params) => <TextField size="small" {...params} />}
                        />
                      </FormControl>
                    </div>
                  </LocalizationProvider>
                </div>}
                <div className={classes.buttonDiv}>
                  <Button type="submit" variant="outlined" className={classes.submitButton} >
                    {action.charAt(0).toUpperCase() + action.slice(1)}
                  </Button>
                </div>
              </form>
            </Box>
            <Box className={classes.imageBox}>
              <img src={studentEditPage} alt="" className={classes.img} />
            </Box>
          </> :
          <>
            {/* ###### user Description ############# */}

            {search && <Box className={classes.containerBoxUser}>
              {search.profilepic &&
                <Box className={classes.avatarBox}>
                  <Avatar src={search.profilepic} className={classes.userAvatar} />
                  <Typography className={classes.userDetailsName}>{search.name}</Typography>
                </Box>
              }
              <div className={classes.userDetailsBox}>
                <Typography className={classes.userDetailsName}>UserName</Typography>
                <span className={classes.colon}>:</span>
                <Typography className={classes.userDetailsName}>{search.username}</Typography>
              </div>
              <div className={classes.userDetailsBox}>
                <Typography className={classes.userDetailsName}>Course</Typography>
                <span className={classes.colon}>:</span>
                <Typography className={classes.userDetailsName}>{search.stream}</Typography>
              </div>
              <div className={classes.userDetailsBox}>
                <Typography className={classes.userDetailsName}>Course Period</Typography>
                <span className={classes.colon}>:</span>
                <Typography className={classes.userDetailsName}>{new Date(search?.batch[0]?.startYear)?.getFullYear() + " -  " + new Date(search?.batch[0]?.endYear)?.getFullYear()}</Typography>
              </div>
            </Box>}

            {msg && !search && <Box className={classes.containerBoxUserNot}>
              <Report className={classes.reportIcon} />
              <Typography className={classes.reportText}>{message}</Typography>
            </Box>}

            {(msg || action || search) &&
              <Box className={classes.imageBox}>
                <img src={studentEditPage} alt="" className={classes.img} />
              </Box>}


            {/* ##### Empty Image ############ */}
            {!msg && !search &&
              <img src={react} alt="" className={classes.reactImage} />
            }

          </>
        }
      </Box >
      <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Confirm to ${action} a student`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please Enter Your Password..
          </DialogContentText>
          <TextField sx={{ marginTop: 2 }} onChange={handlePassword} value={verifyPassword} type="password" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Exit</Button>
          <Button onClick={handleSubmit}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <div>
        {messageFromState.successMessage && <Snackbar
          open={snackOpen.success}
          autoHideDuration={6000}
          onClose={handleSnackClose}
          action={snackActions}
        >
          <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
            {messageFromState.successMessage}
          </Alert>
        </Snackbar>}
        {messageFromState.errorMessage && <Snackbar
          open={snackOpen.error}
          autoHideDuration={6000}
          onClose={handleSnackClose}
          action={snackActions}
        >
          <Alert onClose={handleSnackClose} severity="error" sx={{ width: '100%' }}>
            {messageFromState.errorMessage}
          </Alert>
        </Snackbar>}
      </div>
    </>
  )
}

export default UserComponents;