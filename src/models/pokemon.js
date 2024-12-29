import client from "@/lib/server/db";
import { ObjectId } from "mongodb";

const collection = client.db("poke-practice").collection("pokemon");

const getAll = async () => {
  try {
    const result = await collection.find({}).toArray();
    return result;
  } catch (error) {
    console.error("Error in pokemon model: ", error);
    throw new Error(error);
  }
};

const getOne = async (id) => {
  try {
    const result = await collection.findOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error("Error in pokemon model: ", error);
    throw new Error(error);
  }
}

const add = async (pokemon) => {
  try {
    const result = await collection.insertOne(pokemon);
    return result;
  } catch (error) {
    console.error("Error in pokemon model: ", error);
    throw new Error(error);
  }
}

const updateOne = async (id, pokemon) => {
  try {
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: pokemon });
    return result;
  } catch (error) {
    console.error("Error in pokemon model: ", error);
    throw new Error(error);
  }
}

const deleteOne = async (id) => {
  try {
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error("Error in pokemon model: ", error);
    throw new Error(error);
  }
};

export {
  getAll,
  getOne,
  add,
  updateOne,
  deleteOne,
}