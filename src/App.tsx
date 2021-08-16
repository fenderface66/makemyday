import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import './App.css';
import DayConfigForm from "./DayConfigForm";
import LoginForm from './LoginForm';
import PrivateRoute from "./PrivateRoute";
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
          <PrivateRoute path="/">
            <DayConfigForm />
          </PrivateRoute>
        </Switch>
      </Router>
    </CookiesProvider>
  );
}

export default App;
