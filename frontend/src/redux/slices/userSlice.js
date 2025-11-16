import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlide = createSlice({
  name: "user",
  initialState: {
    userId: "",
    registerStatus: false,
  },
  reducers: {
    setUser(state, action) {
      state.userId = action.payload.userId;
      state.registerStatus = action.payload.registerStatus;
    },
  },
});

export const { setUser } = userSlide.actions;

export const register = (payload) => {
  return async (dispatch) => {
    const {
      data: { user },
    } = await axios.post("http://localhost:3001/api/v1/auth/register", {
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    });

    const storageKey = "registerStatus";
    localStorage.setItem(storageKey, "true");

    const registerStatus = JSON.parse(localStorage.getItem(storageKey));

    dispatch(setUser({ userId: user.id, registerStatus }));
  };
};

export default userSlide.reducer;
