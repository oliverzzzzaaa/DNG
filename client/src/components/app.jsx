import React from "react";
import { Switch } from "react-router-dom";
import Lobby from "./main/lobby";
import { Route } from "react-router-dom";
import SignupForm from "./session/signup_form_container";
import LoginForm from "./session/login_form_container";

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={LoginForm} />
      <Route exact path="/signup" component={SignupForm} />
      <Route exact path="/lobby" component={Lobby} />
    </Switch>
  </div>
);

export default App;
