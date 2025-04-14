import React, { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

// Create the Context
const AuthContext = createContext();

// Create a Provider Component
export const AuthProvider = ({ children }) => {
  // State to hold the authenticated user; null means not logged in.
  const [user, setUser] = useState(null);

  // Simulate a login function. In a real app, you'll call your backend API here.
  const login = (username, password) => {
    // For demo purposes, we assume authentication succeeds and set dummy user data.
    // Replace the following with an actual API call.
    const dummyUser = { username, role: "user", token: "abc123" };
    setUser(dummyUser);
    return dummyUser;
  };

  // Logout function resets the user state to null.
  const logout = () => {
    setUser(null);
  };

  // The context value that will be supplied to any descendants of this provider.
  const authContextValue = { user, login, logout };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook for easy access to the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
