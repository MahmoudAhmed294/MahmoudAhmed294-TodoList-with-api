import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IUser } from "../model/auth";


const initialState: IUser = {
  name: '',
  token:  null,
};

export const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state , action:PayloadAction<IUser>) => {
      state.name = action.payload.name;
      state.token = action.payload.token;
    },
    logout: (state ) => {
      state.name = '';
      state.token = null;
    },
  },
});

export const { setUser , logout } = loginSlice.actions;

export const getUser =(state: RootState) => state.user

export default loginSlice.reducer;
