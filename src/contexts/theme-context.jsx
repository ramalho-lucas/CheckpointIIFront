import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext({});


const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");
    console.log(theme);

    useEffect(() => {
        
    }, []);

    const handleChangeTheme = () => {
        theme === "light" ? setTheme("dark") : setTheme("light");
        
    }
  
    return (
      <ThemeContext.Provider
        value={{ theme, handleChangeTheme }}
      >
        {children}
      </ThemeContext.Provider>
    );
  };
  
  export default ThemeProvider;