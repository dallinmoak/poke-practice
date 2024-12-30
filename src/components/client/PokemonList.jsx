'use client';

import { currentUser } from "@/lib/client/providers/currentUser";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function PokemonList() {

  const { user, setUser } = useContext(currentUser);
  const [pokemon, setPokemon] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const getMyPokemon = async () => {
    const response = await fetch(`/api/pokemon?owner-id=${user._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setPokemon(data);
  }

  useEffect(() => {
    getMyPokemon();
  }, []);

  const handleAddPokemon = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const response = await fetch('/api/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, ownerId: user._id }),
    });
    const data = await response.json();
    if (!data.error) {
      getMyPokemon();
      setShowAddForm(false);
    } else {
      console.log(data.error);
    }
  }


  return (
    <>
      <h1>Hello, {user.name}</h1>
      <p>current user: {user.username}</p>
      <button onClick={() => {
        setUser(null);
        localStorage.removeItem('user');
      }}>logout</button>
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
      <button onClick={getMyPokemon}>Refresh</button>
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