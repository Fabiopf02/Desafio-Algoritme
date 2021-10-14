import { IClient } from "components/Client";

interface IArray extends IClient {
  [index: string]: any;
}

export function sortBy(field: string, array: IArray[], type: 'asc' | 'desc') {
  if (!array || array === []) {
    return array;
  }

  const sorted = array.sort((a, b) => {
    let valueA = a[field];
    let valueB = b[field];
    if (typeof valueA === 'string') {
      valueA = `${valueA}`.toUpperCase();
      valueB = `${valueB}`.toUpperCase();
    }
    if (valueA > valueB) return 1;
    if (valueA < valueB) return -1;
    return 0;
  });

  
  if (type === 'desc') {
    return sorted;
  }
  
  if (type === 'asc') {
    return sorted.reverse();
  }
  return array;
}
