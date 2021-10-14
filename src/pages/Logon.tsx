import React, { useContext, useRef, useState } from 'react';

import Input from 'components/Input';
import SubmitButton from 'components/SubmitButton';

import { Link } from 'react-router-dom';

import 'styles/pages/Logon.css';
import 'styles/Form.css';

import { AuthContext } from 'contexts/auth';

import FormError from 'components/FormError';
import Form from 'components/Form';

const Logon: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn } = useContext(AuthContext);

  const handleLogon = async (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    try {
      if (!email || !password) {
        setLoading(false);
        return setError('Preencha todos os campos!');
      }
      setError('');
      await signIn(email, password);
      setLoading(false);
      return;
    } catch(err) {
      setLoading(false);
      if (String(err).indexOf('user-not-found') > 0) {
        return setError('Usuário não encontrado')
      }
      if (String(err).indexOf('wrong-password') > 0) {
        return setError('Senha incorreta!');
      }
      setError('Ocorreu um erro, tente novamente');
    }
  }

  return (
    <div className="container">
      <Form onSubmit={handleLogon}>
        <h2>Boas-vindas!</h2>
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

        <SubmitButton disabled={loading} text={loading ? "Autenticando..." : "Entrar"} />

        <span>
          Não possui uma conta?
          <Link to="register" className="link">
            <span> Registre-se</span>
          </Link>
        </span>
      {error !== '' && <FormError {...{ error }} />}
      </Form>
    </div>
  );
};

export default Logon;
