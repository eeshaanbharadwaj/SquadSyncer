import mongoose, { Schema } from "mongoose";

const ChatSchema=new mongoose.Schema(
    {
       teamId:{
          type:String,
          required:true
       },
       messages:{
        type:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'messages'
         }],
        default:[]
       },
    }
);


const Chat=mongoose.model("Chat",ChatSchema);
export default Chat;