import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import { MdOutlineMenu } from 'react-icons/md';
import { MdMenuOpen } from 'react-icons/md';
import { GiNightSky } from 'react-icons/gi';
import { FaRegSun } from 'react-icons/fa';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const systemDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setDarkMode(systemDark);
      document.documentElement.classList.toggle('dark', systemDark);
      localStorage.setItem('theme', systemDark ? 'dark' : 'light');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  const toggleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <SideBar showMenu={showMenu} onClose={toggleShowMenu} />

      <nav className="sticky top-0 z-20 bg-white dark:bg-black dark:text-white transition-all duration-500 shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {showMenu ? (
            <button
              className="text-2xl cursor-pointer focus:outline-none"
              onClick={toggleShowMenu}
              aria-label="Close menu">
              <MdMenuOpen className="text-xl" />
            </button>
          ) : (
            <button
              className="text-2xl cursor-pointer focus:outline-none"
              onClick={toggleShowMenu}
              aria-label="Open menu">
              <MdOutlineMenu className="text-xl" />
            </button>
          )}

          <h1 className="text-2xl font-bold text-maroon-800 dark:text-white">
            PERPS BOT
          </h1>

          <button
            className="text-xl cursor-pointer focus:outline-none"
            onClick={toggleDarkMode}
            aria-label={
              darkMode ? 'Switch to light mode' : 'Switch to dark mode'
            }>
            {darkMode ? (
              <FaRegSun className="text-xl" />
            ) : (
              <GiNightSky className="text-xl" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
