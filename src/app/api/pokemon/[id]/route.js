import { getOne, updateOne, deleteOne } from "@/models/pokemon";

export async function GET(request, { params }) {
  const id = (await params).id;
  const response = await getOne(id);
  return new Response(JSON.stringify(response), {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function PUT(request, { params }) {
  const id = (await params).id;
  const pokemon = await request.json();
  const response = await updateOne(id, pokemon);
  return new Response(JSON.stringify(response), {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function DELETE(request, { params }) {
  const id = (await params).id;
  const response = await deleteOne(id);
  return new Response(JSON.stringify(response), {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}