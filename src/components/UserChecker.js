'use client';

import { useContext } from "react";
import { currentUser } from "@/lib/providers/currentUser";

export default function UserChecker({ children }) {
  const { user, setUser } = useContext(currentUser) ?? { user: null, setUser: null };

  const loginContent = <>
    <h1>Please log in</h1>
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const username = formData.get('username');
      setUser({ username });
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