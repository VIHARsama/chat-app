import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server } from "./utils/socket.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

app.use(
   cors({
      credentials: true,
      origin: "http://localhost:5173",
   }),
);
app.use(express.json());
app.use(cookieParser());

dotenv.config();

// dotenv variables
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose
   .connect(MONGODB_URL)
   .then(() => {
      console.log("connected to MongoDB");
   })
   .catch((error) => {
      console.log("error connecting to MongoDB: ", error);
   });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
   return res.json("hello server");
});

server.listen(PORT, () => {
   console.log("server started running on port", PORT);
});
