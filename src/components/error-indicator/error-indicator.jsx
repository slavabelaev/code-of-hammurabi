import React from 'react';

function ErrorIndicator({ error: { name, message } }) {
    return (
        <figure>
            <figcaption>{name || 'Error'}</figcaption>
            {message ? <details>{message}</details> : null}
        </figure>
    );
}

export default ErrorIndicator;
