import express from "express";

import { 
    userSignup, 
    userLogin, 
    userUpdateProfile, 
    sendOtp, 
    verifyOtp, 
    updatePassword, 
    searchUser, 
    userAddEditRemove
} from "../controllers/user.js";

import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.patch('/updateprofile', userUpdateProfile);
router.post('/requestotp/:id', sendOtp);
router.post('/requestotp', sendOtp);
router.post('/otpverify/:otp', verifyOtp);
router.post('/verifypassword/:id', updatePassword);

router.get('/searchuser/:search', auth, searchUser);
router.post('/performuseraction/:action',auth,userAddEditRemove)

export default router;