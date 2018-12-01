import React, { Component } from "react";
import ProductList from "./ProductList";

export class Home extends Component {
  displayName = Home.name;

  render() {
    return (
      <ProductList />
    );
  }
}

