import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("current-mode") === "dark";
  });

  useEffect(() => {
    const HTML = document.querySelector("HTML");
    if (isDark) {
      localStorage.setItem("current-mode", "dark");
      HTML.classList.add("dark");
    } else {
      HTML.classList.remove("dark");
      localStorage.setItem("current-mode", "light");
    }
  }, [isDark]);

  const navigate = useNavigate();
  

  

  return (
    <div className="bg-light_primary dark:bg-dark_primary h-[8vh] md:px-28 px-4 py-4 flex items-center justify-between text-dark_primary dark:text-light_primary border-b border-[#E5E8EB]">
      <p
        onClick={() => navigate(-1)}
        className="text-xl font-semibold cursor-pointer"
        title="navigate to HomePage"
      >
        ZappyAI
      </p>
        
        <button
          onClick={() => setIsDark((prev) => !prev)}
          className="bg-dark_secondary dark:bg-primary text-light_primary font-semibold w-10 h-10 rounded-full hover:bg-primary/80 transition 300ms ease-in-out"
        >
          {isDark ? (
            <i className="fa-solid fa-moon text-lg"></i>
          ) : (
            <i className="fa-solid fa-sun text-lg"></i>
          )}
        </button>
    </div>
  );
}

export default Header;
