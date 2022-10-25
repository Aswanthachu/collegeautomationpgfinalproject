import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    appBar: {
        width: "100%",
        height: "70px",
        borderRadius: "0 4px 0 0",
        display: "flex",
        justifyContent: "center",
        "&.MuiAppBar-root": {
            backgroundColor: "#ebebee",
            boxShadow:"none"
        }
    },
    hamburgerButton:{
        "&.MuiIconButton-root":{
            display:"none",
            [theme.breakpoints.down('xs')]:{
                display:'block',
                margin:0,
                marginTop:4,
                paddingLeft:0
            }
        }
    },
    search: {
        width: "75%",
        height: "80%",
        backgroundColor:"inherit",
        display:"flex",
        alignItems:"center",
        padding:"5px 10px",
        [theme.breakpoints.down('xs')]:{
            width:"90%",
            height:"70%",
            marginLeft:"3%"
        },
        [theme.breakpoints.down('sm')]:{
            width:"80%"
        }
    },
    searchIconWrapper:{
        display:"flex",
        justifyContent:"center",
        color:"#999"
    },
    searchInputBase:{
        marginLeft:'10px',
        width:"50%",
        [theme.breakpoints.down('xs')]:{
            width:"100%"
        }
    }
}));

export default useStyles;