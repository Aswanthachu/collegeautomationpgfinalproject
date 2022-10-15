import { AppBar, IconButton, InputBase, Toolbar, Typography } from '@mui/material';
import { Search } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import React from 'react';

import useStyles from './style';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const NavBar = ({setSearch,search}) => {
  const classes = useStyles();

  const handleSearch=(e)=>{
    setSearch(e.target.value);
  };

  return (
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            CCSIT CU
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIconWrapper}>
              <Search />
            </div>
            {/* <InputBase
            className={classes.inputBase}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          /> */}
            <StyledInputBase
              // className={classes.inputBase}
              placeholder="Filter Here... "
              onChange={(e)=>handleSearch(e)}
              value={search}
            />
          </div>
        </Toolbar>
      </AppBar>
  )
}

export default NavBar