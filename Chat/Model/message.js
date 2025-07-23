import mongoose, { Schema } from "mongoose";

const MessagesSchema = new mongoose.Schema({
    content:{
       type:String,
       required: true
    },
    userId:{
       type:String,
       required:true,
     },
     userName:{
       type:String,
       required:true,
     },
     createdAt:{
       type:Date,
       default:Date.now,
     }
   })
   const Messages=mongoose.model("messages",MessagesSchema);
   export default Messages;
 