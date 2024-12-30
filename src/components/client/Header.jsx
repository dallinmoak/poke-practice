"use client";

import { currentUser } from "@/lib/client/providers/currentUser";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Header() {
  const { user, setUser } = useContext(currentUser);
  const router = useRouter();
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '550px' }}>
      <div>
        <h1>Hello, {user.name}!</h1>
        <p>current user: {user.username}</p>
      </div>
      <button onClick={() => {
        setUser(null);
        localStorage.removeItem('user');
        router.push('/');
      }}>logout</button>
    </header>
  );
}