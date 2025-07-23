import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpen,setHeading } from "../../store/mainSlice";
function NavLinks({pathMap}){
    const dispatch=useDispatch();
    const navState=useSelector((state)=>state.main);
    const links=[{name:"Requests",sublinks:[
        {head:"Pending", link:'/request/Pending'},
        {head:"Accepted", link:'/request/Accepted'}
    ]},{name:"My Teams",sublinks:[
        {head:"All Teams", link:'/teams/myTeams'},
        {head:"Join Requests", link:'/teams/join'},
        {head:"Create Team", link:'/teams/create'}]}]

   return(
     <>
       {links.map((link)=>(
         <div className="z-30">
            <div className="px-3 text-left cursor-default group">
                <h1 className={`dark:text-white md:py-7 py-3 flex justify-between cursor-pointer items-center group relative inline-block overflow-hidden after:absolute after:content-[''] ${pathMap[link.name]?"after:left-0 after:from-blue-200 after:to-blue-500":'after:-left-full after:from-indigo-400 after:to-indigo-700'} after:bg-gradient-to-l after:transition-all hover:after:left-0 ${navState.open ? "after:w-[13%] after:bottom-1" : "after:w-full after:bottom-6"} after:h-[2px] `} onClick={()=>{
                    navState.heading !== link.name ? dispatch(setHeading(link.name)) : dispatch(setHeading(''))
                }}>{link.name}
                
                <span className=" text-xl md:hidden inline ">
                    <ion-icon name={`${navState.heading===link.name ? 'chevron-up' : 'chevron-down'}`}></ion-icon>
                </span>

                <span className=" text-xl md:ml-2 md:mt-1 md:block hidden group-hover:rotate-180 group-hover:-mt-2">
                    <ion-icon name="chevron-down"></ion-icon>
                </span>

                </h1>
                 <div>
                    <div className={` absolute top-20 hidden group-hover:md:block hover:md:block`}>
                        <div className="py-3">
                            <div className=" w-4 h-4 left-3 absolute mt-2
                                bg-white dark:bg-black rotate-45">

                            </div>
                        </div>
                        <div className="bg-white p-3 rounded-md dark:bg-black ">
                            {link.sublinks.map((item)=>(
                              <li className="dark:text-white text-sm my-2.5 hover:text-blue-500 dark:hover:text-blue-500" onClick={()=>dispatch(setHeading(''))}>
                                <Link to={`${item.link}`}>{item.head}</Link>
                              </li>
                            ))}
                        </div>
                    </div>
                 </div>
            </div>
            {/* Mobile View */}
            <div className={`${navState.heading===link.name ? 'md:hidden' : 'hidden'}`}>
                {link.sublinks.map((item)=>(
                    <li className=" py-3 pl-8 md:pr-0 pr-5 dark:text-white hover:text-blue-500 dark:hover:text-blue-500" onClick={()=>{dispatch(setHeading(''));dispatch(setOpen(false))}}>
                        <Link to={item.link}>{item.head}</Link>
                    </li>
                ))}
            </div>
         </div>
       ))}
     </>
   )
}

export default NavLinks;