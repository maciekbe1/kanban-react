import React, { useContext, useState, useEffect } from "react";
import { useSubscription } from "react-apollo-hooks";
import Context from "../../context";
import PanelMessage from "../Messages/PanelMessage";
import { MESSAGE_SUB } from "../../graphql";

export default function Messages() {
	const context = useContext(Context);
	const [messageData, setMessageData] = useState(null);
	const [first, setFirst] = useState(1);
	const { data } = useSubscription(MESSAGE_SUB, {
		variables: { userID: context.state.userID, first: first }
	});
	useEffect(() => {
		setMessageData(data);
	}, [data]);
	const showMessages = messageData => {
		return messageData.messageSub.messages.map((item, index) => {
			return <PanelMessage key={index} data={item} />;
		});
	};
	console.log(messageData);
	return (
		<>
			<div>
				<p>messages:</p>
				<div>
					{/* {error ? <Error error={error} /> : null} */}
					{!messageData ? (
						<div>Loading</div>
					) : (
						showMessages(messageData)
					)}
				</div>
				<button onClick={() => setFirst(first + 1)}>Fetch more</button>
			</div>
		</>
	);
}
