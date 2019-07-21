import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Navigation.scss";
import logo from "../assets/images/logo.png";

import Context from "../context";
import Signin from "./Auth/Signin";

export default function Navigation() {
    const context = useContext(Context);
    const { dispatch } = useContext(Context);
    const onSignout = () => {
        dispatch({
            type: "SIGNOUT_USER"
        });
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("login");
    };

    return (
        <nav className="navigation navbar navbar-expand-lg navbar-dark bg-asphalt">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img className="logo" src={logo} alt="logo" />
                    <span className="mx-3">Kanba</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav mr-auto">
                        {context.state.isAuth ? (
                            <a
                                className="nav-link"
                                href="#test"
                                onClick={e => e.preventDefault()}
                            >
                                Logged in as:{" "}
                                <span className="logged-as-name text-success">
                                    {context.state.login}
                                </span>
                            </a>
                        ) : null}
                    </ul>
                    {!context.state.isAuth ? (
                        <div className="btn-group">
                            <button
                                className="btn btn-belizehole"
                                to="/"
                                data-toggle="modal"
                                data-target="#loginModal"
                                onClick={e => e.preventDefault()}
                            >
                                Sign in
                            </button>
                            <Link
                                className="btn btn-outline-belizehole text-white"
                                to="/signup"
                            >
                                Sign up
                            </Link>
                        </div>
                    ) : (
                        <button
                            className="btn btn-belizehole"
                            onClick={onSignout}
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
            <Signin />
        </nav>
    );
}
