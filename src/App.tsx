import React from 'react';
import {Redirect, Route, Switch } from "react-router";
import Login from "./Login";
import Home from './Home';
import {BrowserRouter as Router} from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
        <Router>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
