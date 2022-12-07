import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Switch from "../components/reusableSwitch";
import ThemeSwitch from "../components/ThemeSwitch";

export const Navbar = ({ theme, setTheme }) => {
  const location = useLocation();
  let dynamycClassName;
  if (location.pathname === "/") {
    dynamycClassName = "home";
  } else {
    dynamycClassName = "favorites";
  }

  const [value, setValue] = useState(false);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <nav>
      <section className="navContent">
        <div>
          <div className={"navLinks"}>
            <Link
              className={
                dynamycClassName === "home"
                  ? `navLinks-${dynamycClassName}`
                  : "navLinks"
              }
              to="/"
            >
              Home
            </Link>
            <Link
              className={
                dynamycClassName === "favorites"
                  ? `navLinks-${dynamycClassName}`
                  : "navLinks"
              }
              to="/favorites"
            >
              Favorites
            </Link>
          </div>
        </div>
        <div className="switches-continer">
          <div className="switch-container">
            <Switch
              onColor="#fff"
              isOn={value}
              handleToggle={() => setValue(!value)}
            />
          </div>

          <ThemeSwitch theme={theme} switchTheme={switchTheme} />
        </div>
      </section>
    </nav>
  );
};
