'use client';

import { createContext, useEffect, useState } from "react";

const currentUser = createContext(null);

const CurrentUserProvider = ({ children }) => {

  const getUserFromLocalStorage = () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const setLocalStorageUser = (user) => {
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error(error);
    }
  };

  const [user, setUser] = useState(getUserFromLocalStorage);

  useEffect(() => {
    if (user) setLocalStorageUser(user);
    else localStorage.removeItem('user');
  }, [user]);

  const forceStateSync = (e) => {
    if (e.key !== 'user') return;
    else {
      setUser(e.newValue ? JSON.parse(e.newValue) : null);
    }
  }

  useEffect(() => {
    window.addEventListener('storage', forceStateSync);
    return () => window.removeEventListener('storage', forceStateSync);
  }, [])

  return (
    <currentUser.Provider value={{ user, setUser }}>
      {children}
    </currentUser.Provider>
  );
}

export { currentUser, CurrentUserProvider };