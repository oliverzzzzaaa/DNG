import React from "react";
import { Switch } from "react-router-dom";
import Lobby from "./main/lobby";
import { Route } from "react-router-dom";

const App = () => (
  <Switch>
    <Route exact path="/" component={Lobby} />
  </Switch>
);

export default App;
