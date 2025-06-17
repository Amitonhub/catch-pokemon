import React from 'react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert" className="error-boundary">
      <p>Something went wrong while rendering the UI:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
};

export default ErrorFallback;