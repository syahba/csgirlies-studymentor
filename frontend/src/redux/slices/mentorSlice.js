import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const mentorSlice = createSlice({
  name: "mentor",
  initialState: {
    mentor: {},
  },
  reducers: {
    setMentor(state, action) {
      state.mentor = action.payload;
    },
  },
});

export const { setMentor } = mentorSlice.actions;

export const getMentor = (mentorId) => {
  return async (dispatch) => {
    const { data } = await axios.get(
      `http://localhost:3001/api/v1/mentor/getId?mentorId=${mentorId}`
    );

    dispatch(setMentor(data));
  };
};

export default mentorSlice.reducer;
