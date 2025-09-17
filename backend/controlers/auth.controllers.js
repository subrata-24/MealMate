import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";

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

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(`sign up error ${error}`);
  }
};
