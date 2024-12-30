'use client';

import { useContext, useEffect, useState } from "react";
import { currentUser } from "@/lib/client/providers/currentUser";
import Login from "./Login";
import Register from "./Register";

export default function UserChecker({ children }) {

  const [showRegistration, setShowRegistration] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const context = useContext(currentUser);
  if (!context) {
    console.error("currentUser context is not available");
    return null;
  }
  const { user } = context;

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await fetch('/api/user');
        if (!res.ok) {
          console.error("Error in fetchAllUsers", res);
          return;
        }
        const users = await res.json();
        setAllUsers(users);
      } catch (e) {
        console.error("Error in fetchAllUsers", e);
      }
    }
    fetchAllUsers();
  }, []);

  const loginContent = <>

    {showRegistration ?
      <Register complete={() => setShowRegistration(false)} /> :
      <>
        <h1>Please log in</h1>
        <Login setUser={context.setUser} />
        <p>Don't have an account?&nbsp;<button onClick={() => setShowRegistration(true)}>sign up</button></p>
        <p>here's a list of existing usernames (this is temporary ofc)</p>
        <ul>
          {allUsers.map((u, i) => <li key={i}>{u}</li>)}
        </ul>
      </>}
  </>


  return (<div>
    {user ?
      children :
      loginContent
    }
  </div>);
}