import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Load from "../components/loading";

const ViewTeam = () => {
    const navigate = useNavigate();
    const check = useSelector((state) => state.auth);
    const { id } = useParams();
    const [team, setTeam] = useState({});
    const [loading, setLoading] = useState(true);
    const getMyTeam = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_MAIN_BACKEND}/post/team/${id}`, {
                headers: {
                    "authorization": check.myToken,
                }
            });
            setLoading(false);
            setTeam(res.data);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    useEffect(() => {
        getMyTeam();
    }, [])

    const deleteTeam = async () => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_MAIN_BACKEND}/post/delete/${id}`, {
                headers: {
                    "authorization": check.myToken,
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete = () => {
        deleteTeam();
        navigate("/dashboard");
    }
    const handleMember = async (user_id) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_MAIN_BACKEND}/request/delete/${id}/${user_id}`, {
                headers: {
                    "authorization": check.myToken,
                }
            });
            setTeam(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        loading ? <>
            <div className="flex justify-center w-full h-full my-40 ">
                <Load />
            </div>
        </> : <div>
            <div className="shadow-md rounded-lg bg-white m-6 flex md:flex-row flex-col dark:bg-black dark:shadow-slate-600">
                <div className="flex flex-col w-full md:w-1/2 border-r-2 dark:border-neutral-700 flex-1">
                    <div className="py-2 dark:text-slate-300">
                        <h1 className=" flex justify-center text-xl font-semibold">{team.title}</h1>
                    </div>
                    <div className="px-4 pb-3 py-2 dark:text-slate-100">
                        <h1>Members Required - {team.remaining}</h1>
                    </div>
                        <div className="flex px-4 pb-3 flex-1 dark:text-slate-200">
                            <h1>Team Admin - {team.name}</h1>
                        </div>
                            {
                                check.myUser._id === team.userId ?
                                    <div className="flex flex-row justify-between px-4 py-2">
                                        <div className="dark:text-white hover:shadow-red-500 hover:shadow-md border-2 rounded-xl px-2 py-1 font-sans font-semibold hover:bg-red-700 hover:text-white cursor-pointer transition-all dark:bg-red-500" onClick={() => handleDelete()}>Delete<span><ion-icon name="trash"></ion-icon></span></div>
                                        <div className="dark:text-white hover:shadow-slate-400 hover:shadow-md border-2 rounded-xl px-2 py-1 font-sans font-semibold hover:bg-gray-500 hover:text-white cursor-pointer transition-all dark:bg-gray-500" onClick={() => navigate(`/teams/edit/${id}`)}>Edit<span><ion-icon name="pencil"></ion-icon></span></div>
                                    </div>
                                    : <div className=" dark:text-white hover:shadow-md hover:shadow-slate-600 my-1 mx-auto border-2 rounded-xl px-2 py-1 font-sans font-semibold hover:bg-black/80 hover:text-white cursor-pointer transition-all dark:bg-neutral-500" onClick={() => { handleMember(check.myUser._id); navigate("/") }}>Leave Team<span><ion-icon name="exit-outline"></ion-icon></span></div>
                            }
                </div>
                <div className="flex flex-col w-full md:border-none border-t-2 md:w-1/2 flex-1">
                    <div className="px-4 pb-3 flex justify-center py-1 dark:text-slate-300">
                        <h1 className="text-xl font-semibold">About Team</h1>
                    </div>
                    <div className="px-4 pb-3 flex flex-1 dark:text-slate-500">
                        <p>{team.description}</p>
                    </div>
                    <div className="px-4 pb-3 dark:text-white">
                        <p>{team.skillRequired}</p>
                    </div>
                    <div className="px-4 pb-3 dark:text-slate-200">
                        <h1>Total Team Strength - {team.intake + 1}</h1>
                    </div>
                </div>
            </div>
            <div className="bg-white min-h-[25vw] dark:bg-black">
                <div className=" flex justify-center text-2xl font-semibold py-2 dark:text-slate-100">
                    <h1>Members</h1>
                </div>
                <div className="p-2 px-5 dark:text-white">
                    <div className=" rounded-lg border-2 text-center p-1 text-lg w-28 hover:bg-green-600 hover:shadow-md hover:shadow-green-400 hover:text-slate-100 cursor-pointer transition-all dark:bg-green-600" onClick={()=>navigate(`/chat/${team.teamId}`)}>Chat <span><ion-icon name="chatbubble-ellipses"></ion-icon></span></div>
                </div>
                <ol>
                    {team.members.length ? team.members.map((member) => (
                        <li>
                            <div className="flex justify-between border-2 dark:border-neutral-700 rounded-lg m-4 p-2 md:flex-row flex-col">
                                <div className=" flex md:w-1/2 flex-col overflow-auto w-full dark:text-slate-200 ">
                                    <h1>Name - {member.name}</h1>
                                    <h2>Contact Number - {member.contactNumber}</h2>
                                    <h2>Email - {member.email}</h2>
                                    <h3>Skills - {member.skill}</h3>
                                </div>
                                {check.myUser._id === team.userId && <div className="flex flex-row md:flex-col justify-center py-2">
                                    <div className=" flex ">
                                        <h1 className=" dark:text-white hover:hover:shadow-red-400 hover:shadow-md border-2 rounded-xl px-2 py-1 font-sans font-semibold hover:bg-red-700 hover:text-white cursor-pointer transition-all dark:bg-red-500  " onClick={() => handleMember(member.id)}>Remove Member <span className=" text-xl"><ion-icon name="close-circle"></ion-icon></span></h1>
                                    </div>
                                </div>}
                            </div>
                        </li>
                    )) : <>
                    <div className="flex justify-center p-3 pb-4 mt-16">
                        <h1 className=" text-xl font-medium">Sorry, no member has been added yet.</h1>
                    </div>
                    </>}
                </ol>
            </div>
        </div>
    )
}
export default ViewTeam;