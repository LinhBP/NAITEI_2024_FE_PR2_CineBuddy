import { NavigateFunction } from "react-router-dom";
import {
  getLoggedInUserFromLocalStorage,
  clearLoggedInUserFromLocalStorage,
} from "./UserLocalStorage.ts";

// Redirects user based on login state
export const handleNavigate = (navigate: NavigateFunction, route: string) => {
  const user = getLoggedInUserFromLocalStorage();
  if (!user) {
    navigate("/login"); // Redirect to login if not logged in
  } else {
    navigate(route); // Navigate to the desired route
  }
};

// Handles logout functionality
export const handleLogout = (navigate: NavigateFunction, setUser: (user: null) => void) => {
  clearLoggedInUserFromLocalStorage(); // Clear user from local storage
  setUser(null); // Update state to reflect logged-out user
  navigate("/login"); // Redirect to login page
};

// Redirects to account info page
export const handleAccountInfoClick = (navigate: NavigateFunction) => {
  navigate("/account-info");
};
