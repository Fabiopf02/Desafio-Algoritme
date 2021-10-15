import React, { createContext, useCallback, useState } from 'react';
import { IClient } from 'components/Client';
import {
  CreateClientService,
  DocRef,
  GetClientService,
  GetClientsService,
  IData,
  RemoveClientService,
  UpdateClientService,
} from 'services/client';
import { RemoveObjectService, SaveObjectService, SearchService, UpdateObjectService } from 'services/algoliasearch';
import { Hit } from '@algolia/client-search';

interface ClientContextData {
  loading: boolean;
  doc?: IClient;
  removed?: number;
  removeClientFC(term: IClient): Promise<void>;
  searchClient(term: string, ownerId: string): Promise<Hit<IClient>[]>
  updateClient(data: IData): Promise<void>;
  createClient(data: IClient): Promise<void>;
  getClients(id: string): Promise<IClient[]>;
}

export const ClientContext = createContext({} as ClientContextData);

export const ClientProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [doc, setDoc] = useState<IClient>();
  const [removed, setRemoved] = useState<number>();

  async function handleChange(ref?: DocRef, action?: string) {
    if (!ref) {
      return;
    }
    const res = await GetClientService(ref!);
    if (action === 'created') {
      await SaveObjectService(res);
    } else {
      await UpdateObjectService(res);
    }
    setDoc(res);
  }

  const createClient = useCallback(async (data: IClient) => {
    try {
      const ref = await CreateClientService(data);
      await SaveObjectService(data);
      handleChange(ref, 'created');
    } catch(err) {
      throw new Error(String(err));
    }
  }, []);

  const getClients = useCallback(async (userId: string) => {
    try {
      setLoading(true);
      const clients = await GetClientsService(userId);
      setLoading(false);
      return clients;
    } catch(err) {
      setLoading(false);
      throw new Error(String(err));
    }
  }, []);
  
  const updateClient = useCallback(async (data: IData) => {
    try {
      const ref = await UpdateClientService(data);
      handleChange(ref, 'updated');
    } catch(err) {
      throw new Error(String(err));
    }
  }, []);

  const searchClient = useCallback(async (value: string, ownerId: string) => {
    try {
      setLoading(true);
      const res = await SearchService(value, ownerId);
      setLoading(false);
      return res;
    } catch (err) {
      setLoading(false);
      throw new Error(String(err));
    }
  }, []);

  const removeClientFC = useCallback(async (doc: IClient) => {
    try {
      await RemoveClientService(doc.doc!);
      await RemoveObjectService(doc.id);
      return setRemoved(doc.id);
    } catch(err) {
      throw new Error(String(err));
    }
  }, []);

  return (
    <ClientContext.Provider
      value={{
        loading,
        doc,
        removed,
        removeClientFC,
        searchClient,
        createClient,
        getClients,
        updateClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  )
};
