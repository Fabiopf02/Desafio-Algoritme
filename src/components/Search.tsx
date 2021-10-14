import React, { FormEvent, useContext, useRef, useState } from 'react';

import 'styles/components/Filter.css';
import Input from './Input';
import { FilterContext } from 'contexts/filter';

import { FiSearch } from 'react-icons/fi';

const Search: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setSearchFC } = useContext(FilterContext);
  const [loading, setLoading] = useState(false);

  const handleFilter = (event: FormEvent) => {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    const value = inputRef.current?.value;
    if (!value?.length) {
      return;
    }
    setSearchFC(value!);
    return setLoading(false);
  };

  return (
    <div className="item">
      <form onSubmit={handleFilter}>
        <div className="row">
          <span className="material-icons-outlined">
          </span>
          <Input
            className="inp"
            ref={inputRef}
            placeholder="Buscar por nome, telefone..."
            type="search"
          />
          <button>
            <FiSearch size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
