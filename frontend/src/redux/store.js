import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/userSlice";
import mentor from "./slices/mentorSlice";
import session from "./slices/sessionSlice";
import setup from "./slices/setupSlice";

const store = configureStore({
  reducer: {
    user,
    mentor,
    session,
    setup,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["setup/addFile", "setup/addFiles", "setup/removeFile"],
        ignoredPaths: ["setup.uploadedFiles"],
      },
    }),
});

export default store;
