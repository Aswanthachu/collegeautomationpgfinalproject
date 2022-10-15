import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    listPaper: {
        padding: "5px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom:"5px"
    },
    listTypography:{
        fontFamily:"Poppins",
        color:"#000"
    },
    listTypography__lg:{
        fontFamily:"Poppins",
        color:"#000",
        display:"block",
        [theme.breakpoints.down('sm')]:{
            display:"none"
        }
    },
    listTypography__md:{
        fontFamily:"Poppins",
        color:"#000",
        display:"block",
        [theme.breakpoints.down('xs')]:{
            display:"none"
        }
    }
}));

export default useStyles;