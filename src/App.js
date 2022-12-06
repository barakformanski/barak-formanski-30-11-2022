import React, { useEffect } from "react";
import { Navbar } from "./app/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./features/homeWeather/Home";
import { FavoritesList } from "./features/favorites/favoritesList";
import useLocalStorage from "use-local-storage";
import { toggleUnit } from "./features/settings/settingsSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const dispatch = useDispatch();
  const isCelsius = useSelector((state) => state.settings.celsius);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  const switchUnit = () => {
    dispatch(toggleUnit());
  };
  return (
    <div className="app" data-theme={theme}>
      <button onClick={switchTheme}>
        Switch To {theme === "light" ? "Dark" : "Light"} Theme
      </button>
      <button onClick={switchUnit}>
        Switch To {isCelsius ? "Fahrenheit" : "Celsius"}
      </button>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites/" element={<FavoritesList />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
