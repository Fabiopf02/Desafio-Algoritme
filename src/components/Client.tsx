import React, { memo, useContext, useState } from 'react';

import 'styles/components/Client.css';

import ClientProperty from './ClientProperty';
import { DocumentReference } from '@firebase/firestore';
import { ClientContext } from 'contexts/client';

import { FiEdit2 as FiEdit, FiTrash } from 'react-icons/fi';
import { formatPhoneNumber } from 'utils/format';
import { IC } from 'pages/Dashboard';

export interface IClient {
  doc?: DocumentReference;
  id: number;
  name: string;
  phone: number;
  birthDate: Date;
  income: number;
  status: boolean;
  ownerId: string;
  createdAt: Date;
}

interface IProps {
  data: IClient;
  setClient: React.Dispatch<React.SetStateAction<IC>>;
}

const Client: React.FC<IProps> = ({ data, setClient }) => {
  const { removeClientFC } = useContext(ClientContext);
  const [confirm, setConfirm] = useState(false);
  const handleEdit = () => {
    setClient({ data, key: Math.random() });
  }

  const removeClient = async function() {
    try {
      await removeClientFC(data);
      return alert("O cliente foi removido");
    } catch(err) {
      alert("Ocorreu um error, tente novamente");
    }
  }

  const confirmFC = async () => {
    if (!confirm) return setConfirm(true);

    return await removeClient();
  };

  return (
    <div className="client-container">
      <div className="data">
        <ClientProperty prop="ID" value={data.id} />
        <ClientProperty prop="Nome" value={data.name} />
        <ClientProperty prop="Telefone" value={formatPhoneNumber(data.phone)} />
        <ClientProperty prop="Data de nasc." value={data.birthDate.toLocaleDateString()} />
        <ClientProperty prop="Renda" value={'R$ ' + Number(data.income.toFixed(2)).toLocaleString()} />
        <ClientProperty prop="Status" value={data.status} />
      </div>
      <div className="options">
        <button className="del" onClick={confirmFC}>
          <strong>{confirm ? 'Confirmar' :'Remover'}</strong>
          {confirm === false && <FiTrash width={20} />}
        </button>
        <button onClick={handleEdit}>
          <strong>Editar</strong>
          <FiEdit width={20} />
        </button>
      </div>
    </div>
  );
};

export default memo(Client);
