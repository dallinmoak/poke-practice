import { add, getAll, getByOnwer } from "@/models/pokemon";

export async function GET(request) {
  //TODO: secure this endpoint
  const url = new URL(request.url);
  const ownerId = url.searchParams.get('owner-id');
  if (ownerId) {
    const response = await getByOnwer(ownerId);
    return new Response(JSON.stringify(response));
  } else {
    const response = await getAll();
    return new Response(JSON.stringify(response));
  }
}

export async function POST(request) {
  // TODO: secure this endpoint
  const pokemon = await request.json();
  const name = await add(pokemon);
  return new Response(JSON.stringify(name));
}