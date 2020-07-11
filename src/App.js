/* eslint-disable no-this-before-super */
import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import User_Actions from './actions/User_Actions';
import './App.scss';
import { BASE_ADDRESS } from './containers/constant/CONSTANT';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

const fakeAuth = {
  isAuthenticated: false,
  user: {},
  authenticate(username, password) {
    User_Actions.login(username, password).then((res) => {
      if (res.data.accessToken) {
        fakeAuth.isAuthenticated = true;
        fakeAuth.user = res.data;
        setTimeout(username, 100);
        window.location.replace(BASE_ADDRESS);
      } else {
        alert('Account or password wrong!');
      }
    })
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    fakeAuth.user = {};
    setTimeout(cb, 100);
    window.location.replace(BASE_ADDRESS);
  }
};


function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.signin = this.signin.bind(this);
  }

  signin(username, password) {
    fakeAuth.authenticate(username, password);
    this.setState({});
  }

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props} fakeAuth={fakeAuth} signin={this.signin} />} />
            <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
            {/* <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} /> */}
            <PrivateRoute path="/">
              <DefaultLayout fakeAuth={fakeAuth} />
            </PrivateRoute>
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
