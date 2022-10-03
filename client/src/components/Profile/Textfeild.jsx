import React from 'react';
import {TextField} from "@mui/material";
import {makeStyles,withStyles} from "@mui/styles";

const useStyles=makeStyles((theme)=>({
  textField:{
    width:"90%",
    marginTop:"15px !important",
    padding:"0 !important",
  },
  halfText:{
    width:"60%",
    margin:"0 !important",
    padding:"0 !important",
    marginLeft:0
  },
}))

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#7962E1',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#7962E1',
      },
    },
  },
})(TextField);

const Textfield = ({values,half,name,onChange,type}) => {
  const classes=useStyles();
  return (
    <CssTextField className={half?classes.halfText:classes.textField} variant="standard" name={name} placeholder={name.toUpperCase()}  onChange={onChange} value={values[name]} type={type}
    />
  )
}

export default Textfield;