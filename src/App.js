import React, { useContext, useReducer } from "react";
import "./assets/styles/Global.scss";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import Cookies from "universal-cookie";
import { split } from "apollo-link";
// import { SubscriptionClient } from "subscriptions-transport-ws";
// import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
//components
import Routes from "./Routes";
//context
import Context from "./context";
import reducer from "./reducer";

function App() {
	const cookies = new Cookies();
	const initialState = useContext(Context);
	const [state, dispatch] = useReducer(reducer, initialState);
	const ACCESS_TOKEN = cookies.get("token");

	const httpLink = createHttpLink({
		uri: process.env.REACT_APP_API,
		options: {
			connectionParams: () => ({
				authorization: ACCESS_TOKEN ? `${ACCESS_TOKEN}` : null
			})
		},
		headers: {
			Authorization: ACCESS_TOKEN
		}
	});
	const wsLink = new WebSocketLink({
		uri: process.env.REACT_APP_WS,
		options: {
			reconnect: true,
			connectionParams: () => ({
				authorization: ACCESS_TOKEN ? `${ACCESS_TOKEN}` : null
			})
		},
		headers: {
			Authorization: ACCESS_TOKEN
		}
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
