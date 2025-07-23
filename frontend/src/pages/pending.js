import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Load from "../components/loading";

function Pending() {

     const navigate = useNavigate();
     const check = useSelector((state) => state.auth);
     const [myTeam, setMyTeam] = useState([]);
     const [loading, setLoading] = useState(true);

     const getpending = async () => {
          try {
               const res = await axios.get(`${process.env.REACT_APP_MAIN_BACKEND}/request/pending`, {
                    headers: {
                         "authorization": check.myToken,
                    }
               });
               setMyTeam(res.data);
               setLoading(false);
          } catch (error) {
               setLoading(false);
          }
     }
     useEffect(() => {
          getpending();
     }, []);
     const handleCancel = async (id) => {
          try {
               const res = await axios.get(`${process.env.REACT_APP_MAIN_BACKEND}/request/cancelRequest/${id}`, {
                    headers: {
                         "authorization": check.myToken,
                    }
               });
               console.log(res.data);
               setMyTeam(res.data);
          } catch (error) {
               console.log(error);
          }
     }
     return (
          loading ? <>
               <div className="flex justify-center w-full h-full my-40 ">
                    <Load />
               </div>
          </> :
               myTeam.length ? <>
                    <div className=" flex my-4 flex-col mt-10 min-h-screen">
                         {myTeam.map((team) => (
                              <div className="flex bg-white dark:bg-black my-2 mx-20 rounded-lg px-4 py-2 flex-col md:flex-row justify-between shadow-md dark:shadow-slate-600">
                                   <div className=" flex flex-col pl-2 py-2 overflow-auto w-[100%] md:w-1/2 ">
                                        <div className="py-2">
                                             <h1 className="dark:text-white  flex text-3xl font-medium">{team.title}</h1>
                                        </div>
                                        <div>
                                            <h1 className="dark:text-white  font-medium ">Your message</h1>
                                            <h1 className="pl-2 dark:text-slate-400 text-slate-600 text-sm">"{team.message}"</h1>
                                        </div>
                                        <div className="">
                                             <h1><span className="dark:text-white  text-xl font-medium">{team.size}</span><span className=" text-xs"> Members</span></h1>
                                        </div>
                                        <div className="">
                                             <h1 className=" text-sm text-slate-500"><span className="">By,</span> {team.adminName}</h1>
                                        </div>
                                   </div>
                                   <div className=" flex flex-row md:flex-col justify-between py-2">
                                        <div className=" flex">
                                             <h1 className="dark:bg-red-500 dark:text-white text-sm hover:shadow-md hover:shadow-red-500 border-2 rounded-xl px-2 py-[2px] font-sans font-semibold hover:bg-red-700 hover:text-white cursor-pointer transition-all " onClick={() => handleCancel(team.id)}>Cancel Request <span className=" text-lg"><ion-icon name="close-circle"></ion-icon></span></h1>
                                        </div>
                                        <div className=" text-sm flex justify-center">
                                             <h1 className="dark:bg-blue-500 dark:text-white hover:shadow-md hover:shadow-blue-500  border-2 rounded-xl px-2 py-[2px] font-sans font-semibold hover:bg-blue-700 hover:text-white cursor-pointer transition-all text-center " onClick={() => navigate(`/dashboard/applyTeam/${team.id}`)}>View Team <span className=" text-lg"><ion-icon name="eye"></ion-icon></span></h1>
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </div>
               </> : <>
                    <div className=" flex justify-center p-4 h-screen items-center flex-col dark:text-slate-300">
                         <h1 className=" text-xl font-medium">Sorry, you have not applied for any team.</h1>
                         <div className="py-2 hover:text-blue-600 cursor-pointer" onClick={() => navigate("/dashboard")}>Apply now</div>
                    </div>
               </>

     );
}
export default Pending;