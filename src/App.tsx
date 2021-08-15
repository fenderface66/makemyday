import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import DayConfigForm from "./DayConfigForm";
import LoginForm from './LoginForm';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/">
          <DayConfigForm />
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
