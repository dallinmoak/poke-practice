import { create as createUser, getAll } from "@/models/user";

export async function POST(request) {
  const body = await request.json();
  const user = body;
  if (!body || !body.username || !body.name) {
    return new Response('Bad request', { status: 400 });
  } else {
    // TODO: check if user.username is already taken
    const newUser = await createUser(user);
    return new Response(JSON.stringify(newUser), { status: 201 });
  }
}

export async function GET(request) {
  const url = new URL(request.url);
  const users = await getAll();
  const justUsernames = users.map(user => user.username);
  return new Response(JSON.stringify(justUsernames));
}
