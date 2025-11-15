import { supabase } from "../utils/supabase.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

export const get_mentor_by_Id = async (req, res) => {
  try {
    const mentorId = req.query.mentorId;

    if (!mentorId) {
      return res
        .status(400)
        .json(new ApiError(400, "mentorId is required"));
    }

    const { data: mentor, error, status } = await supabase
      .from("mentors")
      .select("*")
      .eq("id", mentorId)
      .single();

    if (error) {
      return res
        .status(status || 500)
        .json(new ApiError(status || 500, error.message));
    }

    if (!mentor) {
      return res
        .status(404)
        .json(new ApiError(404, "Mentor not found"));
    }

    // 5. Success response
    return res
      .status(200)
      .json(new ApiResponse(200, mentor, "Mentor fetched successfully"));

  } catch (err) {
    console.error("get_mentor_by_Id error:", err);
    return res
      .status(500)
      .json(new ApiError(500, "Internal server error"));
  }
};