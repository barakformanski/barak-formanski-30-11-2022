import React, { useEffect } from "react";
import { Navbar } from "./app/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./features/homeWeather/Home";
import { FavoritesList } from "./features/favorites/favoritesList";
import useLocalStorage from "use-local-storage";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  return (
    <div className="app" data-theme={theme}>
      <Navbar theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites/" element={<FavoritesList />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
