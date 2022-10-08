import { makeStyles } from "@material-ui/core";

const useStyles=makeStyles((theme)=>({
    FormControl:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        padding:"0 10% 0 10%",
        marginTop:"25px",
        [theme.breakpoints.down('sm')]:{
            padding :0
        }
    },
    formLabel:{
        "&.MuiFormLabel-root":{
            color:"#000",
            fontWeight:600
        }
    },
    textField:{
        width: "47%",
        padding:0,
        [theme.breakpoints.down('sm')]:{
            width:"70%"
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
    pdfUpload:{
        maxWidth:"240px",
        [theme.breakpoints.down('sm')]:{
            maxWidth:"200px",
        }
    }
}));

export {useStyles}