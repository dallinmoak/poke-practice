import jwt from 'jsonwebtoken';

import { getbyId } from "@/models/user";

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

export { generateToken, getUser };