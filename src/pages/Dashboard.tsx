import React, { useEffect, useRef, useState } from 'react';
import { IClient } from 'components/Client';
import Clients from 'components/Clients';
import Header from 'components/Header';
import NewClient, { ModalHandles } from 'components/NewClient';
import SideBar from 'components/SideBar';

import 'styles/pages/Dashboard.css';
import { ClientProvider } from 'contexts/client';
import { FilterProvider } from 'contexts/filter';

export interface IC {
  data: IClient;
  key: number;
}

const Dashboard: React.FC = () => {
  const [client, setClient] = useState<IC>({} as IC);
  const modalRef = useRef<ModalHandles>(null);

  const handleOpen = () => {
    setClient({} as IC);
    modalRef.current?.openModal();
  }

  useEffect(() => {
    if (client && client.data) {
      modalRef.current?.openModal();
    }
  }, [client]);

  return (
    <ClientProvider>
      <div className="dashboard">
        <Header />
        <div className="content">
          <FilterProvider>
            <SideBar fct={handleOpen} />
            <Clients setClient={setClient} />
          </FilterProvider>
        </div>
      </div>
      <NewClient ref={modalRef} data={client.data} />
    </ClientProvider>
  );
};

export default Dashboard;
