import {
  Divider,
  Paper,
  Typography,
  Button,
  TextField,
  FormHelperText,
  ButtonBase,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { CheckCircleRounded, Send, VerifiedUser } from "@mui/icons-material";

import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { requestOtp, verifyOtp, verifyPassword } from "../../actions/user";

const useStyles = makeStyles((theme) => ({
  mobileCode: {
    padding: "0 15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  otpForm: {
    marginTop: "25px",
    padding: "0 35px",
    display: "flex",
    alignItems: "center",
  },
  otpField: {
    width: "150px",
  },
  otpVerify: {
    display: "flex",
    padding: "0 40px 5px 40px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  confirmPassword: {
    display: "flex",
    flexDirection: "column",
  },
  passwordTextField: {
    width: "50%",
    margin: "0 20px !important",
  },
  confirmPassword__below: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  changePassHelper: {
    display: "flex",
    justifyContent:"center",
    alignItems:"center",
  },
  mobileCodeTextField: {
    display: "flex",
    alignItems: "center",
  },
  otpUsername: {
    margin: "0 0 10px 67px !important",
  },
  otpMobile: {
    margin: "0 0 10px 10px !important",
  },
  mobileCodeTextFieldButton: {
    display: "flex",
    marginTop: "10px",
    alignItems: "center",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UpdatePassword = ({userId,notModal, type }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [reqOtp, setreqOtp] = useState(false);
  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState({
    pass: "",
    cpass: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [guestChange, setGuestChange] = useState({
    username: "",
    mobile: "",
  });
  const [successMessage,setSuccessMessage]=useState("");


  const successMessages = useSelector((state) =>
  state.user.successMessage !== "" ? state.user.successMessage : ""
);

  const errorMessages = useSelector((state) =>
  state.user.errorMessage !== "" ? state.user.errorMessage : ""
);

  const Id = useSelector((state) => state.user.userId);

  const handlePassChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleGuestChange = (e) => {
    setGuestChange({
      ...guestChange,
      [e.target.name]: e.target.value,
    });
  };

  const handleOtpSend = () => {
    if (userId) dispatch(requestOtp({ userId, setreqOtp,setErrorMessage }));
    else
      dispatch(
        requestOtp({
          guestVerifyData: { ...guestChange, type: type },
          setreqOtp,
          setErrorMessage,
          setGuestChange
        })
      );
  };

  const handleOtpsendAgain = () => {
    dispatch(requestOtp({userId:(userId || Id)}));
  };

  const handleOtpText = (e) => {
    setOtp(e.target.value);
  };

  const otpVerifyClick = () => {
    setGuestChange({
      ...guestChange,
      password:"",
      phone:""
    })
    dispatch(verifyOtp({ otp, setVerified, setreqOtp, setOtp,setErrorMessage,setSuccessMessage}));
  };

  const handlePassVerify = () => {
    dispatch(verifyPassword({ password, Id, setVerified, setPassword,setErrorMessage }));
  };

  useEffect(() => {
    setErrorMessage(errorMessages);
  }, [errorMessages]);

  useEffect(()=>{
    setSuccessMessage(successMessages);
},[successMessages]);


  return (
    <Paper
      sx={{
        ...(!notModal ? { ...style } : { height: "55%", borderRadius: "20px" }),
      }}
    >
      {notModal && (
        <>
          <Typography
            variant="h6"
            sx={{ display: "flex", padding: "20px 0 0 20px" }}
          >
            Change Password
          </Typography>
          <Divider sx={{ margin: "10px" }} />
        </>
      )}
      {reqOtp ? (
        <>
          <form action="" className={classes.otpForm}>
            <TextField
              required
              className={classes.otpField}
              size="small"
              type="tel"
              name="otp"
              value={otp}
              onChange={handleOtpText}
              sx={{
                padding: 0,
                [`&.MuiOutlinedInput-root`]: {
                  padding: "0",
                },
              }}
            />
            <Typography sx={{ marginLeft: "10px" }}>Type OTP Here.</Typography>
            <Button
              variant="contained"
              endIcon={<CheckCircleRounded />}
              sx={{
                background:
                  "linear-gradient(to left ,#7962E1 0% ,#906EE8 100% )",
                height: "30px",
                marginLeft: "18%",
              }}
              onClick={otpVerifyClick}
            >
              Verify
            </Button>
          </form>
          <div className={classes.otpVerify}>
            <h6>Timer Componet</h6>
            
            <ButtonBase onClick={handleOtpsendAgain}>
              <Typography variant="p">
                OTP is not received,Send again
              </Typography>
            </ButtonBase>
            
          </div>
          <FormHelperText
            sx={{ color: "red",fontSize:"16px"}}
            className={classes.changePassHelper}
          >
            {errorMessage !== "" &&  `${errorMessage}`}
          </FormHelperText>
        </>
      ) : verified ? (
        <>
          <div className={classes.confirmPassword}>
            <TextField
              label="Enter Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
              name="pass"
              value={password.pass}
              onChange={handlePassChange}
              className={classes.passwordTextField}
              required
            />
            <div className={classes.confirmPassword__below}>
              <TextField
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                name="cpass"
                value={password.cpass}
                onChange={handlePassChange}
                className={classes.passwordTextField}
                required
              />
              <Button
                variant="contained"
                endIcon={<VerifiedUser />}
                sx={{
                  background:
                    "linear-gradient(to left ,#7962E1 0% ,#906EE8 100% )",
                  minWidth: "20%",
                  ...(!notModal? {margin: "5% 0 0 20px"}:{margin:"4% 10% 0 0" }) 
                }}
                onClick={handlePassVerify}
              >
                Confirm
              </Button>
            </div>
          </div>
          <FormHelperText
            sx={{ color: "red", fontSize: "16px", marginTop: "15px" }}
            className={classes.changePassHelper}
          >
            {!successMessage && errorMessage !== "" &&  `${errorMessage}`}
          </FormHelperText>
          {!notModal && (
            <FormHelperText
              sx={{
                color: "green",
                fontSize: "16px",
                marginTop: "0 !important",
              }}
              className={classes.changePassHelper}
            >
              {successMessage !== "" &&  `${successMessage}`}
            </FormHelperText>
          )}
        </>
      ) : (
        <>
          <div className={classes.mobileCode}>
            {!notModal && (
              <>
                <div className={classes.mobileCodeTextField}>
                  <Typography>Username</Typography>
                  <TextField
                    id="my-input"
                    name="username"
                    type="text"
                    value={guestChange.username}
                    onChange={handleGuestChange}
                    className={classes.otpUsername}
                    inputProps={{ style: { textTransform: "uppercase" } }}
                    size="small"
                    required
                  />
                </div>
                <div className={classes.mobileCodeTextField}>
                  <Typography>Registered Mobile</Typography>
                  <TextField
                    id="my-input"
                    name="mobile"
                    type="tel"
                    value={guestChange.mobile}
                    onChange={handleGuestChange}
                    className={classes.otpMobile}
                    size="small"
                    required
                  />
                </div>
              </>
            )}
            <div className={classes.mobileCodeTextFieldButton}>
              <Typography>
                {notModal
                  ? "Sent verification code to your mobile number"
                  : "Send OTP to your Mobile"}
              </Typography>
              <Button
                variant="contained"
                endIcon={<Send />}
                sx={{
                  background:
                    "linear-gradient(to left ,#7962E1 0% ,#906EE8 100% )",
                  marginLeft: "5px",
                }}
                onClick={handleOtpSend}
              >
                Send
              </Button>
            </div>
          </div>
          <FormHelperText
            sx={{ color: "red", fontSize: "18px",marginTop:"20px" }}
            className={classes.changePassHelper}
          >
            {errorMessage !== "" &&  `${errorMessage}`}
          </FormHelperText>
        </>
      )}
    </Paper>
  );
};

export default UpdatePassword;
