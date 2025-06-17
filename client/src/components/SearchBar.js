import React, { useRef } from 'react';

const SearchBar = ({ input, setInput, onSubmit }) => {
  const inputRef = useRef();

  const handleChange = (e) => setInput(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
      className='search-input'
        ref={inputRef}
        value={input}
        onChange={handleChange}
        placeholder="Enter Pokemon name"
        autoFocus
      />
      <button type="submit">Fetch!</button>
    </form>
  );
};

export default SearchBar;
