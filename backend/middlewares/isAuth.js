import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "Token not found" });
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodeToken) {
      return res.status(400).json({ message: "Token not verified" });
    }

    console.log("Decoded JWT:", decodeToken);
    req.userId = decodeToken.userID;
    next();
  } catch (error) {
    console.error("isAuth error:", error);
    res.status(500).json({ message: "isAuth error" });
  }
};

export default isAuth;
