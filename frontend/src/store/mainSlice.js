import { createSlice} from "@reduxjs/toolkit";

const mainSlice = createSlice({
    name:'main',
    initialState:{
         open:false,
         heading:"",
         dark:false,
    },
    reducers:{
      setOpen(state,action){
        state.open=action.payload;
      },
      setHeading(state,action){
        state.heading=action.payload;
      },
      setDark(state,action){
        state.dark=action.payload;
      }
    },
});

export const {setOpen,setHeading,setDark}=mainSlice.actions;
export default mainSlice.reducer;