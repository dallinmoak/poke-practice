import client from "@/lib/server/db";
import { ObjectId } from "mongodb";
import { getbyId } from "@/models/user";

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

const getByOnwer = async (ownerId) => {
  try {
    const result = await collection.find({ ownerId: new ObjectId(ownerId) }).toArray();
    return result;
  } catch (error) {
    console.error("Error in pokemon model: ", error);
    throw new Error(error);
  }
};

const getOne = async (id) => {
  try {
    const pokemon = await collection.findOne({ _id: new ObjectId(id) });
    const owner = await getbyId(pokemon.ownerId);
    return { ...pokemon, owner };
  } catch (error) {
    console.error("Error in pokemon model: ", error);
    throw new Error(error);
  }
}

const add = async (pokemon) => {
  try {
    const result = await collection.insertOne({ ...pokemon, ownerId: new ObjectId(pokemon.ownerId) });
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

const isOwner = async (pokemonId, ownerId) => {
  try {
    const pokemon = await getOne(pokemonId);
    const foundOwnerId = pokemon.owner._id.toString();
    return foundOwnerId === ownerId;
  } catch (error) {
    console.error("Error in pokemon model: ", error);
    throw new Error(error);
  }
}

export {
  getAll,
  getOne,
  getByOnwer,
  add,
  updateOne,
  deleteOne,
  isOwner,
}