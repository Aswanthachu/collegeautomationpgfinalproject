import { useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  FormHelperText,
  ButtonBase,
  Modal,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import leftloginpage from "../../images/leftloginpage.svg";
import { signIn, signUp } from "../../../actions/user";
import {closeUpdateSnackBar} from "../../../features/user";

import UpdatePassword from "../../Profile/UpdatePassword";


const useStyles = makeStyles((theme) => ({
  loginTypeBox: {
    width: "50%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative !important",
  },
  loginTypePaper: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    height: "45%",
    padding: "10%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  leftloginImage: {
    width: "40%",
    height: "30%",
    position: "absolute",
    bottom: "0",
    left: "0",
    zIndex: 0,
  },
  rightLoginImage: {
    height: "92%",
    width: "92%",
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loginTextFeild: {
    "& .MuiOutlinedInput-root:hover": {
      "& > fieldset": {
        borderColor: "red",
        outlineWidth: 1,
      },
    },
  },
}));



const LoginTypes = ({ left, image, type }) => {
  const classes = useStyles();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [messages, setMessages] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modalOpen,setModalOpen]=useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const clear = () => {
    setLogin({
      ...login,
      username: "",
      password: "",
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(signUp({ userData: { ...login, type }, navigate }));
  //   clear();
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    clear();
    dispatch(signIn({ userData: { ...login, type }, navigate, dispatch }));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const message = useSelector((state) =>
    state.user.message !== "" ? state.user.message : ""
  );


  const handleCloseModel = () => {
    dispatch(closeUpdateSnackBar());
    setTimeout(() => setModalOpen(false),100)

  };
  const handleOpenModal=()=>setModalOpen(true);

  useEffect(() => {
    setMessages(message);
  }, [message]);

  return (
    <>
      {left ? (
        <>
          <Box className={classes.loginTypeBox}>
            <img src={image} alt="" className={classes.rightLoginImage} />
          </Box>
          <Box className={classes.loginTypeBox}>
            {/* <img src={leftloginpage} alt="" className={classes.leftloginImage}/> */}
            <Paper className={classes.loginTypePaper} elevation={9}>
              <Typography
                variant="p"
                gutterBottom
                fontSize="35px"
                sx={{ color: "#6355D5" }}
              >
                Login
              </Typography>
              <form
                onSubmit={handleSubmit}
                className={classes.loginForm}
                // autocomplete="off"
              >
                <TextField
                  id="my-input"
                  name="username"
                  label="Username"
                  type="text"
                  value={login.username}
                  onChange={handleChange}
                  sx={{
                    width: "100%",
                    margin: "15px 0",
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": {
                        border: "2px solid #906EE8",
                      },
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset": {
                        borderColor: "#906EE8",
                      },
                    },
                    "& .MuiOutlinedInput-root:hover": {
                      "& > fieldset": {
                        borderColor: "#6355D5",
                        outlineWidth: 1,
                      },
                    },
                  }}
                  inputProps={{ style: { textTransform: "uppercase" } }}
                  size="small"
                  required
                />

                <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={login.password}
                  onChange={handleChange}
                  // className={classes.loginTextFeild}
                  size="small"
                  required
                  sx={{
                    width: "100%",
                    margin: "15px 0",
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": {
                        border: "2px solid #906EE8",
                      },
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset": {
                        borderColor: "#906EE8",
                      },
                    },
                    "& .MuiOutlinedInput-root:hover": {
                      "& > fieldset": {
                        borderColor: "#6355D5",
                        outlineWidth: 1,
                      },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff sx={{ color: "#906EE8" }} />
                          ) : (
                            <Visibility sx={{ color: "#906EE8" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormHelperText sx={{ color: "red", fontSize: "15px",textAlign:"center" }}>
                  {!modalOpen && messages !== "" && `${messages},Try again.`}
                </FormHelperText>

                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    marginTop: "20px",
                    background:
                      "linear-gradient(to left ,#7962E1 0% ,#906EE8 100% )",
                  }}
                >
                  Submit
                </Button>
              </form>
              <ButtonBase sx={{ marginTop: "13px" }} onClick={handleOpenModal}>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "15px", color: "#7962E1" }}
                >
                  Forgot Password ?
                </Typography>
              </ButtonBase>
            </Paper>
          </Box>
          <Modal
            open={modalOpen}
            onClose={handleCloseModel}
          >
              <UpdatePassword type={type}/>
          </Modal>
        </>
      ) : (
        <>
          <Box className={classes.loginTypeBox}>
            {/* <img src={leftloginpage} alt="" className={classes.leftloginImage}/> */}
            <Paper className={classes.loginTypePaper} elevation={9}>
              <Typography
                variant="p"
                gutterBottom
                fontSize="35px"
                sx={{ color: "#6355D5" }}
              >
                Login
              </Typography>
              <form onSubmit={handleSubmit} className={classes.loginForm}>
                <TextField
                  id="my-input"
                  name="username"
                  label="Username"
                  type="text"
                  value={login.username}
                  onChange={handleChange}
                  sx={{
                    width: "100%",
                    margin: "15px 0",
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": {
                        border: "2px solid #906EE8",
                      },
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset": {
                        borderColor: "#906EE8",
                      },
                    },
                    "& .MuiOutlinedInput-root:hover": {
                      "& > fieldset": {
                        borderColor: "#6355D5",
                        outlineWidth: 1,
                      },
                    },
                  }}
                  // className={classes.loginTextFeild}
                  size="small"
                  required
                  inputProps={{ style: { textTransform: "uppercase" } }}
                  // error
                />

                <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={login.password}
                  onChange={handleChange}
                  // className={classes.loginTextFeild}
                  size="small"
                  required
                  sx={{
                    width: "100%",
                    margin: "15px 0",
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": {
                        border: "2px solid #906EE8",
                      },
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset": {
                        borderColor: "#906EE8",
                      },
                    },
                    "& .MuiOutlinedInput-root:hover": {
                      "& > fieldset": {
                        borderColor: "#6355D5",
                        outlineWidth: 1,
                      },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff sx={{ color: "#906EE8" }} />
                          ) : (
                            <Visibility sx={{ color: "#906EE8" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                  {!modalOpen && messages !== "" && `${messages},Try again.`}
                </FormHelperText>

                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    marginTop: "20px",
                    background:
                      "linear-gradient(to left ,#7962E1 0% ,#906EE8 100% )",
                  }}
                >
                  Submit
                </Button>
              </form>
              <ButtonBase sx={{ marginTop: "13px" }} onClick={handleOpenModal}>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "15px", color: "#7962E1" }}
                >
                  Forgot Password ?
                </Typography>
              </ButtonBase>
            </Paper>
          </Box>
          <Box className={classes.loginTypeBox}>
            <img src={image} alt="" className={classes.rightLoginImage} />
          </Box>

          <Modal
            open={modalOpen}
            onClose={handleCloseModel}
          >
              <UpdatePassword type={type}/>
          </Modal>
        </>
      )}
    </>
  );
};

export default LoginTypes;
