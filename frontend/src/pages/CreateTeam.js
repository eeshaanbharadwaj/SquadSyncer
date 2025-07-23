import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSelector } from "react-redux";

function Createteam() {
     const check=useSelector((state)=>state.auth);
     const makeTeam = async (newTeam) => {
         try {
            if(check.myToken){
            const res=await axios.post(`${process.env.REACT_APP_MAIN_BACKEND}/post/create`,newTeam,{
               headers:{
                    "authorization":check.myToken,
               }
            });
            navigate("/teams/myTeams");}
            else{
               console.log("Access Denied");
            }
         } catch (error) {
           console.log(error);
         }
       }
 
    const navigate=useNavigate();
    const [team, setTeam] = useState({
         title:"",
         description:"",
         intake:null,
         skillRequired:"",
    });
 
    function handlechange(event) {
         const { name, value } = event.target;
         setTeam(myTeam => {
              return {
                   ...myTeam,
                   [name]: value
              };
         });
    }
 
 
 
     return(
         <form>
         <div className="bg-white my-[4%] md:mx-[25%] py-[5%] px-[5%] rounded-2xl shadow-md mx-10 dark:bg-black dark:shadow-slate-600">
            <div className=" flex justify-center text-2xl pb-3">
                <h1 className=" font-bold text-2xl overflow-auto py-1 dark:text-slate-300">Make Your Team Here</h1>
            </div>
            <div className=" flex justify-center py-4 flex-col w-full ">
                <label className=" pl-1 pb-2 text-slate-800 dark:text-slate-100" htmlFor="title">Title</label>
                <input className=" dark:text-slate-200 border-2 rounded-lg px-2 overflow-auto w-full dark:bg-black dark:border-neutral-800" type="text" id="title" name="title" value={team.title} placeholder="Title" required={true} onChange={handlechange}/>
            </div>
            <div className=" flex justify-center py-4 flex-col w-full ">
                <label className=" pl-1 pb-2 text-slate-800 dark:text-slate-100" htmlFor="description">Team Description</label>
                <textarea style={{resize: 'none'}} className=" dark:text-slate-200 border-2 rounded-lg px-2 overflow-auto w-full dark:bg-black dark:border-neutral-800" id="description" name="description" rows={4} value={team.description} required={true} onChange={handlechange}/>
            </div>
            <div className=" flex justify-center py-4 flex-col w-full ">
               <label className=" pl-1 pb-2 text-slate-800 dark:text-slate-100" htmlFor="skillRequired">Skills Required</label>
               <textarea style={{resize: 'none'}} className=" dark:text-slate-200 border-2 rounded-lg px-2 overflow-auto w-full dark:bg-black dark:border-neutral-800" rows={3} id="skillRequired" name="skillRequired" value={team.skillRequired} placeholder="Specify skills and use space in between.." required={true} onChange={handlechange}/>
           </div>
            <div className=" flex justify-center py-4 flex-col ">
                <label className=" pl-1 pb-2 text-slate-800 dark:text-slate-100" htmlFor="intake"> Required number of members</label>
                <input className=" dark:text-slate-200 dark:bg-black dark:border-neutral-800 border-2 rounded-lg px-2 overflow-auto [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" id="intake" name="intake" value={team.intake} placeholder="Intake" required={true} onChange={handlechange}/>
            </div>
            <div className=" flex justify-center pt-4">
                 <button className=" dark:bg-blue-500 dark:hover:bg-blue-700  cursor-pointer rounded-full text-white bg-black px-8 py-1 hover:bg-black/80 overflow-auto text-xl" onClick={(e)=>{
                     e.preventDefault();
                     makeTeam(team);
                 }}>Submit</button>
            </div>
         </div>
         </form>
     )
}
export default Createteam;