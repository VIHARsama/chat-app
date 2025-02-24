import React from "react";
import { X } from "lucide-react";
import { useAuthContext } from "../context/authContext";
import { useChatContext } from "../context/chatContext";

const ChatHeader = () => {
   const { selectedUser, setSelectedUser } = useChatContext();
   const { onlineUsers } = useAuthContext();

   return (
      <div className="p-2.5 border-b border-base-300">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               {/* avatar */}
               <div className="avatar">
                  <div className="size-10 rounded-full relative">
                     <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
                  </div>
               </div>

               {/* user info */}
               <div>
                  <h3 className="font-medium">{selectedUser.fullName}</h3>
                  <p className="text-sm text-base-content/70">
                     {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                  </p>
               </div>
            </div>

            {/* close button */}
            <button onClick={() => setSelectedUser(null)}>
               <X />
            </button>
         </div>
      </div>
   );
};

export default ChatHeader;
