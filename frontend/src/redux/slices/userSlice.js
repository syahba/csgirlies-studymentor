// src/redux/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * userSlice
 * - stores userId and school
 * - persists user to localStorage when setUser is called
 * - exposes hydrateUser to restore user from localStorage on app load
 */

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: "",
    school: "",
  },
  reducers: {
    setUser(state, action) {
      state.userId = action.payload.userId;
      state.school = action.payload.school;

      // Persist minimal user info so Redux can be rehydrated after page refresh
      try {
        localStorage.setItem(
          "user",
          JSON.stringify({ userId: action.payload.userId, school: action.payload.school })
        );
      } catch (e) {
        console.warn("Could not save user to localStorage", e);
      }
    },
    // Used when app starts to restore user from localStorage
    hydrateUser(state, action) {
      state.userId = action.payload.userId || "";
      state.school = action.payload.school || "";
    },
  },
});

export const { setUser, hydrateUser } = userSlice.actions;

// register user
export const register = (payload) => {
  return async (dispatch) => {
    const {
      data: {
        data: { user },
      },
    } = await axios.post(
      "http://localhost:3001/api/v1/auth/register",
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    // flag that registration happened
    localStorage.setItem("registerStatus", "true");

    const school = `Year ${user.year} of ${user.school}`;
    dispatch(setUser({ userId: user.id, school }));
  };
};

export default userSlice.reducer;
