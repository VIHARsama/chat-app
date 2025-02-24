import React, { useCallback, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";
import { useChatContext } from "../context/chatContext";
import { axiosInstance } from "../lib/axiosInstance";

const ChatContainer = () => {
   const { messages, setMessages, isMessagesLoading, setIsMessagesLoading, selectedUser } =
      useChatContext();

   const { authUser } = useAuthContext();

   const getMessages = useCallback(
      async (userId) => {
         if (!userId) return; // Avoid unnecessary calls if no user is selected
         setIsMessagesLoading(true);
         try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            setMessages(res.data);
         } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch messages");
         } finally {
            setIsMessagesLoading(false);
         }
      },
      [setMessages, setIsMessagesLoading],
   );

   useEffect(() => {
      if (selectedUser?._id) {
         getMessages(selectedUser._id);
      }
   }, [selectedUser?._id, getMessages]);

   const formatMessageAndTime = (date) => {
      return new Date(date).toLocaleTimeString("en-US", {
         hour: "2-digit",
         minute: "2-digit",
         hour12: false,
      });
   };

   if (isMessagesLoading) {
      return (
         <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />
            <MessageSkeleton />
            <MessageInput />
         </div>
      );
   }

   return (
      <div className="flex-1 flex flex-col overflow-auto">
         <ChatHeader />

         <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
               <div
                  key={message._id}
                  className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
               >
                  <div className="chat-image avatar">
                     <div className="size-10 rounded-full border">
                        <img
                           src={
                              message.senderId === authUser._id
                                 ? authUser.profilePic || "/avatar.png"
                                 : selectedUser.profilePic || "/avatar.png"
                           }
                           alt="profile pic"
                        />
                     </div>
                  </div>
                  <div className="chat-header mb-1">
                     <time className="text-xs opacity-50 ml-1">
                        {formatMessageAndTime(message.createdAt)}
                     </time>
                  </div>

                  <div
                     className={`chat-bubble ${message.senderId === authUser._id ? "text-primary-content/70 bg-primary" : "text-base-content bg-base-200"}  flex flex-col`}
                  >
                     {/* <div className="chat-bubble flex flex-col"> */}
                     {message.image && (
                        <img
                           src={message.image}
                           alt="Attachment"
                           className="sm:markermax-w-[200px] rounded-md mb-2"
                        />
                     )}
                     {message.text && <p>{message.text}</p>}
                  </div>
               </div>
            ))}
         </div>

         <MessageInput />
      </div>
   );
};

export default ChatContainer;
