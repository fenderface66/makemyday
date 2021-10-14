import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect,
} from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import './App.css';
import DayConfigForm from "./pages/DayConfigForm";
import LoginForm from './pages/LoginForm/LoginForm';
import Preferences from "./pages/Preferences"
import PrivateRoute from "./components/PrivateRoute";

export type User = {
  accessToken: string;
}

function App() {
  return (
    <CookiesProvider>
      <Router>
        <Switch>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route
            exact
            path="/"
            render={() => (
              <Redirect to="/home" />
            )}
          />
          <PrivateRoute path="/home">
            <DayConfigForm />
          </PrivateRoute>
          <PrivateRoute path="/preferences">
            <Preferences />
          </PrivateRoute>
        </Switch>
      </Router>
    </CookiesProvider>
  );
}

export default App;
