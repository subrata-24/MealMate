import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const signUp = async (req, res) => {
  try {
    const { fullname, email, password, mobileNo, role } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exist." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 character." });
    }
    if (mobileNo.le < 11) {
      return res
        .status(400)
        .json({ message: "Mobile number must be 11 digit." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      fullname,
      email,
      role,
      mobileNo,
      password: hashedPassword,
    });
  } catch (error) {}
};
