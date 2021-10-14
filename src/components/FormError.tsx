import React from 'react';

import 'styles/components/FormError.css';

interface IProps {
  error: string;
}

const FormError: React.FC<IProps> = ({ error }) => {
  return (
    <div className="error-container">
      <p>{error}</p>
    </div>
  );
}

export default FormError;