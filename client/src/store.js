import {configureStore} from "@reduxjs/toolkit";

import userReducer from "./features/user.js";
import chatReducer from "./features/chat.js";
import resumeReducer from "./features/resume.js";

export const store=configureStore({
    reducer:{
        user:userReducer,
        chat:chatReducer,
        resume:resumeReducer
    },
});

export default store;