import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../components/layout/Header';
import routes from '../routes';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Fragment>
            <Header />
            <Switch>
              {routes.map(route => {
                return (
                  <Route
                    key={route.id}
                    path={route.path}
                    component={route.component}
                    exact={route.exact}
                  />
                );
              })}
            </Switch>
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
