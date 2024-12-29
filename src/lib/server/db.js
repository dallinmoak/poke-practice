import { MongoClient } from 'mongodb';
const uri = process.env.ATLAS_URI;

const client = await new MongoClient(uri).connect();

export default client;