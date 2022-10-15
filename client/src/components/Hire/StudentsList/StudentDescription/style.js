import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    studentDetailsPaper: {
        padding: "20px",
        display: "flex",
        position:"relative"
    },
    avatar: {
        "&.MuiAvatar-root": {
            width: "120px",
            height: "120px"
        }
    },
    studentDetailsHead: {
        padding: "20px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start"
    },
    studentDetailsName: {
        "&.MuiTypography-root ": {
            color: "#000",
            fontFamily: "Poppins",
            fontWeight: 600,
            fontSize: "18px",

        }
    },
    studentDetailsTypography: {
        "&.MuiTypography-root ": {
            fontSize: "13px",
            fontWeight: 600,   
        }
    },
    closeButton:{
        "&.MuiButtonBase-root":{
            position: "absolute", 
            right: "20px", 
            top: "20px"
        }
    },
    descriptionStack: {
        padding: "0 30px 15px 30px",
        dispaly:"flex",
        justifyContent:"space-between"
    },
    studentDescriptionMain:{
        position:"fixed",
        [theme.breakpoints.down('md')]:{
            width:"45%"
        },
        [theme.breakpoints.up('md')]:{
            width:"30%"
        },
        [theme.breakpoints.between('sm','md')]:{
            width:"45%"
        },
        [theme.breakpoints.between('xs','sm')]:{
            width:"83%"
        },
        [theme.breakpoints.down('xs')]:{
            width:"90%"
        }
    },
    
}));

export default useStyles;