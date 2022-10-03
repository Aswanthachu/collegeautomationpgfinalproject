import jwt from "jsonwebtoken";
export const auth=(req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    let decodedData;
    try {
        if(token){
            decodedData=jwt.verify(token,"test");
            console.log(decodedData);
            req.userId=decodedData.id;
            next();
        }
        else{
            res.status(403).json({message:"User Not Authenticated.."})
        }
        
    } catch (error) {
        console.log(error);
    }
}