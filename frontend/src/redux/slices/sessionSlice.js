import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    summary: {},
    summaryHistories: [],
  },
  reducers: {
    setSummary(state, action) {
      state.summary = action.payload;
    },
    setHistory(state, action) {
      state.summaryHistories = action.payload;
    },
  },
});

export const { setSummary, setHistory } = sessionSlice.actions;

export const getSessions = (userId) => {
  return async (dispatch) => {
    const { data } = await axios.get(
      `http://localhost:3001/api/v1/session/all${
        userId ? "?userId=" + userId : ""
      }`
    );

    if (userId) {
      dispatch(setSummary(data[0]));
    } else {
      dispatch(setHistory(data));
    }
  };
};

export default sessionSlice.reducer;
