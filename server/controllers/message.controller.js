import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../utils/cloudinary.js";
import { getReceiverSocketId, io } from "../utils/socket.js";

export const getUsersForSideBar = async (req, res) => {
   try {
      const loggedInUserId = req.user._id;
      const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

      res.status(200).json(filteredUsers.length ? filteredUsers : []);
   } catch (error) {
      console.log("error in getUsersForSidebar controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
   }
};

export const getMessages = async (req, res) => {
   try {
      const { id: userToChatId } = req.params;
      const userId = req.user._id;

      const messages = await Message.find({
         $or: [
            { senderId: userId, receiverId: userToChatId },
            { senderId: userToChatId, receiverId: userId },
         ],
      });

      res.status(200).json(messages);
   } catch (err) {
      console.log("error in getMessages controller", err.message);
      res.status(500).json({ error: "Internal Server Error" });
   }
};

export const sendMessage = async (req, res) => {
   try {
      const { text, image } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;

      let imageUrl;
      if (image) {
         const uploadResponse = await cloudinary.uploader.upload(image);
         imageUrl = uploadResponse.secure_url;
      }

      const newMessage = new Message({
         senderId,
         receiverId,
         text,
         image: imageUrl,
      });

      await newMessage.save();

      res.status(201).json(newMessage);

      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
         io.to(receiverSocketId).emit("newMessage", newMessage);
      }
   } catch (error) {
      console.log("error in sendMessage controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
   }
};
