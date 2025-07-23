import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Load from "../components/loading";
function Dashboard() {
   const [val, setVal] = useState("");
   const [initial, setInitial] = useState([]);
   const navigate = useNavigate();
   const check = useSelector((state) => state.auth);
   const [myTeam, setMyTeam] = useState([]);
   const [loading, setLoading] = useState(true);
   const getTeams = async () => {
      try {
         const res = await axios.get(`${process.env.REACT_APP_MAIN_BACKEND}/post/allTeams`);
         setMyTeam(res.data);
         setInitial(res.data);
         setLoading(false);
      } catch (error) {
         console.log(error);
         setLoading(false);
      }
   };
   const getLoginTeams = async () => {
      try {
         const res = await axios.get(`${process.env.REACT_APP_MAIN_BACKEND}/post/getTeams`, {
            headers: {
               "authorization": check.myToken,
            }
         });
         setMyTeam(res.data);
         setInitial(res.data);
         setLoading(false);
      } catch (error) {
         console.log(error);
         setLoading(false);
      }
   }

   useEffect(() => {
      if (check.isLogin) {
         getLoginTeams();
      }
      else {
         getTeams();
      }
   }, []);

   const handleApply = async (id) => {
      try {
         if (check.isLogin) {
            navigate(`/dashboard/applyTeam/${id}`)
         }
         else {
            navigate("/Login")
         }
      } catch (error) {
         console.log(error);
      }
   }
   function handlechange(event) {
      const { value } = event.target;
      const regex = new RegExp(value, 'i');
      setVal(value);
      setMyTeam(initial.filter((team) => (team.title.match(regex) || team.skillRequired.match(regex) || team.adminName.match(regex))));
   }
   return (
      loading ? <>
         <div className="flex justify-center w-full h-full my-40 min-h-screen ">
            <Load />
         </div>
      </> : <>
         <div className=" bg-slate-100 dark:bg-neutral-900 min-h-screen">
            <div className="flex justify-center mt-20">
               <div class="relative text-gray-600 dark:text-white  focus-within:text-gray-400 dark:border-neutral-700 shadow-sm rounded-full w-80 focus-within:shadow-md border-2 focus-within:border-0 ">
                  <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                     <ion-icon name="search-outline" class="w-5 h-5"></ion-icon>
                  </span>
                  <input type="search" class="py-2 text-sm text-white bg-slate-50 dark:bg-neutral-800 rounded-full pl-10 pr-2 focus:outline-none focus:bg-white dark:focus:bg-slate-700 focus:text-gray-900 dark:focus:text-white w-full" placeholder="Search..." value={val} onChange={handlechange} />
               </div>
            </div>
            <div className=" mx-auto py-36 px-8">
               {
                  initial.length ?
                     myTeam.length ? <>
                        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                           {myTeam.map((team) => (
                              <div className="shadow-md rounded-2xl dark:bg-black dark:hover:shadow-slate-600 bg-white m-6 hover:shadow-xl hover:m-5 hover:p-4 duration-200 cursor-pointer p-3 flex flex-col flex-1" onClick={() => handleApply(team._id)}>
                                 <div className="py-2">
                                    <h1 className=" flex justify-center text-2xl font-medium dark:text-slate-400">{team.title}</h1>
                                 </div>
                                 <div className=" flex justify-center py-1 pb-2">
                                    <hr className=" w-full rounded-full bg-black border-[1px] border-gray-200 " />
                                 </div>
                                 <div className=" flex flex-col justify-between py-2 flex-1">
                                    <div className=" flex flex-col flex-1">
                                       <div className="px-4 pb-3 ">
                                          <p className=" text-sm text-slate-600 justify-end">{team.description}</p>
                                       </div>
                                       <div className="px-4 pb-3  dark:text-white">
                                          <p>{team.skillRequired}</p>
                                       </div>
                                    </div>
                                    <div className="">
                                       <div className="px-4 pb-3 flex justify-end  dark:text-white">
                                          <h1><span className=" text-xl font-medium">{team.remaining}</span><span className=" text-xs"> Members Required</span></h1>
                                       </div>
                                       <div className="px-4 pb-3">
                                          <h1 className=" text-sm text-slate-500"><span className="">By,</span> {team.adminName}</h1>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </> : <>
                        <div className=" flex justify-center p-4 items-center flex-col dark:text-slate-300">
                           <h1 className=" text-xl font-medium">Oops, it looks like the team you searched for does not exist.</h1>
                           <h1 className="py-2">We suggest you to try different keywords.</h1>
                        </div>
                     </>
                     : <>
                        <div className=" flex justify-center p-4 items-center dark:text-slate-300">
                           <h1 className=" text-xl font-medium">Sorry, no team is available now.</h1>
                        </div>
                     </>
               }
            </div>
         </div>
      </>
   );
}
export default Dashboard;