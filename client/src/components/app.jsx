import React from "react";
import { Switch } from "react-router-dom";
import Lobby from "./main/lobby";
import { Route } from "react-router-dom";
<<<<<<< HEAD
import ClientComponentExample from "./clientComponentExample";
import Client2 from "./clientExample2";

const App = () => (
  <div>
    <ClientComponentExample />
    <Client2 />
    <Switch>
      <Route exact path="/" component={Lobby} />
    </Switch>
  </div>


export default App;
