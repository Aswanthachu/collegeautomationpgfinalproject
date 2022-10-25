import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import twilio from "twilio";
import nodemailer from "nodemailer";

import user from "../models/user.js";

export const userSignup = async (req, res) => {
  const { username, password, type } = req.body;
  const upperUsername = username.toUpperCase();

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await user.create({
      username: upperUsername,
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

    res.status(200).json({ data, message: "Profile Updated Successfully.." });
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

  if (id) {

    const requestedUser = await user.findById(id);
    var phone = requestedUser.phone;
    userId = requestedUser._id;

    console.log(phone);
  }
  else {

    const { username, mobile, type } = req.body.guestVerifyData;
    console.log(username, mobile, type);

    const requestedUser = await user.findOne({ username: username });
    var phone = requestedUser.phone;
    userId = requestedUser._id;

    console.log(phone);

    if (type !== requestedUser.usertype) {
      res.status(400).json({ message: `You are not a ${type}` });
      return;
    }

    if (phone !== mobile) {
      res.status(400).json({ message: 'Invalid Mobile Number!' });
      return;
    }
  }

  if (phone === null || phone === "") {
    res.status(400).json({ message: "Please Update Profile With Phone Number" });
    return;
  } else {
    const otp = Math.floor(123456 + Math.random() * 12345);

    const ciphertext = await CryptoJS.AES.encrypt(
      `${otp}`,
      "secretkey123"
    ).toString();

    console.log(otp, ciphertext);
    client.messages
      .create({
        to: `+91${phone}`,
        from: twilioNum,
        body: `Your CCSIT CU Verification Code is: ${otp}`
      })
      .then((message) => {
        res
          .status(200)
          .json({ message: "OTP send Successfully..", hash: ciphertext, userId: userId });
      })
      .catch((err) => {
        console.log(err);
      });
  }

};

export const verifyOtp = async (req, res) => {
  const { otp } = req.params;
  const { smsHash } = req.body;
  console.log(smsHash);

  try {
    var decryptedOtp = CryptoJS.AES.decrypt(smsHash, 'secretkey123');
    var originalOtp = decryptedOtp.toString(CryptoJS.enc.Utf8);


    if (otp === originalOtp)
      res.status(200).json({ message: "OTP verified Successfully.." });
    else
      res.status(400).json({ message: "Invalid OTP" });
  } catch (error) {
    console.log(error);
  }
}

export const updatePassword = async (req, res) => {

  const { password } = req.body;
  const { id } = req.params;

  if (password.pass === "")
    res.status(400).json({ message: "Password Field is required" });
  if (password.cpass === "")
    res.status(400).json({ message: "Confirm Password Field is required" })
  if (password.pass !== password.cpass)
    res.status(401).json({ message: "Passwords doesn't match" });
  try {
    const hashedPassword = await bcrypt.hash(password.pass, 12);
    const updatedUser = await user.findByIdAndUpdate(id, { password: hashedPassword.toString() }, { new: true });
    res.status(200).json({ message: 'Password Updated Successfully..' });
  } catch (error) {
    console.log(error);
  }
};


export const searchUser = async (req, res) => {
  const userId = req.userId;
  const { search } = req.params;
  try {
    const data = await user.find({
      "$or": [
        { name: { $regex: search.toUpperCase() } },
        { username: search.toUpperCase() }
      ]
    }, { profilepic: true, username: true, name: true, usertype: true, batch: true, stream: true });

    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ message: "User Doesn't Exist." });
    }

  } catch (error) {
    console.log(error);
  }
};

export const userAddEditRemove = async (req, res) => {
  const { username, password, stream, email, startYear, endYear, verifyPassword, type } = req.body;
  const { action } = req.params;
  const userId = req.userId;

  async function mailFunction({ type }) {
    var to = email;
    var from = "pnkaswanthachu546@gmail.com";
    var sub = "CCSIT CU Login Credentials";
    var message = `Your Username and Password for Logging into CCSIT CU are USERNAME: ${username} PASSWORD: ${password}`;

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'pnkaswanthachu546@gmail.com',
        pass: "qhjtiybgogrupnhj"
      }
    })

    var mailOptions = {
      from: from,
      to: to,
      subject: sub,
      text: message
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log("email send" + info.response);
        res.status(200).json({ message: `${type} added successfully...` });
      }

    });

  }

  try {
    const loginedUser = await user.findById(userId);
    const correctUser = await bcrypt.compare(verifyPassword, loginedUser.password);

    if (correctUser) {

      if (action === "add") {
       
        const upperUsername = username.toUpperCase();

        const existingUser = await user.findOne({ username: upperUsername });
        console.log(existingUser);

        if (existingUser) {
          res.status(400).json({ errorMessage: "User Already Exist.." });
        } else {
          const hashedPassword = await bcrypt.hash(password, 12);

          if (loginedUser.usertype === "teacher") {
            const userType = "student";

            const result = await user.create({
              username: upperUsername,
              password: hashedPassword,
              usertype: userType,
              stream: stream,
              batch: [{
                startYear: startYear,
                endYear: endYear
              }]
            });

            if (result) {
              mailFunction({ type: userType });
            }
          } else {
            const result = await user.create({
              username: upperUsername,
              password: hashedPassword,
              usertype: type
            });

            if (result) {
              mailFunction({ type });
              // res.status(200).json({ message: `${type} added successfully...` });
            }
          }
        }
      }
      else if (action === "edit") {
        const upperUsername = username.toUpperCase();
        const hashedPassword = await bcrypt.hash(password, 12);

        if (loginedUser.usertype === "teacher") {
          const userType = "student";

          const result = await user.findOneAndUpdate({ username: upperUsername }, {
            password: hashedPassword,
            usertype: userType,
            stream: stream,
            batch: [{
              startYear: startYear,
              endYear: endYear
            }]
          });

          if (result) res.status(200).json({ message: `${userType} edited successfully...` })
        } else {
          const result = await user.create({
            username: upperUsername,
            password: hashedPassword,
            usertype: type
          });

          if (result) res.status(200).json({ message: `${type} edited successfully...` })
        }

      } else {

        const upperUsername = username.toUpperCase();
        const result = await user.findOneAndDelete({ username: upperUsername });

        if (loginedUser.usertype === "teacher") {
          const userType = "student";
          if (result) res.status(200).json({ message: `${userType} Removed Successfully..` })
        } else {
          if (result) res.status(200).json({ message: `${type} Removed Successfully..` })
        }
      }
    } else {
      res.status(400).json({ errorMessage: "Admin Password is Invalid" });
    }

  } catch (error) {
    console.log(error);
  }
}
