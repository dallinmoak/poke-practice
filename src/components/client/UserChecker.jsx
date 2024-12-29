'use client';

import { useContext } from "react";
import { currentUser } from "@/lib/client/providers/currentUser";
import Login from "./Login";

export default function UserChecker({ children }) {

  const context = useContext(currentUser);
  if (!context) {
    console.error("currentUser context is not available");
    return null;
  }
  const { user } = context;

  const loginContent = <>
    <h1>Please log in</h1>
    <Login setUser={context.setUser} />
  </>


  return (<div>
    {user ? children : loginContent}
  </div>);
}