import React from 'react';
import { useRouteError } from 'react-router-dom';

export default function NotFound() {

    const { error } = useRouteError();
    return (
        <>
            <h1>

                the page you want is not present
                Please contact Prasad, Arya, Chinmay....
            </h1>

            <h3>

                the following is the error message for your convienience
            </h3>

            <p>
                {error}

            </p>
        </>
    );
}
