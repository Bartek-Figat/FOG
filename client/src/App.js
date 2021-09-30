import { useEffect, Suspense, lazy } from 'react';
import AOS from 'aos';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {Login, Callback, Github} from './componets/index'
import { Navigation } from './routers/index';
import './index.css';


const Home = lazy(() => import('./pages/Home'));
const Signin = lazy(() => import('./componets/Signin'));
const SignUp = lazy(() => import('./componets/SignUp'));



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
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route path={Navigation.HOME} exact component={Home} />
          <Route path={Navigation.REGISTER} exact component={SignUp} />
          <Route path={Navigation.LOGIN} exact component={Signin} />
          <Route path={Navigation.AUTHENTICATION} exact component={Callback} />
          <Route path={Navigation.ADMIN} exact component={Github} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
