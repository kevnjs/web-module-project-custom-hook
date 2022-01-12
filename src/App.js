import React, { useState, useEffect } from "react";
import Charts from "./components/Charts";
import Navbar from "./components/Navbar";
import "./style.css";
import useTracker from "./hooks/useTracker";

//- Build custom hooks that extend stateful logic +
// - Build custom hooks that work with persistent data 
// - Compose hooks together

const useLocalStorage = (key, initValue) => {
  const [value, setValue ] = useState(() => {
    
    if(localStorage.getItem(key)) {
      return(JSON.parse(localStorage.getItem(key)))
    } else {
      localStorage.setItem(key, JSON.stringify(initValue))
      return (initValue);
    }
  })

  const setLocalStorage = (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
    setValue(newValue);
  }

  return [value, setLocalStorage];
}

const App = () => {
  const [darkMode, setDarkMode] = useLocalStorage("mode", false);
  const [ coinData ] = useTracker();

  return (
    <div className={darkMode ? "dark-mode App" : "App"}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Charts coinData={coinData} />
    </div>
  );
};

export default App;