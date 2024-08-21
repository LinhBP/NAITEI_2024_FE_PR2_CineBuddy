import bcrypt from 'bcryptjs';

// Define User interface to reflect fields from the registration form
interface User {
  userName: string;
  phoneNumber: string;
  email: string;
  passWord: string; // This will store the hashed password
}

const USERS_KEY = 'users';
const LOGGED_IN_USER_KEY = 'loggedInUser';

// Save user to local storage
export const saveUserToLocalStorage = (user: User) => {
  const existingUsers = getUsersFromLocalStorage();
  existingUsers.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(existingUsers));
};

// Get users from local storage
export const getUsersFromLocalStorage = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Verify user credentials
export const verifyUserCredentials = (
  emailOrPhone: string,
  passWord: string
): User | null => {
  // Ensure both emailOrPhone and passWord are provided
  if (!emailOrPhone || !passWord) {
    return null;
  }

  const users = getUsersFromLocalStorage();
  const user = users.find(
    (user) => user.email === emailOrPhone || user.phoneNumber === emailOrPhone
  );

  // Check if user is found and the password is correct
  if (user && user.passWord && bcrypt.compareSync(passWord, user.passWord)) {
    return user;
  }

  return null; // Return null if no user is found or password is incorrect
};

// Set logged-in user in local storage
export const setLoggedInUserInLocalStorage = (user: User) => {
  localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
};

// Get logged-in user from local storage
export const getLoggedInUserFromLocalStorage = (): User | null => {
  const user = localStorage.getItem(LOGGED_IN_USER_KEY);
  return user ? JSON.parse(user) : null;
};

// Clear logged-in user from local storage
export const clearLoggedInUserFromLocalStorage = () => {
  localStorage.removeItem(LOGGED_IN_USER_KEY);
};
