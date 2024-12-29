'use client';

import { createContext, useEffect, useState } from "react";
import { fetchUser } from "../loginHelpers";

const currentUser = createContext(null);

const CurrentUserProvider = ({ children }) => {

  const setUserFromLocalToken = async () => {
    try {
      const userTokenRaw = localStorage.getItem('user');
      if (!userTokenRaw) {
        setUser(null);
      }
      else {
        const userToken = JSON.parse(userTokenRaw);
        const user = await fetchUser(userToken);
        setUser(user);
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const setLocalStorageUser = (user) => {
    try {
      localStorage.setItem('user', JSON.stringify(user.token));
    } catch (error) {
      console.error(error);
    }
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const initializeUser = async () => {
      await setUserFromLocalToken();
    };
    initializeUser();
  }, []);

  useEffect(() => {
    if (user) setLocalStorageUser(user);
    else if (localStorage.getItem('user')) {
      setUserFromLocalToken();
    }
    else localStorage.removeItem('user');
  }, [user]);

  const forceUserSync = async (e) => {
    if (e.key === 'user') {
      if (e.newValue) {
        const user = await fetchUser(e.newValue);
        setUser(user);
      } else if (e.newValue === null) {
        setUser(null);
      }
    }
  }

  useEffect(() => {
    window.addEventListener('storage', forceUserSync);
    return () => window.removeEventListener('storage', forceUserSync);
  }, []);

  return (
    <currentUser.Provider value={{ user, setUser }}>
      {children}
    </currentUser.Provider>
  );
}

export { currentUser, CurrentUserProvider };