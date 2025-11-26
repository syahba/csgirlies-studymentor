import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch study sessions
export const fetchStudySessions = createAsyncThunk(
  "studySessions/fetchStudySessions",
  async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/session/all?userId=${userId}`
      );
      return response.data.data; // The API returns { data: sessions[] }
    } catch (error) {
      console.error("Error fetching study sessions:", error);
      throw error;
    }
  }
);

// Async thunk to download session summary
export const downloadSessionSummary = createAsyncThunk(
  "studySessions/downloadSummary",
  async (roomName) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/file/download?room_name=${roomName}`,
        {
          responseType: "blob" // Important for file download
        }
      );

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${roomName}_summary.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      return { success: true, roomName };
    } catch (error) {
      console.error("Error downloading summary:", error);
      throw error;
    }
  }
);

const studySessionsSlice = createSlice({
  name: "studySessions",
  initialState: {
    sessions: [],
    loading: false,
    error: null,
    downloading: null, // Track which session is downloading
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudySessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudySessions.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload;
      })
      .addCase(fetchStudySessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch study sessions";
      })
      .addCase(downloadSessionSummary.pending, (state, action) => {
        state.downloading = action.meta.arg; // room_name being downloaded
      })
      .addCase(downloadSessionSummary.fulfilled, (state) => {
        state.downloading = null;
      })
      .addCase(downloadSessionSummary.rejected, (state, action) => {
        state.downloading = null;
        state.error = action.error.message || "Failed to download summary";
      });
  },
});

export const { clearError } = studySessionsSlice.actions;
export default studySessionsSlice.reducer;
