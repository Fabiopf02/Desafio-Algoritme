import React, { useContext, useEffect, useRef, useState, useImperativeHandle, useCallback } from "react";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

import { IClient } from "./Client";
import FormError from "./FormError";
import { AuthContext } from "contexts/auth";

import 'styles/Form.css';
import 'styles/components/Modal.css';

import Form from "./Form";
import { ClientContext } from "contexts/client";

interface IProps {
  data?: IClient;
}

export interface ModalHandles {
  openModal: () => void;
}

const NewClient: React.ForwardRefRenderFunction<ModalHandles, IProps> = ({ data }, ref) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const birthRef = useRef<HTMLInputElement>(null);
  const incomeRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const { user } = useContext(AuthContext);
  const { updateClient, createClient } = useContext(ClientContext);

  const [error, setError] = useState('');

  useEffect(() => {
    if (data?.name && nameRef.current) {
      nameRef.current!.value = data.name;
      phoneRef.current!.value = String(data.phone);
      birthRef.current!.value = data.birthDate.toISOString().split('T')[0];
      incomeRef.current!.value = String(data.income);
      statusRef.current!.checked = data.status;
    }
  }, [data]);

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      if (loading) {
        return;
      }
      setLoading(true);
      const name = nameRef.current?.value;
      const phone = phoneRef.current?.value;
      const date = birthRef.current?.value;
      const income = incomeRef.current?.value;

      if (!name || !phone || !date || !income) {
        return setError('Preencha todos os campos!');
      }
      if (phone.length < 11) {
        return setError('O número de telefone deve ter pelo menos 11 dígitos. (DDD + telefone)');
      }
      if (phone.length > 11) {
        return setError('O número de telefone deve ter no máximo 11 dígitos. (DDD + telefone)');
      }
      setError('');
      
      const client = {
        name,
        phone: Number(phone),
        birthDate: new Date(date),
        income: Number(income),
        status: statusRef.current!.checked,
      };
      if (data && data.id) {
        await updateClient({ ...client, doc: data.doc, id: data.id });
      } else {
        const id = Number(Math.random().toString(10).substr(2, 10));
        await createClient({ ...client, id, createdAt: new Date(), ownerId: user!.id, });
      }
      setLoading(false);
      clearInputs();
      closeModal();
      
    } catch(err) {
      setLoading(false);
      return setError(String(err));
    }
  };

  const openModal = useCallback(() => {
    modalRef.current?.classList.add('show');
  }, []);

  const closeModal = useCallback(() => {
    clearInputs();
    modalRef.current?.classList.remove('show');
    modalRef.current?.classList.add('hide');
    modalRef.current?.addEventListener('animationend', () => {
      modalRef.current?.classList.remove('hide');
    });
  }, []);

  useImperativeHandle(ref, () => {
    return {
      openModal,
    }
  });

  const clearInputs = () => {
    nameRef.current!.value = '';
    phoneRef.current!.value = '';
    birthRef.current!.value = '';
    incomeRef.current!.value = '';
    statusRef.current!.value = '';
  };

  return (
    <div ref={modalRef} className="modal">
      <Form onSubmit={handleSubmit}>
        <h2>{data && data.id ? 'Atualizar cliente' : 'Novo cliente'}</h2>
        <Input
          ref={nameRef}
          text="Nome"
          type="text"
        />
        <Input
          ref={phoneRef}
          text="Telefone"
          placeholder="DDD + número"
          type="number"
          maxLength={11}
        />
        <Input
          ref={birthRef}
          text="Data de nascimento"
          type="date"
        />
        <Input
          ref={incomeRef}
          text="Renda"
          step="any"
          type="number"
        />
        <label className="lb-checkbox">
          Status
          <input ref={statusRef} type="checkbox" className="checkbox" />
        </label>

        <SubmitButton
          disabled={loading}
          text={data && data.id
            ? loading ? 'Atualizando...' : 'Atualizar'
            : loading ? 'Salvando...' : 'Inserir'}
        />
        {error !== '' && <FormError error={error} />}
        <div className="center">
          <button className="cancel" type="button" onClick={closeModal}>Cancelar</button>
        </div>
      </Form>
    </div>
  );
};

export default React.forwardRef(NewClient);
