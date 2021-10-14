import React, { useContext, useEffect, useState } from 'react';
import Client, { IClient } from './Client';

import 'styles/components/Clients.css';
import { AuthContext } from 'contexts/auth';
import { ClientContext } from 'contexts/client';
import Loading from './Loading';
import { sortBy } from 'utils/sort';
import { FilterContext } from 'contexts/filter';
import { IC } from 'pages/Dashboard';

interface IProps {
  setClient: React.Dispatch<React.SetStateAction<IC>>;
}

const Clients: React.FC<IProps> = ({ setClient }) => {
  const [clients, setClients] = useState<IClient[]>();
  const [reload, setReload] = useState(false);
  const { user } = useContext(AuthContext);
  const { getClients, doc, loading, searchClient, removed } = useContext(ClientContext);
  const { search, order } = useContext(FilterContext);
  const [lastSearch, setLastSearch] = useState(search);

  useEffect(() => {
    async function getData() {
      setReload(false);
      const res = await getClients(user!.id);
      return setClients(res);
    };
    getData();
  }, [getClients, user, reload]);

  useEffect(() => {
    async function get() {
      if (!doc) {
        return;
      }
      setClients(ov => [doc, ...ov!.filter(client => client.id !== doc?.id)]);
    }
    get();
  }, [doc]);

  useEffect(() => {
    async function handleSearch() {
      if (!search || search === lastSearch) {
        return;
      }
      setLastSearch(search);
      const res = await searchClient(search, user?.id!);
      const clts = res.map(client => {
        return {
          id: Number(client.objectID),
          name: client.name,
          status: client.status,
          phone: client.phone,
          income: client.income,
          ownerId: client.ownerId,
          birthDate: new Date(client.birthDate),
          createdAt: new Date(client.createdAt),
        }
      }); 
      setClients(sortBy(order.field, clts, order.type));
    }
    handleSearch();
  }, [lastSearch, order, search, searchClient, user?.id]);


  useEffect(() => {
    function orderFC() {
      if (!clients) {
        return;
      }
      setClients(sortBy(order.field, clients, order.type));
    }
    orderFC();
  }, [clients, order]);

  useEffect(() => {
    setClients(oldValue => oldValue?.filter(client => client.id !== removed));
  }, [removed]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="content-container">
      <h1 className="title">Lista de correntistas</h1>
      {clients !== undefined && clients.length > 0 && clients.map(client => (
        <Client key={client.id} data={client} setClient={setClient} />
      ))}
      {(!clients || clients.length === 0) && !loading &&
        <>
          <h2 className="msg">Nenhum cliente foi encontrado!</h2>
          <button onClick={() => setReload(true)} className="reload-btn">Recarregar</button>
        </>
      }
    </div>
  );
}

export default Clients;