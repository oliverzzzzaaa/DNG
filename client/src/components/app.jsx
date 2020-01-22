import React from "react";
import { Switch } from "react-router-dom";
import LobbyContainer from "./main/lobbyContainer";
import { Route } from "react-router-dom";
import ClientComponentExample from "./clientComponentExample";
import Client2 from "./clientExample2";
import HomePage from './home';

import Room from "./room/room";
import SignupForm from "./session/signup_form_container";
import LoginForm from "./session/login_form_container";
import { AuthRoute, ProtectedRoute } from "../util/route";


const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path='/' component={HomePage} /> 
      <AuthRoute exact path="/login" component={LoginForm} />
      <AuthRoute exact path="/signup" component={SignupForm} />
      <ProtectedRoute exact path="/lobby" component={LobbyContainer} />
      <ProtectedRoute exact path="/room/:id" component={Room} />
    </Switch>
  </div>
);

export default App;
