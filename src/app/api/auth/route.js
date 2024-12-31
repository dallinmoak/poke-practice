import { getAuthToken, getUser, unauthed } from "@/lib/server/auth";

export async function GET(request) {
  const token = getAuthToken(request);
  const user = await getUser(token);
  if (!user) {
    return unauthed;
  } else {
    return new Response(JSON.stringify(user), { status: 200 });
  }
}