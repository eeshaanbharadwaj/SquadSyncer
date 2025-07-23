import react from "react"
import ClockLoader from "react-spinners/ClockLoader"

const Load=()=>{
   return (
      <div className="flex flex-col items-center min-h-screen dark:bg-neutral-900">
        <div className="flex justify-center py-5">
            <h1 className=" text-xl font-bold text-yellow-500">NOW LOADING</h1>
        </div>
        <div className="flex justify-center py-5">
           <ClockLoader color="#FFCC33" size={50}/>
        </div>
      </div>
   )
}
export default Load;