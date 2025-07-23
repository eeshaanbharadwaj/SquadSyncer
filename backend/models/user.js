import mongoose from "mongoose";

const UserSchema=new mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true,
            min:2,
            max:100,
        },
        lastName:{
            type: String,
            required: true,
            min:2,
            max:100,
        },
        contactNumber:{
           type:Number,
           required:true,
        },
        email:{
            type: String,
            required: true,
            min:2,
            max:100,
            unique:true,
        },
        skills:{
            type: String,
            required:true,
            min:1,
            max:20,
          },
        password:{
            type:String,
            required:true,
            min:6,
        },
        teams:{
            type:Array,
            default:[],
        },
        pendingRequest:{
            type:Array,
            default:[],
        },
        acceptedRequest:{
            type:Array,
            default:[],
        },
        joinRequest:{
            type:Array,
            default:[],
        }
    });

    const User=mongoose.model("User",UserSchema);

    export default User;