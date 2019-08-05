import React, { useContext } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Context from "../../context";
import PanelMessage from "../Messages/PanelMessage";
const GET_MESSAGES = gql`
	query getAllMessages($first: Int!, $userId: ID!, $readed: Boolean!) {
		getAllUserMessages(first: $first, userId: $userId, readed: $readed) {
			messages {
				_id
				userId
				message
				readed
			}
			unreadedMessages
			totalMessages
		}
	}
`;
export default function Messages() {
	const context = useContext(Context);
	// const [messages, setMessages] = useState();
	// const [loadMessages, setLoadMessages] = useState(2);
	// const loadMoreMessage = () => {
	// 	if (messages >= loadMessages) {
	// 		setLoadMessages(loadMessages + 2);
	// 	}
	// };
	return (
		<Query
			query={GET_MESSAGES}
			variables={{
				userId: context.state.userId,
				readed: false,
				first: 2
			}}
		>
			{({ data, loading, error, fetchMore }) => {
				if (loading) return <h4>Loading...</h4>;
				if (error) console.log(error);
				// setMessages(data.getAllUserMessages.totalMessages);
				// console.log(data.getAllUserMessages.totalMessages);
				let current = data.getAllUserMessages.messages.length;
				return (
					<div>
						<p>messages:</p>
						<div>
							{data.getAllUserMessages.messages.map(
								(message, index) => {
									return (
										<PanelMessage
											key={index}
											data={message}
										/>
									);
								}
							)}
						</div>
						<button
							onClick={() => {
								fetchMore({
									variables: { first: current + 2 },
									updateQuery: (
										prev,
										{ fetchMoreResult }
									) => {
										if (!fetchMoreResult) {
											return prev;
										}
										return Object.assign(
											prev,
											fetchMoreResult
										);
									}
								});
							}}
						>
							Load more
						</button>
					</div>
				);
			}}
		</Query>
	);
}
