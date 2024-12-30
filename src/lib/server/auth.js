import jwt from 'jsonwebtoken';

import { getbyId } from "@/models/user";
import { isOwner } from '@/models/pokemon';

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30 days' });
}

const verify = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error('error in verify', err);
    return null;
  }
}

const getUser = async (token) => {
  try {
    const decoded = verify(token);
    const id = decoded.userId;
    const user = await getbyId(id);
    return user;
  } catch (err) {
    throw new Error('error in getUser', err);
  }
}

const isOwnerByToken = async (token, pokemonId) => {
  try {
    const decoded = verify(token);
    if (!decoded) return false;
    const ownerId = decoded.userId;
    const isOwnerRes = await isOwner(pokemonId, ownerId);
    return isOwnerRes;
  } catch (err) {
    console.error('error in isOwnerByToken', err);
    return false;
  }
}

const unauthed = new Response('Unauthorized', { status: 401 });

const getAuthToken = (request) => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.split(' ')[1];
}

export {
  generateToken,
  getUser,
  isOwnerByToken,
  unauthed,
  getAuthToken
};