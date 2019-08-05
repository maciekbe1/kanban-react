import React from "react";
import { NavLink } from "react-router-dom";
import gql from "graphql-tag";
import { Subscription } from "react-apollo";
// import Context from "../context";
// const GET_MESSAGES = gql`
// 	query getAllMessages($userId: ID!) {
// 		getAllUserMessages(userId: $userId) {
// 			unreadedMessages
// 		}
// 	}
// `;
const MESSAGES_SUBSCRIPTION = gql`
	subscription onMessagesChange {
		count
	}
`;
export default function Sidemenu() {
	// const context = useContext(Context);

	return (
		<nav className="nav flex-column">
			<NavLink className="p-1 nav-link active" to="/">
				Home
			</NavLink>
			<NavLink className="p-1 nav-link" to="/projects">
				Projects
			</NavLink>
			<NavLink className="p-1 nav-link" to="/kanban">
				kanban
			</NavLink>
			<NavLink className="p-1 nav-link" to="/messages">
				<Subscription
					subscription={MESSAGES_SUBSCRIPTION}
					// variables={{
					// 	userId: context.state.userId
					// }}
				>
					{({ data, loading, error }) => {
						if (loading) return <h4>Loading...</h4>;
						if (error) console.log(error);
						console.log(data);
						return <div>Messages {data.count}</div>;
					}}
				</Subscription>
			</NavLink>
		</nav>
	);
}
