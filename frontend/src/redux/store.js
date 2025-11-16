import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/userSlice";
import mentor from "./slices/mentorSlice";
import session from "./slices/sessionSlice";

const store = configureStore({
  reducer: {
    user,
    mentor,
    session,
  },
});

export default store;
