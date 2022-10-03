import {configureStore} from "@reduxjs/toolkit";

import userReducer from "./features/user.js";
import chatReducer from "./features/chat.js";

export const store=configureStore({
    reducer:{
        user:userReducer,
        chat:chatReducer
    },
});

export default store;