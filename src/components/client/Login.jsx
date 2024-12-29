'use client';

import { fetchToken, fetchUser } from "@/lib/client/loginHelpers";

export default function Login({ setUser }) {

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    try {
      const token = await fetchToken({ username });
      const fetchedUser = await fetchUser(token);
      setUser(fetchedUser);
    } catch (e) {
      console.error("Error in login", e);
      return;
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input type="text" placeholder="username" name='username' />
      {/* <input type="password" placeholder="password" name='password' /> */}
      <button type='submit'>Log in</button>
    </form>
  )
}