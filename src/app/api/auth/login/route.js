import { getByUsername } from "@/models/user";

export async function POST(request) {
  console.log(
    "POST /api/auth/login",
    request.body
  );
  const creds = await request.json();
  const user = await getByUsername(creds.username);
  if (!user) {
    return new Response(`User ${creds.username} not found`, { status: 404 });
  } else {
    return new Response(JSON.stringify(user), { status: 200 });
  }
  //TODO: later, this will need to return a token instead.
}

// broad plan: https://dev.to/aneeqakhan/building-secure-user-authentication-in-nodejs-4cjj