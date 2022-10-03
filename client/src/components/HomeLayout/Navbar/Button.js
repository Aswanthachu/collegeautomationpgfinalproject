import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  menuItem:{
    "&:hover":{
      backgroundColor:"#906EE8 !important",
    }
  }
});

export const NavButton = ({ page }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (typeof page[1] === "string") {
      setAnchorEl(null);
      navigate(page[1]);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  // const handleHover =(e)=>{
  //   if(typeof page[1] === "string"){
  //     setAnchorEl(null);
  //   }else {
  //     setAnchorEl(e.currentTarget);
  //   }
  // };

  // const handleLeave=(e)=>{
  //   setAnchorEl(null);
  // }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        className={classes.button}
        sx={{
          color: "#FFFFFF",
          background: "linear-gradient(to left ,#7962E1 0% ,#906EE8 100% )",
          "&:hover": {
            backgroundColor: "red",
          },
        }}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        // onMouseEnter={handleHover}
        // onMouseLeave={handleLeave}
      >
        {page[0]}
      </Button>
      {typeof page[1] !== 'string' && 
            <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {page[1].map((menu, index) => {
              return (
                <MenuItem key={index} onClick={() => navigate(menu[1])} className={classes.menuItem}>
                  {menu[0]}
                </MenuItem>
              );
            })}
          </Menu>
      } 
    </>
  );
};
