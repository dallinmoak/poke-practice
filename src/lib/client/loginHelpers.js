'use client';

const fetchToken = async (creds) => {
  const res = await fetch(`/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("Error in login", text);
    return;
  } else {
    const token = (await res.json()).token;
    return token;
  }
}

const fetchUser = async (token) => {
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
    return { ...user, token };
  }
}

export {
  fetchToken,
  fetchUser
};