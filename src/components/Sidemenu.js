import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidemenu() {
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
                messages
            </NavLink>
        </nav>
    );
}
