import React, { useEffect } from 'react';
import AOS from 'aos';
import { focusHandling } from 'cruip-js-toolkit';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Navigation } from './routers/index';
import { Github, Login, Callback, Main } from './componets/index';
import Signin from './componets/Signin';
import SignUp from './componets/SignUp'
import { useSelector, useDispatch } from 'react-redux';
import './index.css';


import Home from './pages/Home';

const queryClient = new QueryClient();
function App() {


  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    });
  });



  return (
    <Router>
      <Switch>
        <Route exact path={Navigation.HOME} component={Home} />
        <Route exact path={Navigation.REGISTER} component={Signin} />
        <Route exact path={Navigation.LOGIN} component={SignUp} />
        <Route exact path={Navigation.AUTHENTICATION} component={Callback} />
        <Route exact path={Navigation.ADMIN} component={Github} />
      </Switch>
    </Router>
  );
}

export default App;
