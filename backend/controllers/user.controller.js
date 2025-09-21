import User from "../models/user.model.js";

// “Who is currently logged in, and what is their info?”
// Provide a secure way to fetch the currently logged-in user’s information using the JWT, without requiring the user to log in again.The user may refresh the page, open the app later, or return after some time.The frontend no longer has the user info in memory — it only has the JWT cookie.After login, or on page refresh, the frontend can call this endpoint to get the user’s details(like name, email, role) based on the JWT stored in cookies.

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "userId is not found" });
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `get current user error ${error}` });
  }
};
