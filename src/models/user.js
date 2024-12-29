import client from "@/lib/db";
// import { ObjectId } from "mongodb";

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


export {
  getByUsername,
}