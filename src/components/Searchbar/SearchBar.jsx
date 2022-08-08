import s from './Searchbar.module.css';
import { useState } from 'react';

const SerchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    const value = e.target.value.trimStart();
    setQuery(value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (query.length === 0) return;
    onSubmit(query);
  };
  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <input
          value={query}
          className={s.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
        <button type="submit" className={s.searchFormButton}>
          <span className={s.searchFormButtonLabel}></span>
        </button>
      </form>
    </header>
  );
};
export default SerchBar;
