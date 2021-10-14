import React, { useContext } from 'react';

import 'styles/components/Header.css';
import { AuthContext } from 'contexts/auth';

const Header: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <header className="header">
        <div className="brand">{'<'}Brand{' />'}</div>
        <div className="texts">
          <h1>Painel de controle</h1>
          <h3>
            Bem-vindo de volta,{' '}
            <span className="username">{user!.name}</span>!
          </h3>
        </div>
      </header>
    </>
  );
}

export default Header;