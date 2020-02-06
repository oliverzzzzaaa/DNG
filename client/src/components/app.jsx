import React from "react";
import { Switch, Route } from "react-router-dom";
import LobbyContainer from "./main/lobbyContainer";
import HomePage from "./home";
import RoomContainer from "./room/roomContainer";
import UserContainer from "./user/user_container";
import SignupForm from "./session/signup_form_container";
import LoginForm from "./session/login_form_container";
import { AuthRoute, ProtectedRoute } from "../util/route";
import "./reset.css";

const App = () => (
  <div className="app-main">
    <Switch>
      <AuthRoute exact path="/" component={HomePage} />
      <AuthRoute exact path="/login" component={LoginForm} />
      <AuthRoute exact path="/signup" component={SignupForm} />
      <ProtectedRoute exact path="/lobby" component={LobbyContainer} />
      <ProtectedRoute exact path="/room/:id" component={RoomContainer} />
      <ProtectedRoute exact path="/users/:userId" component={UserContainer} />
    </Switch>
  </div>
);

export default App;
