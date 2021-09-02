import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";

function App() {
  const history = useHistory();

  return (
    <Router>
      <Route>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </Route>
    </Router>
  );
}

export default App;
