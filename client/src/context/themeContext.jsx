import React, { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const useThemeContext = () => {
   return useContext(ThemeContext);
};

export const ThemeContextProvider = ({ children }) => {
   const [theme, setTheme] = useState("halloween");

   useEffect(() => {
      const storedTheme = localStorage.getItem("chat-theme");
      if (storedTheme) {
         setTheme(storedTheme);
      }
   }, []);

   const setChatTheme = (newTheme) => {
      localStorage.setItem("chat-theme", newTheme);
      setTheme(newTheme);
   };

   return <ThemeContext.Provider value={{ theme, setChatTheme }}>{children}</ThemeContext.Provider>;
};
