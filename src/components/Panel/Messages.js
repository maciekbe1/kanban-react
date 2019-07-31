import React, { useContext } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Context from "../../context";
export default function Messages() {
	const context = useContext(Context);
	const GET_MESSAGES = gql`
		query getAllMessages($userId: ID!, $readed: Boolean!) {
			getAllUserMessages(userId: $userId, readed: $readed) {
				messages {
					userId
					message
					readed
				}
				unreadedMessages
				totalMessages
			}
		}
	`;
	return (
		<Query
			query={GET_MESSAGES}
			variables={{ userId: context.state.userId, readed: false }}
		>
			{({ data, loading, error }) => {
				console.log(data);
				return (
					<div>
						<p>
							messages:
							{!loading && data
								? data.getAllUserMessages.unreadedMessages
								: null}
						</p>
						<div>
							{!loading && data
								? data.getAllUserMessages.messages.map(
										(message, index) => {
											return (
												<p
													className={
														message.readed
															? ""
															: "font-weight-bold"
													}
													key={index}
												>
													{message.message}
												</p>
											);
										}
								  )
								: error}
						</div>
					</div>
				);
			}}
		</Query>
	);
}
