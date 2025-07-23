import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {setMyUser } from "../store/authSlice";
import axios from "axios";

const EditProfile=()=>{
    const check=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const [loading,setLoading]=useState(true);
    const saveChanges = async (newUser) => {
        try {
           if(check.myToken){
           const res=await axios.patch(`${process.env.REACT_APP_MAIN_BACKEND}/auth/editProfile`,newUser,{
              headers:{
                   "authorization":check.myToken,
              }
           });
           console.log(res.data);
            dispatch(setMyUser(res.data));
           }
           else{
              console.log("Access Denied");
           }
        } catch (error) {
          console.log(error);
        }
      }
      const [User, setUser] = useState({})
      const getProfile=async()=>{
        try {
             const res=await axios.get(`${process.env.REACT_APP_MAIN_BACKEND}/auth/edit`,{
                  headers:{
                       "authorization":check.myToken,
                  }
               });
             setUser(res.data);
             setLoading(false);
        } catch (error) {
             console.log(error);
             setLoading(false);
        }
       }
       useEffect(()=>{
        getProfile();
      },[])

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



    return(
       loading ? <>
       </> : <>
       <form>
        <div className="bg-white my-[4%] md:mx-[25%] py-[5%] px-[5%] rounded-2xl shadow-md mx-10 dark:bg-black dark:shadow-neutral-600 ">
           <div className=" flex justify-center text-2xl pb-2 ">
               <h1 className=" font-bold text-2xl overflow-auto p-1 dark:text-slate-300">Edit your Profile<span className="px-2 z-20"><ion-icon name="pencil-outline"></ion-icon></span></h1>
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
           <div className=" flex justify-center pt-4">
                <button className="dark:bg-blue-500 dark:hover:bg-blue-700  cursor-pointer rounded-full text-white bg-black px-8 py-1 hover:bg-black/80 overflow-auto text-xl" onClick={(e)=>{
                    e.preventDefault();
                    saveChanges(User);
                    navigate("/");
                }}>Save</button>
           </div>
        </div>
        </form>
       </>
    )
}
export default EditProfile;