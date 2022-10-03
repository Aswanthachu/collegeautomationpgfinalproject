import React, { useState, useEffect } from "react";
import {
  Container,
  IconButton,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";

import { PhotoCamera } from "@mui/icons-material";

import NavBar from "./navBar/NavBar";
import Textfield from "./Textfeild";
import user from "../../images/user.svg";
// import CropEasy from "./crop/CropEasy";

import { updateProfile } from "../../actions/user";
import { closeUpdateSnackBar } from "../../features/user";
import SideBar from "./SideBar";
import UpdatePassword from "./UpdatePassword";

const StyledContainer = styled(Container)(({ theme }) => ({
  "&.MuiContainer-root": {
    minWidth: "100vw",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "row",
    margin: 0,
    padding: 0,
  },
}));

const useStyles = makeStyles((theme) => ({
  profileMain: {
    marginTop: "13vh",
    height: "87vh",
    width: "100%",
    display: "flex",
  },
  sideBar: {
    flex: 0.2,
    position: "static",
    // backgroundColor:"green",
    marginLeft: 0,
  },
  profileEditSection: {
    flex: 0.8,
    // backgroundColor:"red",
    position: "relative",
  },
  profileEditPaper: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    marginBottom: "4%",
    marginRight: "5%",
    backgroundColor: "#dcdcdc",
    borderRadius: "30px",
    padding: "5%",
    // opacity: 0.4
    display:"flex"
  },
  profileEdit: {
    width: "25vw",
    height: "67vh",
    position: "relative",
  },
  profileImgContainer: {
    height: "40%",
    backgroundSize: "auto",
  },
  profileImg: {
    minWidth: "100%",
    maxHeight: "100%",
    objectFit: "cover",
    borderRadius: "22px 22px 0 0",
  },
  noProfile:{
    minWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
  profileImgUser:{
    
  },
  profileText: {
    height: "60%",
    position: "relative",
    margin: "5% 4% 4% 4%",
  },
  camera: {
    position: "absolute",
    right: 2,
    top: "-15%",
  },
  cameraIcon: {
    fontSize: "30px !important",
    color: "#7962E1",
  },
  Bottom: {
    width: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // padding: "0 5%",
  },
  model: {
    position: "absolute",
    top: "40%",
    left: "70%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  profileEditRight:{
    width:"70%",
    // margin:"0 0 0 3%",
    padding:"0 5%",
  }
}));

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const [imgOpen,setOpenCrop]=useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    profilepic: "",
  });

  console.log(values);

  const [logined, setLogined] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [successMessage,setSuccessMessage]=useState("");

  const response = useSelector((state) =>
    state.user.userData !== "" ? state.user.userData : ""
  );

  const successmessage = useSelector((state) =>
    state.user.profileSnackBar !== false
      ? state.user.profileSnackBar
      : false
  );

  const handleChange = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const convert2base64 = (e) => {
    const files = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setValues({
        ...values,
        profilepic: reader.result.toString(),
      });
    };
    reader.readAsDataURL(files);
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ updatedProfile: { ...values } }));
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeUpdateSnackBar());
    setTimeout(() => setSnackOpen(false),100);
  };

  useEffect(() => {
    if (localStorage.getItem("user") === "") {
      setLogined("");
    } else {
      setLogined(JSON.parse(localStorage.getItem("user")));
      setValues({ ...JSON.parse(localStorage.getItem("user")) });
    }
  }, [response]);

  useEffect(() => {
    if (successmessage !== false) {
      setSnackOpen(successmessage);
    } else {
      setSnackOpen(successmessage);
    }
  }, [successmessage]);

  const successMessages = useSelector((state) =>
    state.user.successMessage !== "" ? state.user.successMessage : ""
  );

    useEffect(()=>{
      setSuccessMessage(successMessages);
  },[successMessages]);

  return (
    <StyledContainer>
      <NavBar />
      <div className={classes.profileMain}>
        <div className={classes.sideBar}>
          <SideBar userType={values.usertype}/>
        </div>
        <div className={classes.profileEditSection}>
          <div className={classes.profileEditPaper}>
            <Paper
              className={classes.profileEdit}
              sx={{ borderRadius: "20px" }}
            >
              <div className={classes.profileImgContainer}>
                {values.profilepic ?
                <img
                  className={classes.profileImg }
                  // src={values.profilepic !== "" ? values.profilepic : user}
                  src={values.profilepic}
                  alt="profileImage"
                />:
                <img
                  className={classes.noProfile}
                  src={user}
                  alt=""
                />
                }
              </div>
              <div className={classes.profileText}>
                <div className={classes.camera}>
                  <IconButton
                    sx={{ backgroundColor: "#F4F4F4" }}
                    component="label"
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(e) => convert2base64(e)}
                    />
                    <PhotoCamera className={classes.cameraIcon} />
                  </IconButton>
                </div>
                <Typography
                  variant="h6"
                  sx={{ display: "flex", margin: "10px 0 0 20px" }}
                >
                  Edit Profile
                </Typography>
                <TextField
                  variant="standard"
                  label={logined?.username}
                  sx={{ width: "90%" }}
                  disabled
                />
                <Textfield
                  name="name"
                  onChange={handleChange}
                  values={values}
                />
                <Textfield
                  name="email"
                  onChange={handleChange}
                  values={values}
                />
                <div className={classes.Bottom}>
                  <Textfield
                    name="phone"
                    half
                    onChange={handleChange}
                    values={values}
                    type="number"
                  />
                  <Button
                    variant="contained"
                    sx={{
                      margin: "20px 0 0 10px",
                      background:
                        "linear-gradient(to left ,#7962E1 0% ,#906EE8 100% )",
                    }}
                    onClick={handleClick}
                  >
                    SAVE
                  </Button>
                </div>
              </div>
            </Paper>
            <div className={classes.profileEditRight}>
            <UpdatePassword userId={values._id} notModal/>
            </div>
          </div>
          
          <Snackbar
            open={snackOpen}
            autoHideDuration={6000}
            onClose={handleSnackClose}
          >
            <Alert
              onClose={handleSnackClose}
              severity="success"
              sx={{ width: "100%" }}
            >
             {successMessage} 
            </Alert>
          </Snackbar>
          {/* {imgOpen && <CropEasy {...{photoUrl,setOpenCrop}}/>} */}
        </div>
      </div>
    </StyledContainer>
  );
};

export default Profile;
