import React, { useContext, useReducer } from "react";
import "./assets/styles/Global.scss";
import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

//components
import Routes from "./Routes";
//context
import Context from "./context";
import reducer from "./reducer";

function App() {
	const initialState = useContext(Context);
	const [state, dispatch] = useReducer(reducer, initialState);
	const httpLink = createHttpLink({
		uri: process.env.REACT_APP_API
		// uri: "http://localhost:4000/graphql"
	});

	const authLink = setContext((_, { headers }) => {
		// get the authentication token from local storage if it exists
		const token = sessionStorage.getItem("token");
		// return the headers to the context so httpLink can read them
		return {
			headers: {
				...headers,
				authorization: token ? token : ""
			}
		};
	});

	const client = new ApolloClient({
		link: authLink.concat(httpLink),
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
