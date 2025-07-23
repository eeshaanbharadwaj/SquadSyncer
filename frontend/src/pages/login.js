import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin, setMyToken, setMyUser } from "../store/authSlice";

const Login=()=>{
    const dispatch=useDispatch();
    const [message,setMessage]=useState("");
    const checkLogin = async (newUser)=>{
       try {
         const res=await axios.post(`${process.env.REACT_APP_MAIN_BACKEND}/auth/login`,newUser);
         if(res.status===500){
            console.log(res.data);
            return;
         }
         dispatch(setLogin(true));
         dispatch(setMyUser(res.data.curUser));
          window.localStorage.setItem("token",res.data.token);
          dispatch(setMyToken(res.data.token));
          navigate("/");

        navigate("/");
       } catch (error) {
        setMessage(error.response.data.message);
           console.log(error.response.data.message);
       }
    }

    const [User,setUser]=useState({
        email:"",
        password:"",
    });
    const navigate=useNavigate();

    function handlechange(event) {
        const { name, value } = event.target;
        setUser(user => {
             return {
                  ...user,
                  [name]: value
             };
        });
   }

  return (
    <form>
     <div className="bg-white my-[6%] md:mx-[30%] py-[5%] px-[5%] rounded-2xl shadow-md mx-20 dark:bg-black dark:shadow-neutral-600 ">
        <div className=" flex justify-center text-2xl">
            <h1 className="dark:text-slate-300 font-bold text-2xl overflow-auto p-1"><span className="px-2 z-0"><ion-icon name="person"></ion-icon></span>LOG IN</h1>
        </div>
        <div className=" flex justify-center py-4 flex-col" onClick={()=>setMessage("")}>
            <label className="dark:text-slate-100 pl-1 pb-2 text-slate-800" htmlFor="email">Email</label>
            <input className="dark:text-slate-200 dark:bg-black dark:border-neutral-800 border-2 rounded-lg px-2 overflow-auto" type="email" id="email" name="email" value={User.email} placeholder="Enter your Email" required={true} onChange={handlechange}/>
        </div>
        <div className=" flex justify-center pb-4 flex-col"  onClick={()=>setMessage("")}>
            <label className="dark:text-slate-100 pl-1 pb-2 text-slate-800" htmlFor="password">Password</label>
            <input className="dark:text-slate-200 dark:bg-black dark:border-neutral-800 border-2 rounded-lg px-2 overflow-auto w-full" type="password" id="password" name="password" value={User.password} placeholder="Enter your Password" required={true} onChange={handlechange}/>
        </div>
        <div className=" flex justify-center pt-4">
             <button className="dark:bg-blue-500 dark:hover:bg-blue-700 cursor-pointer rounded-full text-white bg-black px-8 py-1 hover:bg-black/80 overflow-auto text-xl" onClick={(e)=>{
                e.preventDefault();
                checkLogin(User);
             }}>Submit</button>
        </div>
        <div className=" flex justify-center pt-6" >
            <h1 className="dark:text-white hover:text-blue-700 dark:hover:text-blue-500 cursor-pointer" onClick={()=>navigate("/Register")}>Don't have an Account?</h1>
        </div>
        {(message!=="")&&<div className=" flex justify-center pt-6" >
            <h1 className=" text-red-700 font-semibold">!!  {message}</h1>
        </div>}
     </div>
     </form>
  )
}

export default Login;