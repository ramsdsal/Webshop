import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { ProductDetails } from "./components/ProductDetails";

export default class App extends Component {
  displayName = App.name;

  render() {
    return (
      <Layout>
        <Switch>
          <Route
            exact
            path="/productdetails/:id"
            render={props => <ProductDetails id={props.match.params.id} />}
          />
        </Switch>
        <Route exact path="/" component={Home} />
        <Route path="/fetchdata" component={FetchData} />
      </Layout>
    );
  }
}
