import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
   const { fullName, email, password, confirmPassword } = req.body;
   try {
      // check username
      if (!email) {
         return res.status(400).json({ message: "Email is required" });
      }

      const existUser = await User.findOne({ email });
      if (existUser) {
         return res.status(400).json({ message: "Email already exists" });
      }

      // check password
      if (password.length < 6) {
         return res.json(400).json({ message: "Password must be at least 6 characters" });
      }
      if (!password) {
         return res.status(400).json({ message: "Password is required" });
      }

      if (password != confirmPassword) {
         return res.status(400).json({ message: "Passwords don't match" });
      }

      // check other parameters
      if (!fullName) {
         return res.status(400).json({ message: "Please enter your name" });
      }

      // hashed password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
         email: email,
         fullName: fullName,
         password: hashedPassword,
      });

      if (newUser) {
         // generate JWT token here
         generateToken(newUser._id, res);
         await newUser.save();

         res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
         });
      } else {
         res.status(400).json({ message: "Invalid user data" });
      }
   } catch (err) {
      console.log("error in register controller", err.message);
      res.status(500).json({ message: "Internal Server Error" });
   }
};

export const login = async (req, res) => {
   const { email, password } = req.body;
   try {
      const existUser = await User.findOne({ email });

      if (!existUser) {
         return res.status(400).json({ message: "Invalid credentials" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, existUser.password);
      if (!isPasswordCorrect) {
         return res.status(400).json({ message: "Invalid credentials" });
      }

      generateToken(existUser._id, res);

      res.status(200).json({
         _id: existUser._id,
         fullName: existUser.fullName,
         email: existUser.email,
         profilePic: existUser.profilePic,
      });
   } catch (err) {
      console.log("error in login controller", err.message);
      res.status(500).json({ message: "Internal Server Error" });
   }
};

export const logout = (req, res) => {
   try {
      res.cookie("jwt", "", { maxAge: 0 });
      res.status(200).json({ message: "Logged out successfully" });
   } catch (err) {
      console.log("Error in logout controller:", err.message);
      res.status(500).json({ message: "Internal Server Error" });
   }
};

export const updateProfile = async (req, res) => {
   try {
      const { profilePic } = req.body;
      const userId = req.user._id;

      if (!profilePic) {
         return res.status(400).json({ message: "Profile pic is required" });
      }

      const uploadProfilePic = await cloudinary.uploader.upload(profilePic);
      const updatedUser = await User.findByIdAndUpdate(
         userId,
         { profilePic: uploadProfilePic.secure_url },
         { new: true },
      );

      res.status(200).json(updatedUser);
   } catch (err) {
      console.log("error in update profile", err.message);
      res.status(500).json({ message: "Internal Server Error" });
   }
};

export const checkAuth = (req, res) => {
   try {
      res.status(200).json(req.user);
   } catch (err) {
      console.log("Error in checkAuth controller", err.message);
      res.status(500).json({ message: "Internal Server Error" });
   }
};
