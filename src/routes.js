import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './components/Login';
import Articles from "./components/Articles";
import Events from "./components/Events";
import Profile from "./components/Profile";
import Register from "./components/Register";
//import PasswordReset from "./components/PasswordReset";
import PasswordReset from "./components/PasswordReset/index";
import EmailPasswordReset from "./components/PasswordReset/indexEmailReset";

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/articles" component={Articles} />
                <Route path="/events" component={Events} />
                <Route path="/password-reset" component={PasswordReset} />
                <Route path="/password-reset-email" component={EmailPasswordReset} />
                <Route path="/profile" component={Profile} />
                <Route path="/register" component={Register} />
            </Switch>
        </BrowserRouter>
    );
}