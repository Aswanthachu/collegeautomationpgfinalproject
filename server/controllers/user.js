import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import twilio from "twilio";

import user from "../models/user.js";

export const userSignup = async (req, res) => {
  const { username, password, type } = req.body;
  const upperUsername = username.toUpperCase();
  console.log(username, password, type);

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await user.create({
      username:upperUsername,
      password: hashedPassword,
      usertype: type,
    });
    const token = jwt.sign({ username, id: result._id }, "test");

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(400).json({ message: "Something Went Wrong" });
  }
};

export const userLogin = async (req, res) => {
  const { username, password, type } = req.body;
  const upperUsername = username.toUpperCase();
  // console.log(username,password,type);
  try {
    const existingUser = await user.findOne({ username: upperUsername });

    // console.log(existingUser);

    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }
    if (type !== existingUser.usertype) {
      return res.status(400).json({ message: `You are not a ${type}` });
    }

    const correctUser = await bcrypt.compare(password, existingUser.password);

    if (!correctUser) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ username, id: existingUser._id }, "test");
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log(error);
  }
};
export const userUpdateProfile = async (req, res) => {
  const { username, name, email, phone, profilepic } = req.body;
  console.log(username, name, email);
  try {
    const existingUser = await user.findOne({ username: username });
    const data = await user.findByIdAndUpdate(
      existingUser._id,
      {
        username: username,
        name: name,
        email: email,
        phone: phone,
        profilepic: profilepic,
      },
      { new: true }
    );

    // console.log(data);
    res.status(200).json({data,message:"Profile Updated Successfully.."});
  } catch (err) {
    console.log(err);
  }
};

export const sendOtp = async (req, res) => {
  const { id } = req?.params;
  // console.log(id);
  var userId;

  var accountSid = "AC107f162ca95db174c148993937366256";
  var authToken = "4c9ce0264f19ec82252aed463a5d3517";
  var twilioNum = "+19788785863";

  // var accountSid = "AC04a1509ad8868aa5a52697960df49c42";
  // var authToken = "150dafce5649111c8526302d9d1cdbc8";
  // var twilioNum = "+13048851218";

  const client = new twilio(accountSid, authToken);

  if(id){

    const requestedUser=await user.findById(id);
    var phone=requestedUser.phone;
    userId=requestedUser._id;

    console.log(phone);
  }
  else{

    const {username,mobile,type} =req.body.guestVerifyData;
    console.log(username,mobile,type);

    const requestedUser=await user.findOne({username:username});
    var phone= requestedUser.phone;
    userId=requestedUser._id;

    console.log(phone);

    if(type !== requestedUser.usertype){
     res.status(400).json({message:`You are not a ${type}`});
     return ;
    }

    if(phone !== mobile){
      res.status(400).json({message: 'Invalid Mobile Number!'});
      return ;
    }
  }

  if(phone === null || phone === "") {
    res.status(400).json({message:"Please Update Profile With Phone Number"});
    return ;
  }else{
    console.log("hello")
  const otp = Math.floor(123456 + Math.random() * 12345);

  const ciphertext = await CryptoJS.AES.encrypt(
    `${otp}`,
    "secretkey123"
  ).toString();

  console.log(otp,ciphertext);
  client.messages
    .create({
      to: `+91${phone}`,
      from: twilioNum,
      body: `Your CCSIT CU Verification Code is: ${otp}`
    })
    .then((message) => {
      // console.log(message);
      res
        .status(200)
        .json({ message: "OTP send Successfully..", hash: ciphertext,userId:userId});
    })
    .catch((err) => {
      console.log(err);
    });
  }

};

export const verifyOtp=async(req,res)=>{
  const {otp}=req.params;
  const {smsHash}=req.body;
  console.log(smsHash);

  try {
  var decryptedOtp  = CryptoJS.AES.decrypt(smsHash, 'secretkey123');
  var originalOtp = decryptedOtp.toString(CryptoJS.enc.Utf8);

  // console.log(originalOtp);

  if(otp === originalOtp)
    res.status(200).json({message:"OTP verified Successfully.."});
  else
    res.status(400).json({message:"Invalid OTP"});
  } catch (error) {
    console.log(error);
  }
}

export const updatePassword=async(req,res)=>{

  const {password}=req.body;
  const {id}=req.params;

  console.log(password.pass,password.cpass,id);

  if(password.pass ==="")
    res.status(400).json({message:"Password Field is required"});
  if(password.cpass ==="")
    res.status(400).json({message:"Confirm Password Field is required"})
  if(password.pass !== password.cpass)
    res.status(401).json({message:"Passwords doesn't match"});
  try {
    const hashedPassword = await bcrypt.hash(password.pass, 12);
    const updatedUser=await user.findByIdAndUpdate(id,{password:hashedPassword.toString()},{new:true});
    res.status(200).json({message:'Password Updated Successfully..'});
  } catch (error) {
    console.log(error);
  }
}