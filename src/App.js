import React, { useContext, useReducer } from "react";
import "./assets/styles/Global.scss";
import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
// import { setContext } from "apollo-link-context";

import { split } from "apollo-link";
// import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
//components
import Routes from "./Routes";
//context
import Context from "./context";
import reducer from "./reducer";

function App() {
	const initialState = useContext(Context);
	const [state, dispatch] = useReducer(reducer, initialState);
	const ACCESS_TOKEN = sessionStorage.getItem("token");

	const httpLink = createHttpLink({
		uri: process.env.REACT_APP_API,
		connectionParams: {
			authToken: ACCESS_TOKEN
		}
	});
	const wsLink = new WebSocketLink({
		uri: `ws://localhost:4000/graphql`,
		options: {
			reconnect: true
		},
		connectionParams: {
			authToken: ACCESS_TOKEN
		}
		// headers: {
		// 	Authorization: `Bearer ${ACCESS_TOKEN}`
		// }
	});
	// const authLink = setContext((_, { headers }) => {
	// 	// get the authentication token from local storage if it exists
	// 	const token = sessionStorage.getItem("token");
	// 	// return the headers to the context so httpLink can read them
	// 	return {
	// 		headers: {
	// 			...headers,
	// 			authorization: token ? token : ""
	// 		}
	// 	};
	// });
	const link = split(
		// split based on operation type
		({ query }) => {
			const definition = getMainDefinition(query);
			return (
				definition.kind === "OperationDefinition" &&
				definition.operation === "subscription"
			);
		},
		wsLink,
		httpLink
	);
	const client = new ApolloClient({
		link,
		cache: new InMemoryCache()
	});
	return (
		<Context.Provider value={{ state, dispatch }}>
			<ApolloProvider client={client}>
				<Routes />
			</ApolloProvider>
		</Context.Provider>
	);
}

export default App;
