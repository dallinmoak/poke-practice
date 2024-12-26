'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

export default function PokemonList() {

  const [pokemon, setPokemon] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const getPokemon = async () => {
    const response = await fetch('http://localhost:3000/api/pokemon', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    setPokemon(data);
  }

  useEffect(() => {
    getPokemon();
  }, []);

  const handleAddPokemon = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    console.log("submitting", name);
    const response = await fetch('http://localhost:3000/api/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    if (!data.error) {
      getPokemon();
      setShowAddForm(false);
    } else {
      console.log(data.error);
    }
  }

  return (
    <>
      <h1>Pokemon List</h1>
      <ul>
        {pokemon.map((pokemon, index) => {
          return (
            <li key={index}>
              <Link href={`/pokemon/${pokemon._id}`}>
                <p>{pokemon.name}</p>
              </Link>
            </li>
          );
        })}
      </ul>
      <button onClick={getPokemon}>Refresh</button>
      <button onClick={() => setShowAddForm(true)}>Add pokemon</button>
      {showAddForm && (
        <form onSubmit={handleAddPokemon}>
          <input type="text" placeholder="Name" />
          <button type='submit'>Add</button>
          <button onClick={() => setShowAddForm(false)}>cancel</button>
        </form>
      )}
    </>
  );
}