import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ProtectedRoute from "./components/Pages/Protected";
import Home from "./components/Pages/Home";
import Dashboard from "./components/Pages/Dashboard";
import About from "./components/Pages/About";
import NotFound from "./components/Pages/PageNotFound";
// import Navigation from "./components/Navigation";
import Signup from "./components/Auth/Signup";
import Messages from "./components/Dashboard/Messages";
import Projects from "./components/Dashboard/Projects";
import Layout from "./components/Layout";
export default function Routes() {
    return (
        <BrowserRouter>
            <Layout dashboard={Dashboard}>
                {/* <Navigation /> */}
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={render => <Home {...render} />}
                    />
                    <ProtectedRoute path="/dashboard" component={Dashboard} />
                    <ProtectedRoute path="/messages" component={Messages} />
                    <ProtectedRoute path="/projects" component={Projects} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/about" component={About} />
                    <Route component={NotFound} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}
