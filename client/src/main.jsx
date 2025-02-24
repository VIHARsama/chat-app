import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext.jsx";
import { ThemeContextProvider } from "./context/themeContext.jsx";
import { ChatContextProvider } from "./context/chatContext.jsx";

createRoot(document.getElementById("root")).render(
   <ThemeContextProvider>
      <AuthContextProvider>
         <ChatContextProvider>
            <BrowserRouter>
               <App />
            </BrowserRouter>
         </ChatContextProvider>
      </AuthContextProvider>
   </ThemeContextProvider>,
);
