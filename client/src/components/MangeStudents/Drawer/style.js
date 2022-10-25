import { makeStyles } from "@material-ui/core";

const useStyles=makeStyles(theme=>({
    drawerBox:{
        "&.MuiBox-root":{
            position:"absolute",
            width:"240px",
            minHeight:"100% !important",
            backgroundColor:"#fff",
            borderRadius:"4px 0 0 4px",
            height:"100%",
            [theme.breakpoints.down('xs')]:{
                display:"none"
            }
        }
    },
    drawerBox__mobile:{
        "&.MuiBox-root":{
            position:"absolute",
            width:"240px",
            minHeight:"100% !important",
            backgroundColor:"#fff",
            borderRadius:"4px 0 0 4px",
            height:"100%",
        }
    },
    avatarBox:{
        width:"100%",
        height:"fit-content",
        padding:"20px 10px 20px 10px",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:'center'
    },
    avatar:{
        "&.MuiAvatar-root":{
            width:"100px",
            height:"100px",
            [theme.breakpoints.down('xs')]:{
                width:"75px",
                height:"75px"
            }
        }
    },
    loginedUserName:{
        "&.MuiTypography-root":{
            marginTop:"10px",
            fontWeight:600,
            fontfamily:"Poppins"
        }
    },
    listButton:{
        "&.MuiListItemButton-root":{
            "&:active":{
                backgroundColor:"red"
            },
            "&:hover":{
                backgroundColor:'#eee',
            },
            "&:selected":{
                backgroundColor:"#bbb"
            }
        }
    },
}));

export default useStyles;