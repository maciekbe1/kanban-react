import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const user = useSelector(state => state.currentUser);
    return (
        <Route
            render={props =>
                user.isAuth ? <Component {...props} /> : <Redirect to="/" />
            }
            {...rest}
        />
    );
};

export default ProtectedRoute;
