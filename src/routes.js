import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './components/Login';
import Articles from "./components/Articles";


export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/articles" component={Articles} />
            </Switch>
        </BrowserRouter>
    );
}