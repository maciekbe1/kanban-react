// import React, { useState } from "react";
// import { MARK_AS_READED } from "../graphql";
// import { useMutation } from "@apollo/react-hooks";

// export default function Message(props) {
// 	// console.log(props.messages);
// 	// const [readed, setReaded] = useState();
// 	if(!props.messages) return <div>loading</div>
// 	const [changeMessageStatus] = useMutation(MARK_AS_READED, {
// 		variables: { messageID: props.data._id }
// 	});
// 	const handleMessageUpload = changeMessageStatus => {
// 		changeMessageStatus().then(() => {
// 			// console.log(data);
// 			setReaded(true);
// 		});
// 	};
// 	return (
// 		<div className="d-flex my-4">
// 			{/* <p className={readed ? "" : "font-weight-bold"}>
// 				{props.data.message}
// 			</p>
// 			{!readed ? (
// 				<button
// 					onClick={() => handleMessageUpload(changeMessageStatus)}
// 				>
// 					mark as readed
// 				</button>
// 			) : null} */}

// 		</div>
// 	);
// }
