import React from "react";
import { Switch } from "react-router-dom";
import Lobby from "./main/lobby";
import { Route } from "react-router-dom";
import ClientExample from "./clientExample";

const App = () => (
  <div>
    <ClientExample />
    <Switch>
      <Route exact path="/" component={Lobby} />
    </Switch>
  </div>
);

export default App;
