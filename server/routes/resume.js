import express from "express";
import {auth} from "../middlewares/auth.js";
import {resumeUpload,getResume,getAllResume} from "../controllers/resume.js";

const router=express.Router();

router.post("/upload",auth,resumeUpload);
router.get("/getresume",auth,getResume);
router.get("/getallresume",getAllResume);

export default router;
