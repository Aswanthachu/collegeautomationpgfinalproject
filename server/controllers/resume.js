import resume from "../models/resume.js";
import user from "../models/user.js";

export const resumeUpload = async (req, res) => {
  const { resumeData } = req.body;
  const userId = req.userId;
  const data = { userRef: userId, ...resumeData };

  try {
    const userExist = await resume.findOne({ userRef: userId });
    if (!userExist) {
      const result = await resume.create(data);
      res.status(200).json({ message: "Resume Uploaded Successfully..", data: result });
    } else {
      const result = await resume.findByIdAndUpdate(userExist._id, resumeData, { new: true });
      res.status(200).json({ message: "Resume Updated Successfully..", data: result });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Server Error" });
  }
};

export const getResume = async (req, res) => {
  const userId = req.userId;
  try {
    const userExist = await resume.findOne({ userRef: userId }, { userRef: false, _id: false, __v: false });

    if (userExist) {
      res.status(200).json({ data: userExist });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllResume = async (req, res) => {
  try {
    const resumes = await resume.find({}, { __v: false });
    let resumeTot=[];

    for (var i = 0; i < resumes.length; i++) {
      const userInfo = await user.findById(resumes[i].userRef, { profilepic: true, username: true, name: true, _id: false });
      
      const { profilepic, username, name } = userInfo;
      const { address, bio, email, github, linkedin, phone, position, skills, userRef } = resumes[i];
      const studentResume = resumes[i].resume;

      const userTotalInfo = {
        address: address,
        bio: bio,
        email: email,
        github: github,
        linkedin: linkedin,
        phone: phone,
        position: position,
        studentResume: studentResume,
        skills: skills,
        profilepic: profilepic,
        username: username,
        name: name,
        userRef: userRef
      };

      resumeTot.push(userTotalInfo);
    };

    res.status(200).json({ data: resumeTot });

  } catch (error) {
    console.log(error);
  }
};

// export const getAllResume = async (req, res) => {
//   try {
//     const resumes = await resume.find({}, {__v: false });
//     console.log(resumes)
//     const userInfo = await user.findById(resumes[0].userRef, { profilepic: true, username: true, name: true,_id:false });
//     const {profilepic, username, name}=userInfo;
//     const {address,bio,email,github,linkedin,phone,position,skills,userRef}= resumes[0];
//     const studentResume= resumes[0].resume;
//     const userTotalInfo={address:address,
//                          bio:bio,
//                          email:email,
//                          github:github,
//                          linkedin:linkedin,
//                          phone:phone,
//                          position:position,
//                          studentResume:studentResume,
//                          skills:skills,
//                          profilepic:profilepic,
//                          username:username,
//                          name:name,
//                          userRef:userRef
//                         };
//     res.status(200).json({ data: userTotalInfo });
//   } catch (error) {
//     console.log(error);
//   }
// }