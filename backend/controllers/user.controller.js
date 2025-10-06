import User from "../models/user.model.js";

// “Who is currently logged in, and what is their info?”
// Provide a secure way to fetch the currently logged-in user’s information using the JWT, without requiring the user to log in again.The user may refresh the page, open the app later, or return after some time.The frontend no longer has the user info in memory — it only has the JWT cookie.After login, or on page refresh, the frontend can call this endpoint to get the user’s details(like name, email, role) based on the JWT stored in cookies.
export const getCurrentUser = async (req, res) => {
  try {
    const userID = req.userID;
    if (!userID) {
      return res.status(400).json({ message: "userID is not found" });
    }

    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "get current user error" });
  }
};

export const updateUserLocation = async (req, res) => {
  try {
    const { lat, lon } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userID,
      {
        location: {
          type: "Point",
          coordinates: [lon, lat],
        },
      },
      { new: true }
    );
    if (!user) {
      return res.status(400).json({ message: "User is not found" });
    }

    return res.status(200).json({ message: "Location is updated" });
  } catch (error) {
    return res.status(500).json({ message: "Update location error" });
  }
};
