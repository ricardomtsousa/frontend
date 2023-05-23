import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './components/Login';
import Articles from "./components/Articles";
import Events from "./components/Events";
import Profile from "./components/Profile";
import Register from "./components/Register";


export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/articles" component={Articles} />
                <Route path="/events" component={Events} />
                <Route path="/profile" component={Profile} />
                <Route path="/register" component={Register} />
            </Switch>
        </BrowserRouter>
    );
}