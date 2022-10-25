import React, { useState, useEffect } from 'react';
import { SwipeableDrawer, Box } from "@mui/material";

import DrawerComponent from '../../../Drawer/Drawer';

const MobileDrawer = ({ setMobileDrawerOpen, mobileDrawerOpen }) => {

    const [loginedUser, setLoginedUser] = useState(null);

    useEffect(() => {
        setLoginedUser(JSON.parse(localStorage.getItem('user')));
    }, []);

    const handleDrawer = (open) => {
        setMobileDrawerOpen(open);
    };

    return (
        <SwipeableDrawer
            anchor="left"
            open={mobileDrawerOpen}
            onClose={() => handleDrawer(false)}
            onOpen={() => handleDrawer(true)}
            sx={{ minWidth: "300px" }}
        >
            <Box
                onClick={() => handleDrawer(false)}
                onKeyDown={() => handleDrawer(false)}
                sx={{ width: "240px" }}
            >
                <DrawerComponent loginedUser={loginedUser} mobileDrawerOpen={mobileDrawerOpen} />
            </Box>
        </SwipeableDrawer>

    )
}

export default MobileDrawer;