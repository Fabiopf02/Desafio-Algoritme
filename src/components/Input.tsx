import React, { InputHTMLAttributes, useState } from 'react';

import 'styles/components/Input.css';

interface IProps extends InputHTMLAttributes<any> {
  text?: string;
  type: string;
  step?: string;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, IProps> = (props, ref) => {
  const [err, setErr] = useState(false);
  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    if (!value) {
      return setErr(true);
    }
    if (props.type === 'email' &&
      !value.match(/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/)) {
      return setErr(true);
    }
    setErr(false);
  }

  return (
    <div className="block-input">
      {props.text !== undefined && <label>{props.text}</label>}
      <input
        ref={ref}
        {...props}
        className={err ? "error" : ""}
        type={props.type}
        minLength={props.type === "password" ? 6 : undefined}
        step={props.type === 'number' ? props.step ?? '1' : ''}
        onBlur={onBlur}
        autoComplete={props.type === "password" ? "off" : "on"}
      />
    </div>
  );
};

export default React.forwardRef(Input);
