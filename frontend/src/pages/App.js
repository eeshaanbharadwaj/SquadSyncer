import Navbar from "../components/navbar/navbar";
import CreateTeam from "./CreateTeam";
import Footer from "../components/footer/Footer";
import Accepted from "./accepted";
import Pending from "./pending";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import { useEffect, useState } from "react";
import axios from "axios";
import { setLogin, setMyToken, setMyUser } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Load from "../components/loading";
import ApplyTeam from "./applyTeam";
import MyTeams from "./myTeams";
import ViewTeam from "./viewTeam";
import Join from "./joinRequest";
import EditProfile from "./editProfile";
import PageNotFound from "../components/pageNotFound";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Chat from "../Mychats/Chat";
import { setDark } from "../store/mainSlice";
import EditTeam from "./editTeam";

function App() {
  const check = useSelector((state) => state.auth);
  const reduxDarkStore = useSelector((state) => state.main);
  const [parent, _] = useAutoAnimate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const getMode = () => {
    let mode = window.localStorage.getItem("dark");
    console.log(mode);
    if (!mode || mode==="false") {
      window.localStorage.setItem("dark", false);
      dispatch(setDark(false));
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        window.localStorage.setItem("dark", false);
      }
    } else {
      window.localStorage.setItem("dark", true);
      dispatch(setDark(true));
      if (!document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.add("dark");
        window.localStorage.setItem("dark", true);
      }
    }
  };
  useEffect(() => {
    if (reduxDarkStore.dark) {
      if (!document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.add("dark");
        window.localStorage.setItem("dark", true);
      }
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        window.localStorage.setItem("dark", false);
      }
    }
  }, [reduxDarkStore.dark]);
  const getTeam = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const res = await axios.get(`${process.env.REACT_APP_MAIN_BACKEND}/auth/getUser`, {
        headers: {
          authorization: token,
        },
      });
      const { password, ...curUser } = res.data;
      dispatch(setLogin(true));
      dispatch(setMyUser(curUser));
      dispatch(setMyToken(token));
      setLoading(false);
    } catch (error) {
      window.localStorage.removeItem("token");
      dispatch(setLogin(false));
      dispatch(setMyUser(null));
      dispatch(setMyToken(null));
      setLoading(false);
    }
  };
  useEffect(() => {
    getMode();
    getTeam();
  }, []);
  return loading && !check.isLogin ? (
    <div className="flex flex-col justify-center pt-[25vh] dark:bg-neutral-900">
      <Load />
    </div>
  ) : (
    <div
      className=" bg-slate-100 dark:bg-neutral-900 min-h-screen relative"
      ref={parent}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        {check.isLogin ? (
          <>
            <Route path="/teams/create" element={<CreateTeam />} />
            <Route path="/request/Accepted" element={<Accepted />} />
            <Route path="/request/Pending" element={<Pending />} />
            <Route path="/teams/edit/:id" element={<EditTeam />} />
            <Route path="/dashboard/applyTeam/:id" element={<ApplyTeam />} />
            <Route path="/teams/myTeams" element={<MyTeams />} />
            <Route path="/teams/:id" element={<ViewTeam />} />
            <Route path="/teams/join" element={<Join />} />
            <Route path="/viewProfile" element={<EditProfile />} />
            <Route path="/chat/:id" element={<Chat />} />
          </>
        ) : null}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
