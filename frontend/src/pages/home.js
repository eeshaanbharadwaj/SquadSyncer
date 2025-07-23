import React from "react";
import SVG from '../images/team'
import { useSelector } from "react-redux";

const Home = () => {
   const navState = useSelector((state) => state.main)
   return (
      <div className="bg-white dark:bg-neutral-900">
         <div className="flex border-t-2 gap-2 flex-col lg:flex-row">
            <div className="md:flex-1 bg-white flex justify-center flex-col text-center mx-auto px-4 dark:bg-neutral-900">
               
               <h1 className=" font-bold text-7xl md:text-9xl dark:text-slate-300">
                  Squad
               </h1>
               <h1 className=" font-bold text-3xl py-2 dark:text-slate-400">
                  Syncer
               </h1>
               <p className="p-4 text-xl font-light dark:text-slate-200"> Harmonize Your Collaboration : Where Teams Sync Seamlessly with Squad Syncer.</p>
               <p className="p-4 px-2 text-sm tracking-wider leading-6 text-slate-500">Building successful teams starts here. Discover your ideal teammates with SquadSyncer - the cutting-edge app designed to connect you with like - minded individuals who share your goals and passions. Whether you're an entrepreneur with a groundbreaking startup idea, a sports enthusiast looking to join a recreational team, or someone seeking collaborators for a creative project, SquadSyncer has you covered.</p>
            </div>
            <div className="flex md:flex-1">
               <SVG className="w-full dark:bg-neutral-900" dark={navState.dark} />
            </div>
         </div>
      </div>
   )
}
export default Home;