import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
const MARK_AS_READED = gql`
	mutation changeMessageStatusMutation($messageId: ID!) {
		changeMessageStatus(messageId: $messageId) {
			readed
		}
	}
`;
export default function PanelMessage(props) {
	const [readed, setReaded] = useState(props.data.readed);
	const handleMessageUpload = changeMessageStatus => {
		changeMessageStatus().then(({ data }) => {
			// console.log(data);
			setReaded(true);
		});
	};
	return (
		<Mutation
			mutation={MARK_AS_READED}
			variables={{ messageId: props.data._id }}
		>
			{(changeMessageStatus, { data, loading, error }) => {
				return (
					<div className="d-flex my-4">
						<p
							className={
								readed ? "text-alert" : "font-weight-bold"
							}
						>
							{props.data.message}
						</p>
						{!readed ? (
							<button
								onClick={() =>
									handleMessageUpload(changeMessageStatus)
								}
							>
								mark as readed
							</button>
						) : null}
					</div>
				);
			}}
		</Mutation>
	);
}
