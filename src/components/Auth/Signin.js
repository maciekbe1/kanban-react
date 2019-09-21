import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Error from "../Error";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { isAuthenticated } from "../../containers/isAuth";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../actions";
const SIGNIN_MUTATION = gql`
    mutation signInMutation($login: String!, $password: String!) {
        signIn(login: $login, password: $password) {
            token
        }
    }
`;
function Signin(props) {
    const dispatch = useDispatch();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const cookies = new Cookies();
    const [signIn, { loading, error }] = useMutation(SIGNIN_MUTATION, {
        variables: { login, password }
    });

    const onSignin = (e, signIn) => {
        e.preventDefault();
        signIn().then(({ data }) => {
            setPassword("");
            setLogin("");
            document.querySelector("#closeLoginModal").click();
            // sessionStorage.setItem("token", data.signIn.token);
            cookies.set("token", data.signIn.token);
            dispatch(
                setCurrentUser({
                    isAuth: true,
                    login: isAuthenticated().login,
                    userID: isAuthenticated().userID
                })
            );
            props.history.push(`/dashboard`);
        });
    };
    const validateForm = () => {
        const isInvalid = !login || !password;
        return isInvalid;
    };

    return (
        <div
            className="modal fade"
            id="loginModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="loginModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content bg-asphalt text-white">
                    <div className="modal-header">
                        <h5 className="modal-title" id="loginModalLabel">
                            Login panel
                        </h5>
                        <button
                            type="button"
                            className="close text-light"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form
                            id="signInModal"
                            // onKeyPress={e =>
                            //     e.key === "Enter" ? onSignin() : null
                            // }
                            onSubmit={e => onSignin(e, signIn)}
                        >
                            <div className="form-group">
                                <label
                                    htmlFor="recipient-name"
                                    className="col-form-label"
                                >
                                    Login:
                                </label>
                                <input
                                    className="form-control"
                                    id="login"
                                    type="text"
                                    placeholder="Login"
                                    onChange={event =>
                                        setLogin(event.target.value)
                                    }
                                    value={login}
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="recipient-name"
                                    className="col-form-label"
                                >
                                    Password:
                                </label>
                                <input
                                    className="form-control"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={event =>
                                        setPassword(event.target.value)
                                    }
                                    value={password}
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    id="closeLoginModal"
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-belizehole"
                                    type="submit"
                                    disabled={!login || validateForm()}
                                >
                                    {loading ? (
                                        <span
                                            className="spinner-border spinner-border-sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        "Sign in"
                                    )}
                                </button>
                            </div>
                            {error && <Error error={error} />}
                        </form>

                        {/* {loginFailure ? (
                            <div className="text-danger">
                                Wrong login or password!
                            </div>
                        ) : null} */}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default withRouter(Signin);
