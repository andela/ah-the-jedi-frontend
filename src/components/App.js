import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './layout/Header';
import routes from '../routes';

class App extends Component {
  render() {
    return (
      <div>
        <ToastContainer />
        <Router>
          <Fragment>
            <Header />
            <Switch>
              {routes.map(route => (
                <Route
                  key={route.id}
                  path={route.path}
                  component={route.component}
                  exact={route.exact}
                />
              ))}
            </Switch>
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
