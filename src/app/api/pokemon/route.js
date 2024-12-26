import { add, getAll } from "@/models/pokemon";

export async function GET(request) {
  const response = await getAll();
  console.log(response);
  return new Response(JSON.stringify(response));
}

export async function POST(request) {
  const pokemon = await request.json();
  console.log(pokemon);
  const name = await add(pokemon);
  return new Response(JSON.stringify(name));
}