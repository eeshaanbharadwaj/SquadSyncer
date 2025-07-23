import express  from "express";
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import {Server}  from "socket.io";
import http from "http";
import Chat from "./Model/chat.js";
import Messages from "./Model/message.js";
const port = process.env.PORT || 5000;
const app=express();
app.use(express.json());
app.use(cors())

const server=http.createServer(app);
dotenv.config();
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(async()=>{
    console.log("Connected to Database for chat")
})
.catch((error)=>{
    console.log("It's Error!")
    console.log(error)
})

// create new chat instance

app.post("/create/:id",async (req,res)=>{
     try {
       let {auth}=req.body;
       if(auth==process.env.CHAT_AUTH){
        const {id}=req.params;
        const newChat=new Chat({
           teamId:id,
           messages:[],
        });
        await newChat.save();
        res.status(200).send();
       }
       else{
         res.status(500).send();
       }
     } catch (error) {
        res.status(500).send();
     }
})

//delete a chat instance

app.post("/delete/:id",async (req,res)=>{
    try {
        let {auth}=req.body;
        if(auth==process.env.CHAT_AUTH){
            const {id}=req.params;
            const newChat = await Chat.findOne({teamId:id});
            await Promise.all(newChat.messages.map((myMessage)=>{
               return Messages.findByIdAndDelete(myMessage);
            }));
            await Chat.deleteOne(newChat);
            res.status(200).send();
        }  
        else{
            res.status(500).send();
        }
    } catch (error) {
        res.status(500).send();
    }
})

// get all chats

app.post("/getAllMessages/:id",async(req,res)=>{
    try {
        let {AUTH}=req.body;
        const {id}=req.params;
        if(AUTH===process.env.CHAT_AUTH){
            const myChat=await Chat.findOne({teamId: id}).populate('messages');
            res.status(200).json({
                messages: myChat.messages
            })
        }
        else{
            res.status(500).send();
        }
    } catch (error) {
        console.log(error)
        res.status(500).send();
    }
})

const io= new Server(server, {
    cors:{
        origin : process.env.FRONTEND_URL
    }
})
io.on('connection',(socket)=>{
    console.log("chat connected..")
    socket.on("join-room",room=>{
        socket.join(room);
    })
    socket.on("message",async(my_message,room)=>{
         try {
            const new_message=new Messages(my_message);
            const savedMessage = await new_message.save();
            const myTeam=await Chat.findOne({teamId:room});
            myTeam.messages.push(savedMessage._id);
            myTeam.save();
            io.to(room).emit("receive",savedMessage);
         } catch (error) {
            console.log(error)
            socket.emit("error");
         }
    });
})

server.listen(port,(error)=>{
    if(error)console.log(error);
    console.log(`Chat server is running on port ${port}`);
})