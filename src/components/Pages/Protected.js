import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Context from "../../context";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const context = useContext(Context);
    // console.log(context.state.isAuth);
    return (
        <Route
            render={props =>
                context.state.isAuth ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
            {...rest}
        />
    );
};

export default ProtectedRoute;
