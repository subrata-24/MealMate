import jwt, { decode } from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(400).json({ message: "Token not found" });
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodeToken) {
      res.status(400).json({ message: "Token not verified" });
    }

    console.log(decodeToken);
    const userId = decodeToken.userId;
    next();
  } catch (error) {
    res.status(500).json({ message: "isAuth error" });
  }
};
