import useStyles from './style';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppBar, Toolbar, IconButton, InputBase } from "@mui/material";
import { Menu, Search } from '@mui/icons-material';

import { searchUser } from "../../../../actions/user";
import {clearSearch} from "../../../../features/user";

import MobileDrawer from './MobileDrawer/MobileDrawer';

const AppBarComponent = ({ loginedUser }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const [search, setSearch] = useState("");

    const toggleDrawer = (open) => {
        setMobileDrawerOpen(open);
    };

    const handleKeypress = e => {
        if (e.key === "Enter") {
            if (search) {
                setTimeout(() => {
                    dispatch(clearSearch());
                }, 100); 
                dispatch(searchUser({ search }));
            }
        }
    };

    return (
        <>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        className={classes.hamburgerButton}
                        onClick={() => toggleDrawer(true)}
                    >
                        <Menu sx={{ color: "#999" }} />
                    </IconButton>

                    <div className={classes.search}>
                        <span className={classes.searchIconWrapper}>
                            <Search />
                        </span>
                        <InputBase
                            placeholder={loginedUser.usertype === "teacher" ? `Search Student....` : `Search Teacher....`}
                            className={classes.searchInputBase}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={(e) => handleKeypress(e)}
                            value={search}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <MobileDrawer setMobileDrawerOpen={setMobileDrawerOpen} mobileDrawerOpen={mobileDrawerOpen} />
        </>
    )
}

export default AppBarComponent;