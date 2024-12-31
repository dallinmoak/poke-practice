'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PokemonPage({ id }) {

  const [dataState, setDataState] = useState('loading');
  const [pokemon, setPokemon] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const Router = useRouter();

  const getData = async () => {
    const response = await fetch(`/api/pokemon/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))}`
      },
    });
    if (!response.ok) {
      if (response.status === 401) {
        setDataState('unauthorized');
      } else {
        setDataState('error');
      }
      const error = await response.text();
      console.log(error);
      return;
    } else {
      const data = await response.json();
      if (data && data.name) {
        setDataState('loaded');
        document.title = data.name;
        setPokemon(data);
      }
    }
  }

  useEffect(() => {
    setDataState('loading');
    getData();
  }, []);

  const handleEditPokemon = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const response = await fetch(`/api/pokemon/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))}`
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      const error = await response.text();
      console.log('error in edit', error);
    } else {
      const data = await response.json();
      if (data) {
        getData();
        setShowEditForm(false);
      }
    }
  };

  const handleDelete = async () => {
    const response = await fetch(`/api/pokemon/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))}`
      },
    });
    if (!response.ok) {
      const error = await response.text();
      console.log('error in delete', error);
    } else {
      const data = await response.json();
      if (data) Router.push('/');
    }
  };


  return (
    <>
      {dataState === 'loading' ?
        <h1>Loading...</h1> :
        (dataState === 'error' ?
          <h1>There was an error</h1> :
          (dataState === 'unauthorized' ?
            <>
              <h1>Unauthorized</h1>
              <p>you're not allowed to see this data</p>
            </> :
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
        )
      }
    </>
  )
}