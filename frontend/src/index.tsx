import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Redirect, HashRouter } from "react-router-dom";

// core components
import Admin from "./layouts/Admin";
import SignIn from "./views/Login";
import BatchDetails from "./views/BatchDetails";

import "./assets/css/material-dashboard-react.css?v=1.10.0";
import NewBatch from "./views/NewBatch";
import NewSample from "./views/NewSample";
import VisualControl from "./views/VisualControl";
import CookingControl from "./views/CookingControl";

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/batch/new" component={NewBatch} />
      <Route path="/batch/:id/add" component={NewSample} />
      <Route path="/visual/:batchId/:sampleId" component={VisualControl} />
      <Route path="/coccion/:batchId/:sampleId" component={CookingControl} />
      <Route path="/batch/:id" component={BatchDetails} />
      <Route path={"/login"} component={SignIn}/>
      <Redirect from="/" to={localStorage.getItem('mail') ? "/admin" : "/login"} />
      <Redirect from={'/*'} to={localStorage.getItem('mail') ? "/admin" : "/login"} />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
