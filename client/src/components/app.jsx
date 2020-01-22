import React from "react";
import { Switch } from "react-router-dom";
import Lobby from "./main/lobby";
import { Route } from "react-router-dom";
import ClientComponentExample from "./clientComponentExample";
import Client2 from "./clientExample2";
import SignupForm from './session/signup_form_container';
import LoginForm from './session/login_form_container';

const App = () => (
  <div>
    <ClientComponentExample />
    <Client2 />
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/signup" component={SignupForm} />
      <Route exact path="/" component={Lobby} />
    </Switch>
  </div>
);

export default App;
