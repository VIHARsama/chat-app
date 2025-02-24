import React, { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Settings from "./pages/Settings.jsx";
import Profile from "./pages/Profile.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import { Loader } from "lucide-react";
import { useAuthContext } from "./context/authContext.jsx";
import { useThemeContext } from "./context/themeContext.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
   const { authUser, isCheckingAuth, checkAuth } = useAuthContext();
   const { theme, setTheme, setChatTheme } = useThemeContext();

   useEffect(() => {
      checkAuth();
   }, []);

   console.log(authUser);

   if (isCheckingAuth && !authUser) {
      return (
         <div className="flex items-center justify-center h-screen">
            <Loader className="size-10 animate-spin" />
         </div>
      );
   }

   return (
      <div data-theme={theme}>
         <Navbar />

         <Routes>
            <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
            <Route path="/register" element={!authUser ? <Register /> : <Navigate to="/" />} />
            <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
         </Routes>

         <Toaster />
      </div>
   );
};

export default App;
