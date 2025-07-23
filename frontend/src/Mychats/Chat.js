import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import socketIO from "socket.io-client";
import Load from "../components/loading";
const Chat = () => {
  const [message, setMessage] = useState("");
  const [allmessage, setAllMessages] = useState([]);
  const User=useSelector((state)=>state.auth.myUser);
  const pageView=useRef(null);
  const {id}=useParams();
  const [loading,setLoading]=useState(true);
    const socketRef = useRef(null);
    const getMessages=async ()=>{
       try {
        let AUTH="chatauthenticationmohit6204";
        const res=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/getAllMessages/${id}`,{AUTH});
        setAllMessages(res.data.messages);
        setLoading(false);
        setTimeout(()=>{
          pageView.current?.scrollIntoView();
        },250)
       } catch (error) {
          console.log(error);
       }
    };
  useEffect(()=>{
    getMessages();
      const socket= socketIO(`${process.env.REACT_APP_BACKEND_URL}`);
    socket.on("receive",newMessage=>{
      setAllMessages((allmessage)=>[...allmessage, newMessage]);
      // because the state variable will only be updated
      // in the next cycle, we need to wait a bit
      // before scrolling down!
      setTimeout(()=>{
        pageView.current?.scrollIntoView();
      },100)
    })
    socket.emit("join-room",id);
    socketRef.current = socket;
    return ()=>{
      socket.disconnect(); 
    console.log("disconnected")

  }
},[])
const socket = socketRef.current;
const handlechange = (event) => {
  const { value } = event.target;
  setMessage(value);
};
  const handleMessage=()=>{
         const my_message={
          userName:User.firstName,
          content:message,
          userId:User._id,
         }
         socket.emit("message",my_message,id);
         setMessage("");
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    handleMessage();
  }
  return (
     loading ? <Load />
      : 
      <div>
      <div className=" bg-white min-h-screen m-10 rounded-2xl overflow-auto flex flex-col dark:bg-black dark:shadow-neutral-600">
        <div className=" border-b-2 h-20 items-center flex dark:bg-slate-400">
          <h1 className=" text-slate-600 dark:text-slate-700 font-light text-3xl flex px-10">Chat</h1>
        </div>
        <div className=" flex-1 overflow-auto max-h-[70vh]">  
           {allmessage&&allmessage.map((member)=>(
               <div className={` p-2 my-2 flex ${member.userId===User._id ? " flex-row-reverse" : " flex-row"}`}>
                <div className="px-2">
                <div className={` flex pb-2 ${member.userId===User._id ? " justify-end" : " justify-start"} font-medium text-sm dark:text-slate-300`}>
                   {member.userName}
                </div>
                 <div className={`border-2 p-4 h-fit w-fit roun ${member.userId===User._id ? " rounded-s-2xl bg-slate-800 text-white " : " rounded-e-2xl  bg-slate-500 text-white"} rounded-b-2xl max-w-2xl break-words dark:border-none`}>
                   {member.content}
                 </div>
                </div>
               </div>
           ))}
           <div ref={pageView}></div>
        </div>
        <form onSubmit={handleSubmit}>
        <div className=" flex h-14 border-2 dark:border-neutral-800 rounded-xl p-2 m-2 hover:shadow-md customCssInputParent">
        <input
            className="dark:text-slate-200 dark:bg-black px-2 overflow-auto w-full focus:outline-none customCssInput "
            type="text"
            id="message"
            name="message"
            value={message}
            placeholder="Message...."
            onChange={handlechange}
          />
          <div className=" items-center flex px-4 cursor-pointer" onClick={handleMessage}>
          <span className=" flex text-xl dark:text-white"><ion-icon name="send-sharp"></ion-icon></span>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};
export default Chat;
