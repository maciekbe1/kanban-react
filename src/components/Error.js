import React from "react";

const Error = ({ error }) => (
    <p>
        {error.graphQLErrors.map(({ message }, i) => (
            <span key={i}>{message}</span>
        ))}
    </p>
);

export default Error;
