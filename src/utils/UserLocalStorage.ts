import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

// Define User interface to reflect fields from the registration form
interface User {
  userName: string;
  phoneNumber: string;
  email: string;
  passWord: string; // This will store the hashed password
}

export interface Ticket {
  id: number;
  userEmail: string;
  movieTitle: string;
  cinema: string;
  showtime: string;
  date: string; // Ensure 'date' is included in the Ticket interface
  seats: string[];
  price: number;
  barcode: string;
  image: string;
}

// Constants for storage keys
const USERS_KEY = 'users';
const LOGGED_IN_USER_KEY = 'loggedInUser';
const REMEMBER_ME_USER_KEY = 'rememberMeUser';

// Access the secret key from environment variables
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error('REACT_APP_SECRET_KEY environment variable is not set.');
}

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
  if (!emailOrPhone || !passWord) {
    return null;
  }

  const users = getUsersFromLocalStorage();
  const user = users.find(
    (user) => user.email === emailOrPhone || user.phoneNumber === emailOrPhone
  );

  if (user && user.passWord && bcrypt.compareSync(passWord, user.passWord)) {
    return user;
  }

  return null;
};

// Set logged-in user in session storage
export const setLoggedInUserInSessionStorage = (user: User) => {
  sessionStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
};

// Set logged-in user in cookies (encrypted) for "Remember Me"
export const setLoggedInUserInCookies = (user: User) => {
  // Encrypt the user data before storing it in cookies
  const encryptedUserData = CryptoJS.AES.encrypt(JSON.stringify(user), SECRET_KEY).toString();

  // Save encrypted data in cookies with a 7-day expiration
  Cookies.set(REMEMBER_ME_USER_KEY, encryptedUserData, { expires: 7 });
};

// Get logged-in user from session storage
export const getLoggedInUserFromSessionStorage = (): User | null => {
  const user = sessionStorage.getItem(LOGGED_IN_USER_KEY);
  return user ? JSON.parse(user) : null;
};

// Get logged-in user from cookies (decrypting the data)
export const getLoggedInUserFromCookies = (): User | null => {
  const encryptedUserData = Cookies.get(REMEMBER_ME_USER_KEY);

  if (encryptedUserData) {
    try {
      // Decrypt the user data from cookies
      const bytes = CryptoJS.AES.decrypt(encryptedUserData, SECRET_KEY);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

      // Parse and return the decrypted user data
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error('Failed to decrypt user data from cookies', error);
      return null;
    }
  }

  return null;
};

// Clear logged-in user from session storage
export const clearLoggedInUserFromSessionStorage = () => {
  sessionStorage.removeItem(LOGGED_IN_USER_KEY);
};

// Clear logged-in user from cookies
export const clearLoggedInUserFromCookies = () => {
  Cookies.remove(REMEMBER_ME_USER_KEY);
};

// Centralized logout function
export const logoutUser = () => {
  clearLoggedInUserFromSessionStorage();
  clearLoggedInUserFromCookies();
};

// Fetch user tickets
export const fetchUserTickets = async (user: User): Promise<Ticket[]> => {
  const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
  return tickets.filter(ticket => ticket.userEmail === user.email);
};
