import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Sidemenu from "../Sidemenu";
import Content from "../Panel/Content";
import Price from "../Pages/Price";
export default function Panel() {
    return (
        <BrowserRouter>
            <div className="panel container-fluid">
                <div className="row">
                    <div className="col-12 col-md-3 col-xl-2">
                        <Sidemenu />
                    </div>
                    <Switch>
                        <div className="col-12 col-md-9 col-xl-8 bg-light">
                            <Route
                                path="/"
                                exact
                                render={render => <Content {...render} />}
                            />
                            <Route path="/price" component={Price} />
                        </div>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}
