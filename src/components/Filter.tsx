import { FilterContext } from 'contexts/filter';
import React, { useContext, useRef } from 'react';

import 'styles/components/Filter.css';

const OrderFilter: React.FC = () => {
  const { changeOrder } = useContext(FilterContext);
  const fieldRef = useRef<HTMLSelectElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);

  const onChange = () => {
    if (!fieldRef.current || !typeRef.current) {
      return;
    }
    const field = fieldRef.current!.value;
    const type = typeRef.current!.value;
    return changeOrder({ field, type: type === 'asc' ? 'asc' : 'desc'});
  };

  return (
    <div>
      <select ref={fieldRef} defaultValue="income" onChange={onChange}>
        <option value="name">Nome</option>
        <option value="income">Renda</option>
        <option value="birthDate">Data de nascimento</option>
        <option value="status">Status</option>
      </select>
      <select ref={typeRef} defaultValue="desc" onChange={onChange}>
        <option value="asc">Ascendente</option>
        <option value="desc">Decrescente</option>
      </select>
    </div>
  );
};

export default OrderFilter;
