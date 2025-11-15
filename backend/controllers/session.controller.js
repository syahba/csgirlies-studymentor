import { supabase } from "../utils/supabase.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

export const get_sessions = async (req, res) => {
  console.log("request in get all session");

  try {
    const userId = req.query.userId;

    if (!userId) {
      return res
        .status(400)
        .json(new ApiError(400, "userId is required"));
    }

	const { data, error, status } = await supabase
      .from("sessions")
      .select("room_name, created_at")
      .eq("userId", userId)
      .order("created_at", { ascending: false });

    if (error) {
      return res
        .status(status || 500)
        .json(new ApiError(status || 500, error.message));
    }

    const cleaned = data.map((session) => ({
      room_name: session.room_name,
      date: new Date(session.created_at).toISOString().split("T")[0] // "YYYY-MM-DD"
    }));

    return res
      .status(200)
      .json(new ApiResponse(200, cleaned, "Sessions fetched successfully"));

  } catch (err) {
    console.error("get_sessions error:", err);
    return res
      .status(500)
      .json(new ApiError(500, "Internal server error"));
  }
};

// call this after generating room_name, and upload, before connecting to session
export const create_session = async (req, res) => {
	console.log("request in create session")
  try {
	// get filepath from response when file is uploaded
    const { userId, room_name, file_path } = req.body;

    if (!userId || !room_name) {
      throw new ApiError(400, "userId and room_name are required");
    }

    // Insert session
    const { data, error } = await supabase
      .from("sessions")
      .insert([
        {
          userId: userId,      // IMPORTANT: matches DB column name
          room_name: room_name,
          uploaded_files: file_path || []   // array of filenames
        }
      ])
      .select()
      .single();

    if (error) {
      throw new ApiError(500, error.message);
    }

    return res
      .status(201)
      .json(new ApiResponse(201, data, "Session created successfully"));
  } catch (err) {
    console.error("SESSION CREATE ERROR:", err);
    return res
      .status(err.statusCode || 500)
      .json(new ApiError(err.statusCode || 500, err.message));
  }
};