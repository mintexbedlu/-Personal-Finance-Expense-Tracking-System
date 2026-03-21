import React, { useState, useRef, useEffect } from "react";
import { navbarStyles } from "../assets/dummyStyles";
import img1 from "../assets/logo.png";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:4000" : "")}/api`;

const Navbar = ({ user: propUser, onLogout }) => {
  const navigate = useNavigate();
  const menRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);

  // FIX 1: Create a state variable for the user so we can update it
  // Initialize with propUser if available, otherwise defaults
  const [user, setUser] = useState(
    propUser || {
      name: "",
      email: "",
    },
  );

  // FIX 2: Single useEffect to handle fetching data
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      // If no token exists, don't try to fetch
      if (!token) return;

      try {
        const response = await axios.get(`${BASE_URL}/user/me`, {
          headers: {
            // Ensure you aren't doubling up "Bearer"
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data.user || response.data;
        setUser(userData);
      } catch (error) {
        console.error("Failed to load profile", error);

        // Optional: If 401, force logout
        if (error.response && error.response.status === 401) {
          console.log("Token invalid or expired");
          // handleLogout(); // Uncomment if you want to auto-logout
        }
      }
    };

    // Logic: Only fetch if we don't already have user data from props
    // (Or change this logic depending on your app's needs)
    if (!propUser) {
      fetchUserData();
    } else {
      // If we got propUser, just update the state to match
      setUser(propUser);
    }
  }, [propUser]); // Runs when propUser changes

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    setMenuOpen(false);
    localStorage.removeItem("token");
    onLogout?.();
    navigate("/login");
  };

  // close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menRef.current && !menRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={navbarStyles.header}>
      <div className={navbarStyles.container}>
        {/* logo */}
        <div
          onClick={() => navigate("/")}
          className={navbarStyles.logoContainer}
        >
          <div className={navbarStyles.logoImage}>
            <img src={img1} alt="logo" />
          </div>

          <span
            className={`${navbarStyles.logoText} font-extrabold tracking-tight text-slate-800`}
          >
            Personal Finance <span className="text-teal-600">&</span> Expense
            Tracking System
          </span>
        </div>

        {/*if the user is present*/}
        {user && (
          <div className={navbarStyles.userContainer} ref={menRef}>
            <button onClick={toggleMenu} className={navbarStyles.userButton}>
              <div className="relative">
                <div className={navbarStyles.userAvatar}>
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>

                <div className={navbarStyles.statusIndicator}></div>
              </div>
              <div className={navbarStyles.userTextContainer}>
                <p className={navbarStyles.userName}>{user?.name || "User"}</p>

                <p className={navbarStyles.userEmail}>
                  {user?.email || "user@expensetracker.com"}
                </p>
              </div>
              <ChevronDown className={navbarStyles.chevronIcon(menuOpen)} />
            </button>

            {/* dropdown menu */}

            {menuOpen && (
              <div className={navbarStyles.dropdownMenu}>
                <div className={navbarStyles.dropdownHeader}>
                  <div className="flex items-center gap-3">
                    <div className={navbarStyles.dropdownAvatar}>
                      {user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div>
                      <div className={navbarStyles.dropdownName}>
                        {user?.name || "User"}
                      </div>
                      <div className={navbarStyles.dropdownEmail}>
                        {user?.email || "user@expensetracker.com"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={navbarStyles.menuItemContainer}>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/profile");
                    }}
                    className={navbarStyles.menuItem}
                  >
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </button>
                </div>
                <div className={navbarStyles.menuItemBorder}>
                  <button
                    onClick={handleLogout}
                    className={navbarStyles.logoutButton}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
