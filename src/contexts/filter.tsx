import React, { createContext, useCallback, useState } from 'react';

interface IOrder {
  field: string;
  type: 'asc' | 'desc';
}

interface IFilterContext {
  search: string;
  order: IOrder;
  changeOrder: (order: IOrder) => void;
  setSearchFC: (value: string) => void;
}

export const FilterContext = createContext({} as IFilterContext);

export const FilterProvider: React.FC = ({ children }) => {
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState<IOrder>({ field: 'income', type: 'desc' });

  const setSearchFC = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const changeOrder = useCallback((order: IOrder) => {
    setOrder(order);
  }, []);

  return (
    <FilterContext.Provider value={{
      search,
      order,
      setSearchFC,
      changeOrder,
    }}>
      {children}
    </FilterContext.Provider>
  );
};
