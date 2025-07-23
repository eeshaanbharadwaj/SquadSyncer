import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin,setMyUser,setMyToken } from "../store/authSlice";
import axios from "axios";

const Register=()=>{
    const [exist,setExist]=useState(false);
    const dispatch=useDispatch();
    const addUser = async (newUser) => {
        try {
          const res=await axios.post(`${process.env.REACT_APP_MAIN_BACKEND}/auth/register`,newUser);
          if(res.status===500){
            console.log(res.data);
            return;
          }
          console.log(res.data);
          dispatch(setLogin(true));
          dispatch(setMyUser(res.data.curUser));
           window.localStorage.setItem("token",res.data.token);
           dispatch(setMyToken(res.data.token));
           navigate("/");
        } catch (error) {
            console.log(error)
          let str=error?.response?.data?.error;
          if(str && typeof str==="string" && str.slice(0,6) === "E11000"){
            setExist("!!User with same email already exist.");
          }else if(str){
            setExist(str)
          }else{
            setExist("Something went Wrong!")
          }
        //   console.log(error.response.data.error);
        }
      }

   const navigate=useNavigate();
   const [User, setUser] = useState({
        firstName: "",
        lastName: "",
        contactNumber:null,
        skills:"",
        email:"",
        password:""
   })

   function handlechange(event) {
        const { name, value } = event.target;
        setUser(user => {
             return {
                  ...user,
                  [name]: value
             };
        });
   }



    return(
        <div className=" bg-slate-100 dark:bg-neutral-900">
        <div className="bg-white my-[4%] md:mx-[25%] py-[5%] px-[5%] rounded-2xl shadow-md mx-10 dark:bg-black dark:shadow-neutral-600 " onClick={()=>setExist(false)}>
           <div className=" flex justify-center text-2xl pb-2">
               <h1 className="dark:text-slate-300 font-bold text-2xl overflow-auto p-1"><span className="px-2 z-20"><ion-icon name="person-add"></ion-icon></span>REGISTER</h1>
           </div>
           <div className=" flex flex-col justify-between overflow-auto xl:flex-row ">
           <div className=" flex justify-center py-4 flex-col xl:w-2/5 w-full">
               <label className="dark:text-slate-100 pl-1 pb-2 text-slate-800" htmlFor="firstName">First Name</label>
               <input className="dark:text-slate-200 dark:bg-black dark:border-neutral-800 border-2 rounded-lg px-2 overflow-auto" type="text" id="firstName" name="firstName" value={User.firstName} placeholder="First Name" required={true} onChange={handlechange}/>
           </div>
           <div className=" flex justify-center py-4 flex-col xl:w-2/5 w-full">
               <label className="dark:text-slate-100 pl-1 pb-2 text-slate-800" htmlFor="lastName">Last Name</label>
               <input className="dark:text-slate-200 dark:bg-black dark:border-neutral-800 border-2 rounded-lg px-2 overflow-auto" type="text" id="lastName" name="lastName" value={User.lastName} placeholder="Last Name" required={true} onChange={handlechange}/>
           </div>
           </div>
           <div className=" flex justify-center py-4 flex-col">
               <label className="dark:text-slate-100 pl-1 pb-2 text-slate-800" htmlFor="contactNumber">Contact Number</label>
               <input className="dark:text-slate-200 dark:bg-black dark:border-neutral-800 border-2 rounded-lg px-2 overflow-auto [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" id="contactNumber" name="contactNumber" value={User.contactNumber} placeholder="Enter your Contact Number" required={true} onChange={handlechange}/>
           </div>
           <div className=" flex justify-center py-4 flex-col">
               <label className="dark:text-slate-100 pl-1 pb-2 text-slate-800" htmlFor="skills">Skills</label>
               <textarea style={{resize: 'none'}} className="dark:text-slate-200 dark:bg-black dark:border-neutral-800 border-2 rounded-lg px-2 overflow-auto" rows={3} id="skills" name="skills" value={User.skills} placeholder="Enter your skills and use space in between.." required={true} onChange={handlechange}/>
           </div>
           <div className=" flex justify-center py-4 flex-col">
               <label className="dark:text-slate-100 pl-1 pb-2 text-slate-800" htmlFor="email">Email</label>
               <input className="dark:text-slate-200 dark:bg-black dark:border-neutral-800 border-2 rounded-lg px-2 overflow-auto" type="email" id="email" name="email" value={User.email} placeholder="Enter your Email" required={true} onChange={handlechange}/>
           </div>
           <div className=" flex justify-center pb-4 flex-col">
               <label className="dark:text-slate-100 pl-1 pb-2 text-slate-800" htmlFor="password">Password</label>
               <input className="dark:text-slate-200 dark:bg-black dark:border-neutral-800 border-2 rounded-lg px-2 overflow-auto w-full" type="password" id="password" name="password" value={User.password} placeholder="Enter your Password" required={true} onChange={handlechange}/>
           </div>
           <div className=" flex justify-center pt-4">
                <button className="dark:bg-blue-500 dark:hover:bg-blue-700 cursor-pointer rounded-full text-white bg-black px-8 py-1 hover:bg-black/80 overflow-auto text-xl" onClick={(e)=>{
                    e.preventDefault();
                    addUser(User);
                }}>Submit</button>
           </div>
           <div className=" flex justify-center pt-6" >
            <h1 className=" dark:text-white hover:text-blue-700 dark:hover:text-blue-500 cursor-pointer" onClick={()=>navigate("/Login")}>Already have an Account</h1>
        </div>
        {(exist)&&<div className=" flex justify-center pt-6" >
            <h1 className=" text-red-700 font-semibold">{exist}</h1>
        </div>}
        </div>
       </div>
    )
}
export default Register;