import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";
import history from "./components/Helper/history";

export default class App extends Component {
  displayName = App.name;

  render() {
    return (
      <Layout>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/counter" component={Counter} />
            <Route path="/fetchdata" component={FetchData} />
          </Switch>
        </Router>
      </Layout>
    );
  }
}
