import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    styledMainContainer: {
        backgroundColor: "#ffffff",
        height: "100vh",
        padding: 0,
        margin: 0,
        [`&.MuiContainer-root`]: {
            maxWidth: "100vw",
            padding: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        zIndex: 2,
        overflowY:"auto"
    },
    styledContainer: {
        width: "95%",
        height: "93%",
        // backgroundColor:"blue",
        display: "flex",
        flexDirection:"column",
        [theme.breakpoints.down('md')]:{
            width:"100%",
            height:"100%"
        },
    },
    ResumeTop: {
        height: "15%",
        display: "flex",
        justifyContent:"flex-start",
        // borderRadius: "100px 0 0 0",
        backgroundColor: "#f7f3f8",
        padding: "10px 10px 0 50px",
        position: "relative",
        flex:1
    },
    avatar: {
        ['&.MuiAvatar-root']: {
            width: "110px",
            height: "110px",
            position:"absolute",
            bottom:"-30%",
            zIndex:999,
            [theme.breakpoints.down('sm')]:{
                width:"80px",
                height:"80px"
            },
            [theme.breakpoints.down('xs')]:{
                bottom:"-15%"
            },
            [theme.breakpoints.between('xs','sm')]:{
              bottom:"-20%"  
            },

        },
    },
    name: {
        ['&.MuiTypography-root ']: {
            fontFamily: "poppins",
            fontSize: "35px",
            margin: "20px",  
            position:"absolute",
            bottom:0,
            left:"20%",
            fontWeight:500,
            [theme.breakpoints.down('md')]:{
                left:"20%",
                fontSize:"25px"
            },
            [theme.breakpoints.down('sm')]:{
                left:"40%",
                fontSize:"20px"
            },
            [theme.breakpoints.between('sm','md')]:{
              left:"25%"  
            }
        }
    },
    resumeBottom:{
        // backgroundColor:"red",
        flex:5,
        padding:"50px 10px 10px 10px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        [theme.breakpoints.down('sm')]:{
            paddingTop:"100Px",
            flexDirection:"column",
            overflowY:"auto",
        }
    },
    bottomStack:{
        flex:1,
        height:"100%",
        display:"flex",
        [theme.breakpoints.down('sm')]:{
            marginTop:"20px"
        }
    },
    FormControl:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        padding:"0 10% 0 10%",
        maxWidth:"465px",
        [theme.breakpoints.down('sm')]:{
            padding :0,
        },
        "& .WAMuiChipInput-chipContainer-16":{
            maxWidth:"240px", 
        }
    },
    textField:{
        width: "47%",
        padding:0,
        resize: "none",
        color:"#000",
        fontWeight:"600",
        // margin:"10px",
        [theme.breakpoints.down('sm')]:{
            width:"70%",
        },
        border: "2px solid #906EE8",
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
        "& .PrivateNotchedOutline-root-29":{
            display:"none",
        },
    },
    formLabel:{
        "&.MuiFormLabel-root":{
            color:"#000",
            fontWeight:600
        }
    },
    chipInput:{
        width: "250px",
        marginLeft: "30px",
        marginTop: "30px"
    },
    buttonContainer:{
        width:"100%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    submitButton:{
        "&.MuiButton-root":{
         background:
         "linear-gradient(to left ,#7962E1 0% ,#906EE8 100% )",
         color:"#fff",
         marginTop:"60px",
         width:"35%",
         height:"40px"
        }
     },
     alert:{
        marginTop: "30px", 
        color: 'red',
        [theme.breakpoints.down('md')]:{
            marginTop:"60px",
        }
     }
}));

export { useStyles };