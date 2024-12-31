import { getAuthToken, isOwnerByToken, unauthed } from "@/lib/server/auth";
import { getOne, updateOne, deleteOne } from "@/models/pokemon";

export async function GET(request, { params }) {
  const token = getAuthToken(request);
  if (!token) return unauthed;
  const id = (await params).id;
  try {
    const isOwner = await isOwnerByToken(token, id);
    if (!isOwner) return unauthed;
    const response = await getOne(id);
    return new Response(JSON.stringify(response));
  } catch (e) {
    console.error('Error in GET', e);
    return unauthed;
  }
}

export async function PUT(request, { params }) {
  const token = getAuthToken(request);
  if (!token) return unauthed;
  const id = (await params).id;
  try {
    const isOwner = await isOwnerByToken(token, id);
    if (!isOwner) return unauthed;
    const pokemon = await request.json();
    const response = await updateOne(id, pokemon);
    return new Response(JSON.stringify(response));
  } catch (e) {
    console.error('Error in PUT', e);
    return unauthed;
  }
}

export async function DELETE(request, { params }) {
  const token = getAuthToken(request);
  if (!token) return unauthed;
  const id = (await params).id;
  try {
    const isOwner = await isOwnerByToken(token, id);
    if (!isOwner) return unauthed;
    const response = await deleteOne(id);
    return new Response(JSON.stringify(response));
  } catch (e) {
    console.error('Error in DELETE', e);
    return unauthed;
  }
}