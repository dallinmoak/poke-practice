import client from "@/lib/db";
import { ObjectId } from "mongodb";

const collection = client.db("poke-practice").collection("users");

const getByUsername = async (username) => { };


export {
  getByUsername,
}