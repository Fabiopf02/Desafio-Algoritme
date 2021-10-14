import React, { memo } from 'react';

interface IProps {
  prop: string;
  value: any;
  btn?: boolean;
  fct?: () => Promise<void>;
}

const ClientProperty: React.FC<IProps> = ({ prop, value, btn, fct }) => {
  return (
    <div className="block">
      <h4 className="p">{prop}</h4>
      <p
        className={
          typeof(value) === 'boolean' ? value ? 'v gr' : 'v r' : 'v'
        }>
          {typeof(value) === 'boolean' ? value ? 'Ativo' : 'Inativo' : String(value)}
      </p>
    </div>
  );
};

export default memo(ClientProperty);
