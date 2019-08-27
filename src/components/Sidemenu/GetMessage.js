// import React from "react";
// import Error from "../Error";
// import { useSubscription } from "react-apollo-hooks";
// import { MESSAGE_SUB } from "../graphql";

// export default function GetMessage() {
// 	const { data, error, loading } = useSubscription(MESSAGE_SUB);
// 	if (loading) return <>...</>;
// 	if (error) return <Error error={error} />;
// 	return <>{data.messageSub.totalUnreadedMessage} </>;
// }
