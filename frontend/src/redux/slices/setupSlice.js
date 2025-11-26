import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  room_name: "",       // LiveKit room name
  input: "",           // user input text
  uploadedFiles: [],   // raw File objects
  file_paths: [],      // backend-returned file paths
  mentorId: "",        // selected mentor
  connected: false,    // LiveKit room connection status
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
    setConnected: (state, action) => { state.connected = action.payload },
    clearSession: (state) => {
      state.room_name = "";
      state.input = "";
      state.uploadedFiles = [];
      state.file_paths = [];
      state.mentorId = "";
      state.connected = false;
    },
  },
});

export const { setRoomName, setInput, setMentorId, addFile, removeFile, setFilePaths, setConnected, clearSession } =
  sessionSlice.actions;

// room name -> topic (input) + datetime
export const generateRoomName = (topic) => {
  return (dispatch) => {
    const datetime = new Date().toISOString().replace(/[-:.]/g, "");
    const roomName = `${topic.replace(/\s+/g, "_")}_${datetime}`;
    dispatch(setRoomName(roomName));
  }
}

// select topic -> when user inputs a study topic
export const selectTopic = (topic) => {
  return (dispatch) => {
    dispatch(setInput(topic));
  }
}

// add file -> when user selects a document to upload
export const addFiles = (documents) => {
  return (dispatch) => {
    documents.forEach((doc) => dispatch(addFile(doc)));
  };
};

// remove file by index -> when user removes a selected document
export const removeFiles = (index) => {
  return (dispatch) => {
    dispatch(removeFile(index));
  };
};

// upload -> when user uploading a document to get the file path
export const uploadFiles = (formData, roomName) => {
  return async (dispatch) => {
    const res = await axios.post(
      `http://localhost:3001/api/v1/file/upload?room_name=${roomName}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    const files = res?.data?.files || [];

    dispatch(setFilePaths(files.map((f) => f.path)));
  };
};

// add session -> payload {userId, room_name, file_path }
export const addSession = (payload) => {
  return async () => {
    await axios.post(
      "http://localhost:3001/api/v1/session/add",
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    localStorage.setItem("lastRoom", payload.room_name);
  };
};

// select mentor -> when user selects a mentor
export const selectMentor = (mentorId) => {
  return (dispatch) => {
    dispatch(setMentorId(mentorId));
  };
};

// clear setup session -> when user starts a new session
export const clearSetupSession = () => {
  return (dispatch) => {
    dispatch(clearSession());
  };
};

export default sessionSlice.reducer;
