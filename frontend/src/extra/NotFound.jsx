import React from 'react';
import { useRouteError } from 'react-router-dom';

export default function NotFound() {
  const error = useRouteError();

  return (
    <>
      <h1>
        The page you want is not present.
        Please contact Prasad, Arya, Chinmay....
      </h1>

      <h3>
        The following is the error message for your convenience:
      </h3>

      <p>
        {error ? (error.statusText || error.message) : "No error information available."}
      </p>
    </>
  );
}