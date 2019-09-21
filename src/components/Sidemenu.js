import React from "react";
import { NavLink } from "react-router-dom";
import { MESSAGES_COUNTER } from "../graphql";
import { useSubscription } from "@apollo/react-hooks";
export default function Sidemenu({ user }) {
    const { data, loading } = useSubscription(MESSAGES_COUNTER, {
        variables: { userID: user.userID }
    });
    return (
        <nav className="nav flex-column">
            <NavLink className="p-1 nav-link" to="/dashboard">
                Home
            </NavLink>
            <NavLink className="p-1 nav-link" to="/kanban">
                kanban
            </NavLink>
            <NavLink className="p-1 nav-link" to="/messages">
                messages
                {loading ? "..." : " " + data.messageCounter}
            </NavLink>
            <NavLink className="p-1 nav-link" to="/projects">
                Projects
            </NavLink>
        </nav>
    );
}
