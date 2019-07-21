import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Context from "./context";

import ProtectedRoute from "./components/Pages/Protected";
import Home from "./components/Pages/Home";
import Panel from "./components/Pages/Panel";
import About from "./components/Pages/About";
import NotFound from "./components/Pages/PageNotFound";
import Navigation from "./components/Navigation";
import Signup from "./components/Auth/Signup";

export default function Routes() {
    const context = useContext(Context);

    return (
        <BrowserRouter>
            <Navigation />
            {/* {context.state.isAuth ? <Sidebar /> : null} */}

            {context.state.isAuth ? (
                <Switch>
                    <ProtectedRoute
                        path="/"
                        exact
                        render={render => <Panel {...render} />}
                    />
                    <Route component={NotFound} />
                </Switch>
            ) : (
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={render => <Home {...render} />}
                    />
                    <Route path="/signup" component={Signup} />
                    <Route path="/about" component={About} />
                    <Route component={NotFound} />
                </Switch>
            )}
        </BrowserRouter>
    );
}
