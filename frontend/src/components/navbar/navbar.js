import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavLinks from "./navLinks";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { setLogin, setMyUser } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { setDark, setOpen } from "../../store/mainSlice";

function Navbartop() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    dispatch(setLogin(false));
    dispatch(setMyUser(null));
    navigate("/");
  };
  const location = useLocation();
  const pathMap = {
    home: location.pathname === "/",
    dashboard: location.pathname.includes("/dashboard"),
    Requests: location.pathname.includes("/request"),
    "My Teams": location.pathname.includes("/teams"),
  };
  const check = useSelector((state) => state.auth);
  const navState = useSelector((state) => state.main);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(false);
  return (
    <nav className="bg-white dark:bg-black shadow-lg dark:shadow-slate-800">
      <div className="flex items-center font-medium justify-between">
        <div className="z-50 p-5 md:w-auto w-full flex justify-between ml-4">
        <Link to='/'>
        <h2 className="cursor-pointer h-9 px-4 pl-6 dark:text-yellow-200">
            <span className="font-bold text-3xl ">Squad Syncer</span>
          </h2>
        </Link>
          
        <div className=" flex">
        <div
            className={`pr-10  text-2xl md:hidden ${navState.open&&'hidden'} transition-all duration-200 cursor-pointer dark:text-white`}
            onClick={() => dispatch(setDark(navState.dark?false:true))}
          >
            <ion-icon name={`${navState.dark ? "moon" : "sunny"}`}></ion-icon>
          </div>
          <div
            className="text-3xl md:hidden cursor-pointer transition-all dark:text-white"
            onClick={() => dispatch(setOpen(!navState.open))}
          >
            <ion-icon name={`${navState.open ? "close" : "menu"}`}></ion-icon>

          </div>
        </div>
        </div>
        <ul className="md:flex hidden items-center gap-3 ">
          <li className="flex flex-row gap-7 px-3">
            <div
              className={`dark:text-white py-7 relative inline-block overflow-hidden after:absolute after:content-[''] ${
                pathMap.home
                  ? "after:left-0 after:from-blue-200 after:to-blue-500"
                  : "after:-left-full after:from-indigo-400 after:to-indigo-700"
              } after:bg-gradient-to-l after:transition-all hover:after:left-0 after:bottom-6 after:w-full after:h-[2px] `}
            >
              <Link to="/">Home</Link>
            </div>
            <div
              className={`dark:text-white py-7 relative inline-block overflow-hidden after:absolute after:content-[''] ${
                pathMap.dashboard
                  ? "after:left-0 after:from-blue-200 after:to-blue-500"
                  : "after:-left-full after:from-indigo-400 after:to-indigo-700"
              } after:bg-gradient-to-l after:transition-all hover:after:left-0 after:bottom-6 after:w-full after:h-[2px]`}
            >
              <Link to="/dashboard">Dashboard</Link>
            </div>
          </li>
          {check.isLogin && <NavLinks pathMap={pathMap} />}
        </ul>
        <div className="md:flex hidden mx-4 text-center ">
          <div
            className="pr-10 flex items-center text-2xl max-md:hidden cursor-pointer dark:text-white"
            onClick={() => dispatch(setDark(!navState.dark))}
          >
            <ion-icon name={`${navState.dark ? "moon" : "sunny"}`}></ion-icon>
          </div>
          {!check.isLogin ? (
            <>
           <Link to={`/Login`} className="bg-white hover:shadow-md hover:shadow-slate-700 text-black border-2 px-4 py-1 rounded-full mx-2 hover:bg-black/80 hover:text-white transition-all">Login</Link>
            </>
          ) : (
            <>
              <div className=" text-center">
                {profile && (
                  <div
                    className="absolute h-full w-full inset-0 z-40"
                    onClick={() => {
                      setProfile(false);
                    }}
                  />
                )}
                <div
                  className=" pr-5 cursor-pointer"
                  id="profile"
                  onClick={() => setProfile(!profile)}
                >
                  <span className=" text-3xl dark:text-white">
                    <ion-icon name="person-circle-outline"></ion-icon>
                  </span>
                  <div className=" text-sm text-slate-500 ">
                    {check.myUser.firstName}
                  </div>
                </div>
                <div
                  className={`dark:bg-black bg-white absolute top-20 py-4 px-2 right-3 rounded-lg z-50 ${
                    profile ? "block" : "hidden"
                  } transition-all`}
                >
                  <div
                    className="dark:text-white text-sm py-2  hover:text-blue-700 cursor-pointer"
                    onClick={() => {
                      setProfile(!profile);
                      navigate("/viewProfile");
                    }}
                  >
                    Edit Profile
                  </div>
                  <div
                    className="dark:text-white text-sm py-1 hover:text-blue-700 cursor-pointer"
                    onClick={() => {
                      setProfile(!profile);
                      handleLogout();
                    }}
                  >
                    Logout
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Mobile view */}

        <ul
          className={`
            md:hidden bg-white/40 dark:bg-white/20 absolute backdrop-blur-lg w-full h-full bottom-0 py-24 pl-4
            duration-500 ${navState.open ? "left-0" : "left-[-100%]"} z-30
            `}
        >
          <li>
            <div
              className={`dark:text-white py-3 ml-3 max-w-max cursor-pointer relative block overflow-hidden after:absolute after:content-[''] ${
                pathMap.home
                  ? "after:left-0 after:from-blue-200 after:to-blue-500"
                  : "after:-left-full after:from-indigo-400 after:to-indigo-700"
              } after:bg-gradient-to-l after:transition-all hover:after:left-0 after:bottom-0 after:w-full after:h-[2px]`}
              onClick={() => {
                dispatch(setOpen(false));
                navigate("/");
              }}
            >
              Home
            </div>
            <div
              className={`dark:text-white py-3 ml-3 max-w-max cursor-pointer block relative overflow-hidden after:absolute after:content-[''] ${
                pathMap.dashboard
                  ? "after:left-0 after:from-blue-200 after:to-blue-500"
                  : "after:-left-full after:from-indigo-400 after:to-indigo-700"
              } after:bg-gradient-to-l after:transition-all hover:after:left-0 after:bottom-0 after:w-full after:h-[2px]`}
              onClick={() => {
                dispatch(setOpen(false));
                navigate("/dashboard");
              }}
            >
              Dashboard
            </div>
          </li>
          {check.isLogin && <NavLinks pathMap={pathMap} />}
          <div className="py-5">
            {!check.isLogin ? (
              <>
                <div onClick={() => dispatch(setOpen(false))}>
                <Link to={`/Login`} className="bg-white hover:shadow-md hover:shadow-slate-700 text-black border-2 px-4 py-1 rounded-full mx-2 hover:bg-black/80 hover:text-white transition-all">Login</Link>
                </div>
              </>
            ) : (
              <div onClick={()=>{dispatch(setOpen(false))}}>
                <div onClick={handleLogout} className="mb-4 cursor-pointer bg-white hover:shadow-md hover:shadow-slate-700 text-black border-2 px-4 py-1 rounded-full mx-2 hover:bg-black/80 hover:text-white transition-all w-fit">Logout</div>
                <div onClick={()=>{navigate("/viewProfile")}} className="mb-4 cursor-pointer bg-white hover:shadow-md hover:shadow-slate-700 text-black border-2 px-4 py-1 rounded-full mx-2 hover:bg-black/80 hover:text-white transition-all w-fit">Edit Profile</div>
              </div>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default Navbartop;
