import React, { useState, useEffect } from "react";
import { useSubscription } from "react-apollo-hooks";
import PanelMessage from "../Messages/PanelMessage";
import { MESSAGE_SUB } from "../../graphql";
import { useSelector } from "react-redux";

export default function Messages() {
    const user = useSelector(state => state.currentUser);
    const [messageData, setMessageData] = useState(null);
    const [first, setFirst] = useState(1);
    const { data } = useSubscription(MESSAGE_SUB, {
        variables: { userID: user.userID, first: first }
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
