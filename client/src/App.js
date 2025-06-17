import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

import SampleNames from './components/SampleNames';
import PokemonDetails from './components/PokemonDetails';
import Loading from './components/Loading';
import ErrorFallback from './components/ErrorFallback';
import PokemonForm from './components/PokemonForm';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorMessage from './components/ErrorMessage';
import SearchBar from './components/SearchBar';

const sampleNames = ['Pikachu', 'Charmander', 'Bulbasaur'];

function App() {
  const [input, setInput] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [status, setStatus] = useState('add');
  const [error, setError] = useState('');

  const fetchPokemon = async (name) => {
    setStatus('loading');
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/master/${name}`);
      setPokemonData(res.data);
      setStatus('success');
    } catch (err) {
      setError('Pokemon not found or network issue');
      setStatus('error');
    }
  };

  const handleSearch = () => {
    if (input.trim()) {
      fetchPokemon(input.trim());
    }
  };

  const handleSampleClick = (name) => {
    setInput(name);
    fetchPokemon(name);
  };

  const reset = () => {
    setInput('');
    setPokemonData(null);
    setStatus('add');
    setError('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Pokémon?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/master/${id}`);
        alert('Pokemon deleted.');
        reset();
      } catch (err) {
        alert('Failed to delete.');
      }
    }
  };

  const handleEdit = (pokemonData) => {
    setPokemonData(pokemonData);
    setStatus('edit');
  };

  return (
    <div className="container">
      <h1>Pokemon Search</h1>

      <SearchBar input={input} setInput={setInput} onSubmit={handleSearch} />
      <SampleNames names={sampleNames} onSelect={handleSampleClick} />

      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
        {(status === 'add' || status === 'edit') && (
          <PokemonForm onSuccess={reset} existingData={status === 'edit' ? pokemonData : null} />
        )}
        {status === 'loading' && <Loading name={input} />}
        {status === 'success' && pokemonData && (
          <PokemonDetails
            data={pokemonData}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
        {status === 'error' && <ErrorMessage message={error} onReset={reset} />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
