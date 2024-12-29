import client from "@/lib/server/db";
import { ObjectId } from "mongodb";

const collection = client.db("poke-practice").collection("users");

const getByUsername = async (username) => {
  try {
    const user = await collection.findOne({ username });
    return user;
  } catch (error) {
    console.error("Error in getByUsername", error);
    return null;
  }
};

const getbyId = async (id) => {
  try {
    const user = await collection.findOne({ _id: new ObjectId(id) });
    return user;
  }
  catch (error) {
    console.error("Error in getById", error);
    return null;
  }
}


export {
  getByUsername,
  getbyId,
}