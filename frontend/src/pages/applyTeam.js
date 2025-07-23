import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Load from "../components/loading";

const ApplyTeam = () => {
    const {id}=useParams();
    const check=useSelector((state)=> state.auth);
    const navigate=useNavigate();
    const [text,setText]=useState("");
    const [team,setTeam]=useState({});
    const [loading,setLoading]=useState(true);
    const handleChange=(event)=>{
        const {value } = event.target;
        setText(value);
    }
    const handleApply= async(message)=>{
       try {
          const res=await axios.post(`${process.env.REACT_APP_MAIN_BACKEND}/request/apply`,{message,id},{
            headers:{
                 "authorization":check.myToken,
            }
         });
          navigate("/request/Pending");
       } catch (error) {
        console.log(error);
       }
    }
    const getTeam=async()=>{
       try {
        const res=await axios.get(`${process.env.REACT_APP_MAIN_BACKEND}/request/getTeam/${id}`,{
            headers:{
                 "authorization":check.myToken,
            }
         });
         setTeam(res.data);
         setLoading(false);
       } catch (error) {
         console.log(error);
         setLoading(false);
       }
    }
    useEffect(()=>{
        console.log(id);
       getTeam();
    },[])
   
    return (
      loading ? <>
           <div className="flex justify-center w-full h-full my-40 ">
     <Load />
    </div>
      </> :  <div className="min-h-screen">
            <div className="shadow-md rounded-lg bg-white dark:bg-black m-6 flex flex-col md:flex-row dark:shadow-slate-600">
                <div className="flex flex-1 flex-col w-full md:w-1/2 border-r-2 dark:border-neutral-700">
                    <div className="py-2">
                        <h1 className=" flex justify-center text-xl font-semibold dark:text-slate-300">{team.title}</h1>
                    </div>
                    <div className="px-4 pb-3 dark:text-slate-400">
                        <h1>Members Required - {team.remaining}</h1>
                    </div>
                    <div className="px-4 flex flex-1 dark:text-white pb-2">
                        <h1>Team Admin - {team.name}</h1>
                    </div>
                   {    
                    team.isPending ? <><div className="pt-4 px-4 flex flex-col">
                       <div className="py-2 flex">
                          <h1 className="p-2 flex dark:text-white dark:hover:text-blue-500 hover:border-blue-700 rounded-lg text-center w-fit border-2 hover:text-blue-700 cursor-pointer" onClick={()=>navigate("/request/Pending")}>Your Request is Pending !!</h1>
                       </div>
                       <div className="py-2 dark:text-slate-300">
                          <h1>Your Messgae - {team.message}</h1>
                       </div>
                    </div>
                    </> : <>  <div className=" px-4 w-full">
                        <textarea style={{resize: 'none'}} rows={5} placeholder="Say something to the admin" name="text" value={text} className="dark:border-neutral-700 px-2 border-2 rounded-lg w-full dark:bg-black dark:text-slate-100 " onChange={handleChange}/>
                    </div>
                    <div className="pb-4 flex justify-center">
                        <h1 className="p-2 border-2 rounded-full text-center cursor-pointer bg-black hover:dark:bg-white hover:dark:text-black text-white hover:bg-black/80 duration-100 w-1/6 dark:bg-slate-800" onClick={()=>handleApply(text)}>Apply</h1>
                    </div>
                    </>
                   }
                </div>
                <div className="flex flex-col w-full md:w-1/2 border-t-2 md:border-none">
                    <div className="px-4 pb-3 flex justify-center">
                        <h1 className="text-xl font-semibold dark:text-slate-300">About Team</h1>
                    </div>
                    <div className="px-4 pb-3 flex-1 flex dark:text-slate-500">
                        <p>{team.description}</p>
                    </div>
                    <div className="px-4 pb-3 dark:text-white">
                        <h1>Total Team Strength - {team.intake+1}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ApplyTeam;