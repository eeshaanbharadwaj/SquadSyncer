import { useNavigate } from "react-router-dom";
const PageNotFound=()=>{
  const navigate=useNavigate();
  return (
      <div className=" flex justify-center h-screen items-center dark:text-slate-300 ">
        <div className=" flex flex-col">
        <div className=" flex p-2 text-2xl font-semibold">Sorry, the page you are requesting does not exist.</div>
        <div className=" p-2 flex justify-center" onClick={()=>navigate("/")}><span className=" hover:text-blue-700 cursor-pointer"><ion-icon name="home"></ion-icon> Back to home</span></div>
    </div>
      </div>
  )
}
export default PageNotFound;