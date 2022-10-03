import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import userRouter from "./routes/user.js";
import chatRouter from "./routes/chat.js";

const app = express();

app.use(bodyParser.json({limit:"30mb",extended:"true"}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:"true"}));
app.use(cors());

app.use('/user',userRouter);
app.use('/chat',chatRouter);

const CONNECTION_URL =
  "mongodb+srv://aswanth2022:aswanth123@ccsitdb.hi8na.mongodb.net/?retryWrites=true&w=majority";
  // "mongodb+srv://aswanth123:aswanth123@cluster0.e6j3t.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>app.listen(PORT,()=>console.log(`Server Running on ${PORT}`)))
    .catch((err)=>console.log(err));
