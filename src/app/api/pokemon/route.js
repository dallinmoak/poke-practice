import { add, getAll } from "@/models/pokemon";

export async function GET(request) {
  const response = await getAll();
  return new Response(JSON.stringify(response));
}

export async function POST(request) {
  const pokemon = await request.json();
  const name = await add(pokemon);
  return new Response(JSON.stringify(name));
}