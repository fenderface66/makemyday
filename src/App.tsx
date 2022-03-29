import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "./App.css";
import DayConfigForm from "./pages/DayConfigForm";
import LoginForm from "./pages/LoginForm/LoginForm";
import Preferences from "./pages/Interests";
import PrivateRoute from "./components/PrivateRoute";
import Complete from "./pages/Complete";
import Schedule from "./pages/Schedule";
import history from "./history";

export type User = {
  accessToken: string;
};

function App() {
  return (
    <CookiesProvider>
      <Router history={history}>
        <Switch>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <PrivateRoute path="/home">
            <DayConfigForm />
          </PrivateRoute>
          <PrivateRoute path="/interests">
            <Preferences />
          </PrivateRoute>
          <PrivateRoute path="/schedule">
            <Schedule />
          </PrivateRoute>
          <PrivateRoute path="/complete">
            <Complete />
          </PrivateRoute>
        </Switch>
      </Router>
    </CookiesProvider>
  );
}

export default App;
