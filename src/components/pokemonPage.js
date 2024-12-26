'use client';

import { useEffect, useState } from "react";

export default function PokemonPage({ id }) {

  const [pokemon, setPokemon] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const getData = async () => {
    const response = await fetch(`http://localhost:3000/api/pokemon/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
    const data = await response.json();
    console.log(data);
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
    console.log("submitting", name);
    const response = await fetch(`http://localhost:3000/api/pokemon/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
    const response = await fetch(`http://localhost:3000/api/pokemon/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
      <p>{pokemon._id}</p>
      {!showEditForm && <button onClick={() => setShowEditForm(true)}>edit</button>}
      {showEditForm && (
        <form onSubmit={handleEditPokemon}>
          <input type="text" defaultValue={pokemon.name} />
          <button type='submit'>save</button>
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