import React, { useState } from "react";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import { Link } from "react-router-dom";
import { Loader2, Mail, MessageSquare, User, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext.jsx";
import { axiosInstance } from "../lib/axiosInstance.js";

const Register = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const { authUser, setAuthUser, isSigningUp, setIsSigningUp, connectSocket } = useAuthContext();

   const [registerData, setRegisterData] = useState({
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
   });

   const validateForm = () => {
      if (!registerData.fullName.trim()) {
         return toast.error("Full name is required");
      }
      if (!registerData.email.trim()) {
         return toast.error("Email is required");
      }
      if (!/\S+@\S+\.\S+/.test(registerData.email)) {
         return toast.error("Invalid email format");
      }
      if (!registerData.password) {
         return toast.error("Password is required");
      }
      if (registerData.password.length < 6) {
         return toast.error("Password must be at least 6 characters");
      }

      return true;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const success = validateForm();
      if (success === true) {
         registerUser();
      }
   };

   const registerUser = async () => {
      setIsSigningUp(true);
      try {
         const res = await axiosInstance.post("/auth/register", {
            email: registerData.email,
            fullName: registerData.fullName,
            password: registerData.password,
            confirmPassword: registerData.confirmPassword,
         });
         setAuthUser(res.data);
         connectSocket(res.data._id);

         toast.success("Account created successfully");
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         setIsSigningUp(false);
      }
   };

   return (
      <div className="min-h-screen grid lg:grid-cols-2">
         {/* left side */}
         <div className="flex items-center justify-center bg-base-200 p-8">
            <div className="space-y-6 text-center">
               <h2 className="text-4xl font-bold mb-4">Join our community!</h2>
               <p className="text-xl text-base-content/60">
                  Connect with friends, share moments, and stay in touch with your loved ones.
               </p>
            </div>
         </div>

         {/* right side */}
         <div className="flex flex-col justify-center items-center p-g sm:p-12">
            <div className="w-full max-w-md space-y-8">
               {/* LOGO */}
               <div className="text-center mb-8">
                  <div className="flex flex-col items-center gap-2 group">
                     <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <MessageSquare className="size-6 text-primary" />
                     </div>
                     <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                     <p className="text-base-content/60">Get started with your free account</p>
                  </div>
               </div>

               {/* full name */}
               <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text font-medium">Full Name</span>
                     </label>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                           <User className="size-5 text-base-content/40" />
                        </div>
                        <input
                           type="text"
                           className="input input-bordered w-full pl-10"
                           placeholder="John Doe"
                           value={registerData.fullName}
                           onChange={(e) =>
                              setRegisterData({ ...registerData, fullName: e.target.value })
                           }
                        />
                     </div>
                  </div>

                  {/* email */}
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text font-medium">Email</span>
                     </label>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                           <Mail className="size-5 text-base-content/40" />
                        </div>
                        <input
                           type="email"
                           className="input input-bordered w-full pl-10"
                           placeholder="you@example.com"
                           value={registerData.email}
                           onChange={(e) =>
                              setRegisterData({ ...registerData, email: e.target.value })
                           }
                        />
                     </div>
                  </div>

                  {/* password */}
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text font-medium">Password</span>
                     </label>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                           <Lock className="size-5 text-base-content/40" />
                        </div>
                        <input
                           type={showPassword ? "text" : "password"}
                           className="input input-bordered w-full pl-10"
                           placeholder="**********"
                           value={registerData.password}
                           onChange={(e) =>
                              setRegisterData({ ...registerData, password: e.target.value })
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

                  {/* confirm password */}
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text font-medium">Confirm Password</span>
                     </label>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                           <Lock className="size-5 text-base-content/40" />
                        </div>
                        <input
                           type={showConfirmPassword ? "text" : "password"}
                           className="input input-bordered w-full pl-10"
                           placeholder="**********"
                           value={registerData.confirmPassword}
                           onChange={(e) =>
                              setRegisterData({ ...registerData, confirmPassword: e.target.value })
                           }
                        />
                        <button
                           type="button"
                           className="absolute inset-y-0 right-0 pr-3 flex items-center"
                           onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                           {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5 text-base-content/40" />
                           ) : (
                              <Eye className="h-5 w-5 text-base-content/40" />
                           )}
                        </button>
                     </div>
                  </div>

                  <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
                     {isSigningUp ? (
                        <>
                           <Loader2 className="size-5 animate-spin" />
                           Loading...
                        </>
                     ) : (
                        "Create Account"
                     )}
                  </button>
               </form>

               <div className="text-center">
                  <p className="text-base-content/60">
                     Already have an account?{" "}
                     <Link to="/login" className="link link-primary">
                        Login
                     </Link>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Register;
