import React from 'react';

const ErrorMessage = ({ message, onReset }) => (
  <div className="error">
    <p>{message}</p>
    <button onClick={onReset}>Try Again</button>
  </div>
);

export default ErrorMessage;