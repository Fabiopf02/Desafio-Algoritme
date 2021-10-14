import React, { useContext, useRef, useState } from "react";

import 'styles/components/SideBar.css';
import Search from "./Search";
import { AuthContext } from "contexts/auth";
import Filter from "./Filter";
import { FiLogOut, FiChevronRight, FiChevronLeft } from 'react-icons/fi';

interface IProps {
  fct?: () => void;
}

const SideBar: React.FC<IProps> = ({ fct }) => {
  const { signOut } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const logout = async () => {
    await signOut();
  };

  const toggle = () => {
    sidebarRef.current!.classList.toggle('an');
    sidebarRef.current?.classList.value.includes('an') ? setVisible(true) : setVisible(false);
  }

  return (
    <div ref={sidebarRef} className="side-bar">
      <div className="brand">{'<'}Brand{' />'}</div>
      <ul>
        <li>
          <span>
            <h4>Buscar</h4>
          </span>
          <Search />
        </li>
        <li>
          <span>
            <h4>Ordenar por</h4>
          </span>
          <Filter />
        </li>
      </ul>
      <button onClick={fct}>
        <strong>Novo cliente</strong>
      </button>
      <button className="logout" onClick={logout}>
        <span>
          Sair
        </span>
        <FiLogOut size={18} />
      </button>
      <button className="btn-toggle" onClick={toggle}>
        <span>
          {visible === true ?
            <FiChevronLeft className="chevron-l" size={20} />
          : <FiChevronRight className="chevron-r" size={20} />
          }
        </span>
      </button>
    </div>
  );
};

export default SideBar;
