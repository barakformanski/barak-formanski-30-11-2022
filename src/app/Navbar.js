import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  let dynamycClassName;
  if (location.pathname === "/") {
    dynamycClassName = "home";
  } else {
    dynamycClassName = "favorites";
  }
  return (
    <nav>
      <section>
        <h1>wether app</h1>

        <div className="navContent">
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
      </section>
    </nav>
  );
};
