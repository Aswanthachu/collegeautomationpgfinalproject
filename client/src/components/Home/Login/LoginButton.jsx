import { Button } from "@mui/material";
import { purple } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";

import {setUserType,closeUpdateSnackBar} from "../../../features/user";

const useStyles = makeStyles((theme) => ({
  loginButton: {
    cursor:"pointer",
    color: "#ffffff !important",
    backgroundColor:"rgba(42, 42, 42,0.8) !important",
    "&:hover": {
      transitionDelay: '1',
      backgroundColor:`${purple[500]} !important`,
      color:"#D3D3D3 !important",
      transform:"scale(1.3)"
    },
  },
}));

const LoginButton = ({ text, name}) => {
  const classes = useStyles();
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleClick=(e) => {
    e.preventDefault();
    dispatch(closeUpdateSnackBar());
    dispatch(setUserType({name:name,value:true}));
    navigate('/login/types');
  }

  return (
    <div>
      <Button
        name={name}
        onClick={handleClick}
        className={classes.loginButton}
      >
        {text}
      </Button>
    </div>
  );
};

export default LoginButton;
