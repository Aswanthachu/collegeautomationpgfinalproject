import express from "express";
import {auth} from "../middlewares/auth.js";
import { loadContacts,updateMessage,getMessage} from "../controllers/chat.js";


const router=express.Router();

router.get("/loadcontacts",auth,loadContacts);
router.post("/updatemessage/:receiverId",auth,updateMessage);
router.get("/getmessage/:receiverId",auth,getMessage);

export default router;