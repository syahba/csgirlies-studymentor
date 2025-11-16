import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    summaryHistories: [],
  },
  reducers: {
    setHistory(state, action) {
      state.summaryHistories = action.payload;
    },
  },
});

export const { setHistory } = sessionSlice.actions;

export const getSessions = (userId) => {
  return async (dispatch) => {
    const { data } = await axios.get(
      `http://localhost:3001/api/v1/session/all?userId=${userId}`
    );

    dispatch(setHistory(data));
  };
};

export default sessionSlice.reducer;
