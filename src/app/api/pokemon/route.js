import { getAuthToken, isUserByToken, unauthed } from "@/lib/server/auth";
import { add, getAll, getByOnwer } from "@/models/pokemon";

export async function GET(request) {
  const token = getAuthToken(request);
  if (!token) return unauthed;
  const url = new URL(request.url);
  const ownerId = url.searchParams.get('owner-id');
  if (ownerId) {
    const isOwner = isUserByToken(token, ownerId);
    if (!isOwner) return unauthed;
    const data = await getByOnwer(ownerId);
    return new Response(JSON.stringify(data));
  } else {
    const data = await getAll();
    return new Response(JSON.stringify(data));
  }
}

export async function POST(request) {
  const token = getAuthToken(request);
  if (!token) return unauthed;
  const pokemon = await request.json();
  const isOwner = isUserByToken(token, pokemon.ownerId);
  if (!isOwner) return unauthed;
  const name = await add(pokemon);
  return new Response(JSON.stringify(name));
}