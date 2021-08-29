import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Github, Login, Callback } from './componets/index';
const queryClient = new QueryClient();
function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <nav>
          <ul>
            <li>
              <Link to="/login">login</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/auth/github/callback">
            <Callback />
          </Route>
        </Switch>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
