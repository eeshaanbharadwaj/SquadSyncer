import { createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        isLogin:false,  
        myUser:null,
        myToken:null,
    },
    reducers:{
      setLogin(state,action){
        state.isLogin=action.payload;
      },
      setMyUser(state,action){
        state.myUser=action.payload;
      },
      setMyToken(state,action){
        state.myToken=action.payload;
      },
    },
});

export const {setLogin,setMyUser,setMyToken}=authSlice.actions;
export default authSlice.reducer;