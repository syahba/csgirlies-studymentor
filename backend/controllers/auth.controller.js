import { supabase } from "../utils/supabase.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { log } from "console";

export const register = async (req, res) => {
  const { email, password, name, age, year, school } = req.body;

  if (!email || !password) {
    return res.status(400).json(new ApiResponse(400, null, "Email and password are required"));
  }

  try {
    // 1️⃣ Check if user exists in your users table
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { 
      // ignore "no rows" error
      throw checkError;
    }

    if (existingUser) {
      return res.status(400).json(new ApiResponse(400, null, "Email already exists, please login."));
    }

    // 2️⃣ Create user in Supabase Auth (admin key)
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, 
    });

    if (authError) throw authError;

    // 3️⃣ Insert into users table and return the inserted row
    const { data, error: insertError, status } = await supabase
      .from("users")
      .insert([
        {
          id: authUser.user.id, // link with Auth user ID
          email,
          name,
          age,
          year,
          school,
        },
      ])
      .select() // important to get the inserted row back
      .single();

    if (insertError) {
      // rollback: delete the Auth user if table insert fails
      await supabase.auth.admin.deleteUser(authUser.user.id);
      throw insertError;
    }

    // 4️⃣ Return success
    return res.status(201).json(
      new ApiResponse(
        201,
        { success: true, user: data },
        "Registered successfully"
      )
    );

  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      return res.status(400).json(new ApiResponse(error.statusCode, null, error.message));
    } else {
      return res.status(500).json(
        new ApiResponse(500, null, "Error registering, please try again later.")
      );
    }
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Sign in using Supabase Auth
    const {data, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(error, data)
    if (error || !data.user) {
      throw new ApiError(400, "Invalid credentials");
    }

    // Fetch extra user info from your table
    const { data: userData, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.user.id)

    if (fetchError) throw new ApiError(400, fetchError.message);
    const user = userData[0]
    return res.status(200).json(
      new ApiResponse(
        200,
        { user },
        "Logged in successfully"
      )
    );
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      return res.status(400).json(new ApiResponse(error.statusCode, null, error.message));
    } else {
      return res.status(500).json(
        new ApiResponse(500, null, "Error logging in, please try again later.")
      );
    }
  }
};