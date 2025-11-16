import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room_name: "",       // LiveKit room name
  input: "",           // user input text
  uploadedFiles: [],   // raw File objects
  file_paths: [],      // backend-returned file paths
  mentorId: "",        // selected mentor
};

const sessionSlice = createSlice({
  name: "setup",
  initialState,
  reducers: {
    setRoomName: (state, action) => { state.room_name = action.payload },
    setInput: (state, action) => { state.input = action.payload },
    setMentorId: (state, action) => { state.mentorId = action.payload },
    addFile: (state, action) => { state.uploadedFiles.push(action.payload) },
    removeFile: (state, action) => {
      state.uploadedFiles = state.uploadedFiles.filter((_, i) => i !== action.payload);
    },
    setFilePaths: (state, action) => { state.file_paths = action.payload },
    clearSession: (state) => {
      state.room_name = "";
      state.input = "";
      state.uploadedFiles = [];
      state.file_paths = [];
      state.mentorId = "";
    },
  },
});

export const { setRoomName, setInput, setMentorId, addFile, removeFile, setFilePaths, clearSession } =
  sessionSlice.actions;

export default sessionSlice.reducer;