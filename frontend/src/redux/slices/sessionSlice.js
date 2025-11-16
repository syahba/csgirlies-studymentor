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

// download summary pdf
export const downloadPdf = (roomId) => {
  return async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/file/download?room_name=${roomId}`,
        {
          responseType: "blob",
        }
      );

      if (!response || !response.data) {
        throw new Error("No file data received.");
      }

      const blob = new Blob([response.data], { type: "application/pdf" });

      // Validate file is actually a PDF blob
      if (blob.size === 0) {
        throw new Error("Received empty PDF file.");
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      const topicName = roomId.split("_")[0] || "summary";
      link.href = url;
      link.download = `${topicName}_summary.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF Download Error:", err);
      alert("Failed to download PDF. Check backend response.");
    }
  };
};

export default sessionSlice.reducer;
