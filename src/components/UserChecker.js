'use client';

import { useContext } from "react";
import { currentUser } from "@/lib/providers/currentUser";

export default function UserChecker({ children }) {
  const context = useContext(currentUser);
  if (!context) {
    console.error("currentUser context is not available");
    return null;
  }
  const { user, setUser } = context;

  const loginContent = <>
    <h1>Please log in</h1>
    <form onSubmit={async (e) => {
      //TODO: make this a login component
      e.preventDefault();
      const formData = new FormData(e.target);
      const username = formData.get('username');
      try {
        const res = await fetch(`/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username })
        });
        const user = await res.json();
        if (!res.ok) {
          console.error("Error in login", user);
          return;
        }
        console.log("user", user);
        if (setUser) {
          setUser(user);
        } else {
          console.error("setUser is not defined");
        }
      } catch (error) {
        console.error("Error in login", error);
        return;
      }
    }}>
      <input type="text" placeholder="username" name='username' />
      {/* <input type="password" placeholder="password" name='password' /> */}
      <button type='submit'>Log in</button>
    </form>
  </>


  return (<div>
    {user ? children : loginContent}
  </div>);
}