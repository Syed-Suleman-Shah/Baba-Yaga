// src/components/Common/InputField.js
import React from 'react';

function InputField({ type, placeholder, value, onChange }) {
  return (
    <div className="mb-3">
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default InputField;
