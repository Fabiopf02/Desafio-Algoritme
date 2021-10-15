import algoliasearch from 'algoliasearch';
import { IClient } from 'components/Client';

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIASEARCH_APPID!,
  process.env.REACT_APP_ALGOLIASEARCH_APIKEY!,
);

const searchIndex = searchClient.initIndex(process.env.REACT_APP_ALGOLIASEARCH_INDEX!);

export async function SearchService(term: string, ownerId: string) {
  const { hits } = await searchIndex.search<IClient>(ownerId + ' ' + term);
  return hits;
}

export async function SaveObjectService(data: IClient) {
  try {
    const { id: objectID, ...rest} = data;
    await searchIndex.saveObject({
      objectID,
      name: rest.name,
      status: rest.status,
      statusText: rest.status ? 'ativo' : 'inativo',
      phone: rest.phone,
      income: rest.income,
      ownerId: rest.ownerId,
      birthDate: rest.birthDate,
      createdAt: rest.createdAt,
    });
  } catch(err) {
    console.log('Algolia -> ', err);
  }
}

export async function UpdateObjectService(data: IClient) {
  try {
    const { id: objectID, ...rest} = data;
    await searchIndex.partialUpdateObject({
      objectID,
      name: rest.name,
      status: rest.status,
      statusText: rest.status ? 'ativo' : 'inativo',
      phone: rest.phone,
      income: rest.income,
      ownerId: rest.ownerId,
      birthDate: rest.birthDate,
      createdAt: rest.createdAt,
    });
  } catch(err) {
    throw new Error(String(err));
  }
}

export async function RemoveObjectService(objectID: number) {
  try {
    await searchIndex.deleteObject(String(objectID));
    return;
  } catch(err) {
    throw new Error(String(err));
  }
}
