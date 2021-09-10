import React from 'react';
import './index.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Navigation } from './routers/index';
import { Github, Login, Callback, Main } from './componets/index';
import { useSelector, useDispatch } from 'react-redux';
const queryClient = new QueryClient();
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={Navigation.HOME} component={Main} />
        <Route exact path={Navigation.LOGIN} component={Login} />
        <Route exact path={Navigation.AUTHENTICATION} component={Callback} />
        <Route exact path={Navigation.ADMIN} component={Github} />
      </Switch>
    </Router>
  );
}

export default App;
