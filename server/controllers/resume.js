import resume from "../models/resume.js";

export const resumeUpload=async(req,res)=>{
    const {resumeData}=req.body;
    const userId=req.userId;
    const data={userRef:userId,...resumeData};
    // console.log(data)
    try {
      const userExist = await resume.findOne({userRef:userId});
      if(!userExist){
        const result = await resume.create(data);
        res.status(200).json({message:"Resume Uploaded Successfully..",data:result});
      }else{
        const result = await resume.findByIdAndUpdate(userExist._id,resumeData,{new:true});
        res.status(200).json({message:"Resume Updated Successfully..",data:result});
      }
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Server Error"});
    }
};

export const getResume=async(req,res)=>{
  const userId=req.userId;
  try {
    const userExist=await resume.findOne({userRef:userId},{userRef:false,_id:false,__v:false});

    // console.log(userExist);

    if(userExist){
      res.status(200).json({data:userExist});
    }
  } catch (error) {
    console.log(error);
  }
}