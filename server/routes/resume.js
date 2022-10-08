import express from "express";
import {auth} from "../middlewares/auth.js";
import {resumeUpload,getResume} from "../controllers/resume.js";

const router=express.Router();

router.post("/upload",auth,resumeUpload);
router.get("/getresume",auth,getResume);

export default router;
