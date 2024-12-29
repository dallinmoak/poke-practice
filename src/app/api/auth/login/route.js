import { generateToken } from "@/lib/auth";
import { getByUsername } from "@/models/user";

export async function POST(request) {
  const creds = await request.json();
  const user = await getByUsername(creds.username);
  if (!user) {
    return new Response(`User ${creds.username} not found`, { status: 404 });
  } else {
    try {
      const token = generateToken(user._id);
      return new Response(JSON.stringify({ token }), { status: 200 });
    } catch (e) {
      return new Response(e.message, { status: 500 });
    }
  }
}

// broad plan: https://dev.to/aneeqakhan/building-secure-user-authentication-in-nodejs-4cjj