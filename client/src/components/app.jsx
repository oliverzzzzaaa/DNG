import React from "react";
import { Switch } from "react-router-dom";
import Lobby from "./main/lobby";
import { Route } from "react-router-dom";
import LoggedIn from "./loggedIn";

const App = () => (
  <div>
    <LoggedIn />
    <Switch>
      <Route exact path="/" component={Lobby} />
    </Switch>
  </div>
);

export default App;
