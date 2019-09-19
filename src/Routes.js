import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ProtectedRoute from "./components/Pages/Protected";
import Home from "./components/Pages/Home";
import Main from "./components/Panel/Main";
import About from "./components/Pages/About";
import NotFound from "./components/Pages/PageNotFound";
import Navigation from "./components/Navigation";
import Signup from "./components/Auth/Signup";
import Messages from "./components/Panel/Messages";
import Projects from "./components/Panel/Projects";
import Sidemenu from "./components/Sidemenu";
import { useSelector } from "react-redux";

export default function Routes() {
    const currentUser = useSelector(state => state.currentUser);

    return (
        <BrowserRouter>
            <Navigation />
            {currentUser.isAuth ? (
                <div className="container-fluid row">
                    <div className="col-12 col-md-3 col-xl-2">
                        <Sidemenu />
                    </div>
                    <div className="col-12 col-md-9 col-xl-8 bg-light">
                        <Switch>
                            <ProtectedRoute
                                path="/"
                                exact
                                render={render => <Main {...render} />}
                            />
                            <Route path="/messages" component={Messages} />
                            <Route path="/projects" component={Projects} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </div>
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
