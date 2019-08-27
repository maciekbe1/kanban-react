import React from "react";

const Error = ({ error }) => (
	<div>
		{error.graphQLErrors.map(({ message }, i) => (
			<span key={i}>{message}</span>
		))}
	</div>
);

export default Error;
