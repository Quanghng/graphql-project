import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b shadow-sm py-3 px-6 mb-6 transition-colors">
      <div className="max-w-5xl mx-auto flex gap-6 items-center justify-between">

        <div className="flex gap-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-400 font-semibold"
                : "text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-400 font-semibold"
                : "text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-400 font-semibold"
                : "text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
            }
          >
            Register
          </NavLink>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <span>Dark Mode</span>
          <Switch
            checked={darkMode}
            onCheckedChange={setDarkMode}
            className={`
                relative inline-flex h-6 w-11 cursor-pointer rounded-full border border-gray-300 dark:border-gray-600 
                bg-gray-200 dark:bg-gray-700 
                data-[state=checked]:bg-blue-600 transition-colors
                after:content-[''] after:absolute after:h-4 after:w-4 after:rounded-full 
                after:bg-white after:top-1 after:left-1 
                data-[state=checked]:after:translate-x-5 
                after:transition-transform after:duration-300
            `}
            />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
