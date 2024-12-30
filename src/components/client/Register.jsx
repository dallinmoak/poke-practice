'use client';

import { useRouter } from 'next/navigation';
export default function Register({ complete }) {

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const username = formData.get('username');
    const name = formData.get('fullName');
    const newRecord = { username, name };
    try {
      const res = await fetch(`/api/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecord),
      });
      if (!res.ok) {
        console.error("Error in register", res);
        return;
      } else {
        const newUser = await res.json();
        complete();
        router.push('/');
      }
    } catch (e) {
      console.error("Error in register", e);
      return;
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" required name='username' placeholder='username' />
        <input type="text" required name='fullName' placeholder='full name' />
        {/* <input type="password" name='password' /> */}
        <button type="submit">Register</button>
        <button type="button" onClick={() => complete()}>Cancel</button>
      </form>
    </>
  )
};