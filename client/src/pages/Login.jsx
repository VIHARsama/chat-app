import React, { useState } from "react";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import { Link } from "react-router-dom";
import { Loader2, Mail, MessageSquare, Lock, Eye } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext.jsx";
import { axiosInstance } from "../lib/axiosInstance.js";

const Login = () => {
   const [showPassword, setShowPassword] = useState(false);

   const { authUser, setAuthUser, isLoggingIn, setIsLoggingIn, connectSocket } = useAuthContext();

   const [loginData, setLoginData] = useState({
      email: "",
      password: "",
   });

   const validateForm = () => {};

   const handleSubmit = async (e) => {
      e.preventDefault();
      loginUser();
   };

   const loginUser = async () => {
      setIsLoggingIn(true);
      try {
         const res = await axiosInstance.post("/auth/login", {
            email: loginData.email,
            password: loginData.password,
         });
         setAuthUser(res.data);
         connectSocket(res.data._id);

         toast.success("Logged in successfully");
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         setIsLoggingIn(false);
      }
   };

   return (
      <div className="h-screen grid lg:grid-cols-2">
         {/* left side */}
         <div class="flex items-center justify-center bg-base-200 p-8">
            <div class="space-y-6 text-center">
               <h2 class="text-4xl font-bold mb-4">Welcome back!</h2>
               <p class="text-xl text-base-content/60">
                  Sign in to continue your conversations and catch up with your messages.
               </p>
            </div>
         </div>
         {/* right side */}
         <div className="flex flex-col justify-center items-center p-6 sm:p-12">
            <div className="w-full max-w-md space-y-8">
               {/* logo */}
               <div className="text-center mb-8">
                  <div className="flex flex-col items-center gap-2 group">
                     <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                        <MessageSquare className="w-6 h-6 text-primary" />
                     </div>
                     <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
                     <p className="text-base-content/60">Sign in to your community</p>
                  </div>
               </div>

               {/* form */}
               <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text font-medium">Email</span>
                     </label>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                           <Mail className="h-5 w-5 text-base-content/40" />
                        </div>
                        <input
                           type="email"
                           className="input input-bordered w-full pl-10"
                           placeholder="you@example.com"
                           value={loginData.email}
                           onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        />
                     </div>
                  </div>

                  <div className="form-control">
                     <label className="label">
                        <span className="label-text font-medium">Password</span>
                     </label>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                           <Lock className="h-5 w-5 text-base-content/40" />
                        </div>
                        <input
                           type={showPassword ? "text" : "password"}
                           className="input input-bordered w-full pl-10"
                           placeholder="**********"
                           value={loginData.password}
                           onChange={(e) =>
                              setLoginData({ ...loginData, password: e.target.value })
                           }
                        />
                        <button
                           type="button"
                           className="absolute inset-y-0 right-0 pr-3 flex items-center"
                           onClick={() => setShowPassword(!showPassword)}
                        >
                           {showPassword ? (
                              <EyeOff className="h-5 w-5 text-base-content/40" />
                           ) : (
                              <Eye className="h-5 w-5 text-base-content/40" />
                           )}
                        </button>
                     </div>
                  </div>

                  <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
                     {isLoggingIn ? (
                        <>
                           <Loader2 className="h-5 w-5 animate-spin" />
                           Loading...
                        </>
                     ) : (
                        "Sign in"
                     )}
                  </button>
               </form>
               <div className="text-center">
                  <p className="text-base-content/60">
                     Don't have an account?{" "}
                     <Link to="/register" className="link link-primary">
                        Create account
                     </Link>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;
