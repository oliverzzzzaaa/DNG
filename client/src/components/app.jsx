import React from "react";
import { Switch } from "react-router-dom";
import Lobby from "./main/lobby";
import { Route } from "react-router-dom";
import ClientComponentExample from "./clientComponentExample";
import Client2 from "./clientExample2";

import Room from "./room/room";
import SignupForm from "./session/signup_form_container";
import LoginForm from "./session/login_form_container";
import { AuthRoute, ProtectedRoute } from "../util/route";


const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path="/login" component={LoginForm} />
      <Route exact path="/signup" component={SignupForm} />
      <Route exact path='/home' component={HomePage} /> 
      <ProtectedRoute exact path="/lobby" component={Lobby} />
      <ProtectedRoute exact path="/room/:id" component={Room} />
    </Switch>
  </div>
);

export default App;
