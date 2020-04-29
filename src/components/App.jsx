import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import SearchPage from '../components/SearchPage';
import AboutPage from './AboutPage';
import reducer from '../reducers/';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="app">
        <ul className="left-navi">
          <li>
            <Link to="/">ホテル検索</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/" component={SearchPage} />
          <Route exact path="/about" component={AboutPage} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default App;
