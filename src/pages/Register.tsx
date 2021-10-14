import React, { useRef, useState } from 'react';

import SubmitButton from 'components/SubmitButton';
import Input from 'components/Input';
import FormError from 'components/FormError';

import { Link, useHistory } from 'react-router-dom';

import 'styles/pages/Logon.css';
import 'styles/Form.css';
import { SignUpService } from 'services/auth';
import Form from 'components/Form';

const Register: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    try {
      if (!email || !password) {
        return;
      }
      await SignUpService(email, password, name!);
      setLoading(false);
      alert('O usuário foi registrado, acesse a página de login');
      history.push('/login');
    } catch(err) {
      setLoading(false);
      if (String(err).indexOf('email-already-in-use') > 0) {
        return setError('O E-mail já está cadastrado');
      }
      setError('Ocorreu um erro, tente novamente');
    }
  }

  return (
    <div className="container">
      <Form onSubmit={handleRegister}>
        <h2>Criar conta</h2>
        <Input
          ref={nameRef}
          text="Nome"
          type="text"
        />
        <Input
          ref={emailRef}
          text="E-mail"
          type="email"
        />
        <Input
          ref={passwordRef}
          text="Senha"
          type="password"
        />
        
        <SubmitButton disabled={loading} text={loading ? "Cadastrando..." : "Cadastrar"} />

        <span>
          Já possui uma conta?
          <Link to="login" className="link">
            <span> Acesse aqui</span>
          </Link>
        </span>
        {error !== '' && <FormError {...{ error }} />}
      </Form>
    </div>
  );
};

export default Register;
