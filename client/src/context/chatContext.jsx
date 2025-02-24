import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";
import { useAuthContext } from "./authContext";

export const ChatContext = createContext();

export const useChatContext = () => {
  return useContext(ChatContext);
};

export const ChatContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);

  const { socket, setSocket } = useAuthContext();

  // TODO: optimize this one later
  const changeSelectedUser = (selectedUser) => {
    setSelectedUser(selectedUser);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        users,
        setUsers,
        selectedUser,
        setSelectedUser,
        isUsersLoading,
        setIsUsersLoading,
        isMessagesLoading,
        setIsMessagesLoading,
        changeSelectedUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
