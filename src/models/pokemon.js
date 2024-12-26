import client from "@/lib/db";

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

const add = async (pokemon) => {
  try {
    const result = await collection.insertOne(pokemon);
    return result;
  } catch (error) {
    console.error("Error in pokemon model: ", error);
    throw new Error(error);
  }
}

export {
  getAll,
  add,
}