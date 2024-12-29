'use client';

import { useContext } from "react";
import { currentUser } from "@/lib/client/providers/currentUser";

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
        if (!res.ok) {
          const text = await res.text();
          console.error("Error in login", text);
          return;
        } else {
          const token = (await res.json()).token;
          const userRes = await fetch(`/api/auth`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          if (!userRes.ok) {
            console.error("bad user res", userRes);
            return;
          } else {
            const user = await userRes.json();
            if (setUser) {
              setUser(user);
            } else {
              console.error("setUser is not defined");
            }
          }
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