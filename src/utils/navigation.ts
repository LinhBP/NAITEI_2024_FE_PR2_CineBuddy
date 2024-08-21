// src/utils/navigation.ts

import { NavigateFunction } from "react-router-dom";
import {
  getLoggedInUserFromSessionStorage,
  getLoggedInUserFromCookies,
  clearLoggedInUserFromSessionStorage,
  clearLoggedInUserFromCookies,
} from "./UserLocalStorage.ts";

// Redirects user based on login state
export const handleNavigate = (navigate: NavigateFunction, route: string) => {
  const user = getLoggedInUserFromSessionStorage() || getLoggedInUserFromCookies();
  if (!user) {
    navigate("/login"); // Redirect to login if not logged in
  } else {
    navigate(route); // Navigate to the desired route
  }
};

// Handles logout functionality
export const handleLogout = (navigate: NavigateFunction, setUser: (user: null) => void) => {
  clearLoggedInUserFromSessionStorage(); // Clear user from sessionStorage
  clearLoggedInUserFromCookies(); // Clear user from cookies
  setUser(null); // Update state to reflect logged-out user
  navigate("/login"); // Redirect to login page
};

// Redirects to account info page
export const handleAccountInfoClick = (navigate: NavigateFunction) => {
  navigate("/account-info");
};
