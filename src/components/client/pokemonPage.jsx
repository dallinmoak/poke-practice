'use client';

import { useEffect, useState } from "react";

export default function PokemonPage({ id }) {

  const [pokemon, setPokemon] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const getData = async () => {
    const response = await fetch(`/api/pokemon/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    if (data && data.name) {
      document.title = data.name;
      setPokemon(data);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleEditPokemon = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const response = await fetch(`/api/pokemon/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    if (!data.error) {
      getData();
      setShowEditForm(false);
    } else {
      console.log(data.error);
    }
  };

  const handleDelete = async () => {
    const response = await fetch(`/api/pokemon/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!data.error) {
      window.location.href = '/';
    } else {
      console.log(data.error);
    }
  };


  return (
    <>
      <h1>{pokemon.name}</h1>
      <p>Owner username: {pokemon.owner?.username}</p>
      <p>owner name: {pokemon.owner?.name}</p>
      <p>pokemon record id: {pokemon._id}</p>
      {!showEditForm && <button onClick={() => setShowEditForm(true)}>edit</button>}
      {showEditForm && (
        <form onSubmit={handleEditPokemon}>
          <input type="text" defaultValue={pokemon.name} />
          <button type='submit'>save</button>
          <button onClick={() => setShowEditForm(false)}>cancel</button>
        </form>
      )}
      {!showDeleteForm && <button onClick={() => setShowDeleteForm(true)}>delete</button>}
      {showDeleteForm && (
        <>
          <h2>are you sure?</h2>
          <button onClick={handleDelete}>Yes, delete it</button>
          <button onClick={() => setShowDeleteForm(false)}>No, keep it</button>
        </>
      )
      }
    </>
  )
}