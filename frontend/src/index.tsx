import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "./layouts/Admin";
import SignIn from "./views/Login";
import BatchDetails from "./views/BatchDetails";

import "./assets/css/material-dashboard-react.css?v=1.10.0";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/batch/:id" component={BatchDetails} />
      <Route path={"/login"} component={SignIn}/>
      <Redirect from="/" to={localStorage.getItem('mail') ? "/admin" : "/login"} />
      <Redirect from={'/*'} to={localStorage.getItem('mail') ? "/admin" : "/login"} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
