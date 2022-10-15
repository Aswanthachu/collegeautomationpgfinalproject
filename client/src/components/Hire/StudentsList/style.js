import { makeStyles } from "@material-ui/core";

const useStyles=makeStyles((theme)=>({
    studentsBox:{
        width:"100%",
        height:"100%",
        overflowY:"auto",
        
    },
    studentsPaper:{
        padding:"20px 70px",
        marginTop:"20px",
        [theme.breakpoints.down('sm')]:{
            margin:"15px",
            marginTop:"30px",
            padding:"10px 40px"
        },
        [theme.breakpoints.down('xs')]:{
            marginTop:"20px",
            padding:"5px",
            '&.MuiPaper-root':{
                boxShadow:"none"
            }
        }
    },
    descriptionGrid:{
        "& .MuiGrid-root ":{
            position:"fixed",
            top:0,
            zIndex:100,
        }
    }
}));

export default useStyles;