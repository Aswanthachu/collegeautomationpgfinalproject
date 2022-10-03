import express from "express";

import {userSignup,userLogin,userUpdateProfile, sendOtp,verifyOtp,updatePassword} from "../controllers/user.js"

const router=express.Router();

router.post('/signup',userSignup);
router.post('/login',userLogin);
router.patch('/updateprofile',userUpdateProfile);
router.post('/requestotp/:id',sendOtp);
router.post('/requestotp',sendOtp);
router.post('/otpverify/:otp',verifyOtp);
router.post('/verifypassword/:id',updatePassword);

export default router;