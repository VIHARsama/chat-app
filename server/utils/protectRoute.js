import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const protectRoute = async (req, res, next) => {
   try {
      const token = req.cookies.jwt;
      if (!token) {
         return res.status(401).json({ message: "Unauthorized Access - No Token Provided" });
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (!decodedToken) {
         return res.status(401).json({ message: "Unauthorized Access - Invalid Token Provided" });
      }

      const user = await User.findById(decodedToken.userId).select("-password");
      if (!user) {
         return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
   } catch (err) {
      console.log("error in protectRoute middlware", err.message);
      res.status(500).json({ message: "Internal Server Error" });
   }
};
