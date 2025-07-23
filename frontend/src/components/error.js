import react from "react";
const Error=({message})=>{
   return (
     <div className="h-screen flex justify-center items-center flex-col dark:text-white ">
        <div className=" font-bold text-2xl text-red-500 font-serif"><span className="text-4xl">O</span>ops, <span className="text-4xl">S</span>omething <span className="text-4xl">W</span>ent <span className="text-4xl">W</span>rong !!!</div>
        <div className=" p-2 text-lg">{message}</div>
     </div>
   )
}
export default Error;