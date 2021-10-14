import React from 'react';

import 'styles/components/SubmitButton.css';

interface IProps {
  text: string;
  disabled?: boolean; 
}

const SubmitButton: React.FC<IProps> = ({ text, disabled }) => {
  return (
    <button type="submit" disabled={disabled} className="submit-button">
      <strong>{text}</strong> 
    </button>
  );
}

export default SubmitButton;