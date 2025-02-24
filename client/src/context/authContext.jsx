import React, { createContext, useState, useContext, useEffect } from "react";
import { axiosInstance } from "../lib/axiosInstance.js";
import { io } from "socket.io-client";

export const AuthContext = createContext();

export const useAuthContext = () => {
   return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
   const [authUser, setAuthUser] = useState(null);
   const [isCheckingAuth, setIsCheckingAuth] = useState(true);
   const [isSigningUp, setIsSigningUp] = useState(false);
   const [isLoggingIn, setIsLoggingIn] = useState(false);
   const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
   const [onlineUsers, setOnlineUsers] = useState([]);
   const [socket, setSocket] = useState(null);

   const BASE_URL = "http://localhost:3000";

   const checkAuth = async () => {
      try {
         const res = await axiosInstance.get("/auth/check-auth");
         setAuthUser(res.data);
         connectSocket(res.data._id);
      } catch (err) {
         console.log("error in checkAuth", err);
         setAuthUser(null);
      } finally {
         setIsCheckingAuth(false);
      }
   };

   const connectSocket = (userId) => {
      if (!userId || socket?.connected) return;

      const newSocket = io(BASE_URL, {
         query: { userId },
      });

      newSocket.on("getOnlineUsers", (userIds) => {
         setOnlineUsers(userIds);
      });

      newSocket.connect();
      setSocket(newSocket);
   };

   const disconnectSocket = () => {
      if (socket?.connected) {
         socket.disconnect();
         setSocket(null);
      }
   };

   return (
      <AuthContext.Provider
         value={{
            authUser,
            setAuthUser,
            isCheckingAuth,
            setIsCheckingAuth,
            isSigningUp,
            setIsSigningUp,
            isLoggingIn,
            setIsLoggingIn,
            isUpdatingProfile,
            setIsUpdatingProfile,
            onlineUsers,
            setOnlineUsers,
            checkAuth,
            connectSocket,
            disconnectSocket,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
