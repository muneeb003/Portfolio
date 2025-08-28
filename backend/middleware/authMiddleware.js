import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(403).json({ message: "Forbidden" });
    }
    jwt.verify(token, process.env.JWT_KEY);
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Invalid Token" });
  }
};
