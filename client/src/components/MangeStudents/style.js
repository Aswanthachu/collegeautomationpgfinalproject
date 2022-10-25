import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    styledMainContainer: {
        [`&.MuiContainer-root`]: {
            maxWidth: "100vw",
            minHeight: "100vh",
            padding: 0,
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflowY: "auto",
            backgroundColor: "#dee0e7",
            overflowX:"hidden"
        },
    },
    mainBox: {
        [`&.MuiPaper-root`]:{
            minHeight:"87vh",
            minWidth:"95vw",
            margin:"50px 30px 30px 30px",
            backgroundColor:"#f5f4f9",
            position: "relative",
            [theme.breakpoints.down('xs')]:{
                margin:0,
                minHeight:"100vh",
                minWidth:"100vw",
                borderRadius:0
            }
        }
    },
    contentBox:{
        "&.MuiBox-root":{
            width:"calc(100% - 240px)",
            position:"absolute",
            right:0,
            height:'100%',
            borderRadius:"0 4px 4px 0",
            display:"flex",
            flexDirection:"column",
            [theme.breakpoints.down('xs')]:{
                width:"100%"
            }
        }
    }
}));

export default useStyles;