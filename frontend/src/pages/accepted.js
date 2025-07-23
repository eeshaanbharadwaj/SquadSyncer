import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Load from "../components/loading";

function Accepted() {

   const navigate = useNavigate();
   const check = useSelector((state) => state.auth);
   const [myTeam, setMyTeam] = useState([]);
   const [loading, setLoading] = useState(true);
   const getAccepted = async () => {
      try {
         const res = await axios.get(`${process.env.REACT_APP_MAIN_BACKEND}/request/accepted`, {
            headers: {
               "authorization": check.myToken,
            }
         });
         setMyTeam(res.data);
         setLoading(false);
      } catch (error) {
         console.log(error);
         setLoading(false);
      }
   }
   useEffect(() => {
      getAccepted();
   }, [])

   const handleView = (team) => {
      try {
         navigate(`/teams/${team.id}`)
      } catch (error) {

      }
   }

   return (
      loading ? <>
         <div className="flex justify-center w-full h-full my-40 ">
            <Load />
         </div>
      </> :
         myTeam.length ? <div className="flex min-h-screen w-full">
            <div className="  my-6 py-2 px-8 bg-slate-100 dark:bg-neutral-900 w-full">
               <div className="grid w-full xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                  {myTeam.map((team) => (
                     <div className="dark:bg-black hover:dark:shadow-slate-600 shadow-md flex flex-1 flex-col rounded-2xl bg-white m-6 hover:shadow-xl hover:m-5 duration-200 cursor-pointer p-3 hover:p-4" onClick={() => handleView(team)}>
                        <div className="py-2">
                           <h1 className=" flex justify-center text-2xl font-medium dark:text-slate-400">{team.title}</h1>
                        </div>
                        <div className=" flex justify-center py-1 pb-2">
                           <hr className=" w-full rounded-full bg-black border-[1px] border-gray-200 " />
                        </div>
                        <div className="px-4 pb-3 flex flex-1 ">
                           <p className=" text-sm text-slate-600 justify-end">{team.description}</p>
                        </div>
                        <div className="px-4 pb-3 flex justify-end dark:text-white">
                           <h1><span className=" text-xl font-medium ">{team.size}</span><span className=" text-xs"> Members</span></h1>
                        </div>
                        <div className="px-4 pb-3">
                           <h1 className=" text-sm text-slate-500"><span className="">By,</span> {team.adminName}</h1>
                        </div>
                     </div>

                  ))}
               </div>
            </div>
         </div> : <>
            <div className=" flex justify-center p-4 h-screen items-center flex-col dark:text-slate-300">
               <h1 className=" text-xl font-medium">Sorry, you are not added to any team yet.</h1>
               <div className="py-2 hover:text-blue-600 cursor-pointer" onClick={() => navigate("/Pending")}>Your Requests</div>
            </div>
         </>
   );
}
export default Accepted;