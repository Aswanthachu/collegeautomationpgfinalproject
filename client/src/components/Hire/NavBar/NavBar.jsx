import { AppBar, Box, IconButton, InputBase,Toolbar, Typography } from '@mui/material';
import {Search} from "@mui/icons-material";
import React from 'react';

import useStyles from './style';

const NavBar = () => {
  const classes=useStyles();
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          {/* <MenuIcon /> */}
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
          <InputBase
            className={classes.inputBase}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default NavBar