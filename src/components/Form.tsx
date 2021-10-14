import React from 'react';
import 'styles/Form.css';

interface IProps {
  onSubmit(event: React.FormEvent): Promise<void>;
}

const Form: React.FC<IProps> = ({ children, onSubmit }) => {
  return (
    <div className="form-container">
      <form className="form" onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
}

export default Form;