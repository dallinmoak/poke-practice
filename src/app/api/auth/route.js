import { getUser } from "@/lib/auth";

export async function GET(request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response('Unauthorized', { status: 401 });
  }
  const token = authHeader.split(' ')[1];
  const user = await getUser(token);
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  } else {
    return new Response(JSON.stringify(user), { status: 200 });
  }
}