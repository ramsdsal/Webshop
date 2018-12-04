import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { ProductDetails } from "./components/ProductDetails";
import { Register } from "./components/Register";
import { ManageProducts} from "./components/Pages/ManageProducts"
import { AddProduct} from "./components/Pages/AddProduct"
import { ManageUsers} from "./components/Pages/ManageUsers"
import { Login } from "./components/Login";

// import { ShoppingCart } from "./components/ShoppingCart";

export default class App extends Component {
  displayName = App.name;

  render() {
    return (
      <Layout>
      <Route exact path="/" component={Home} />
      <Route
        path="/ProductDetails/:id"
        render={props => <ProductDetails id={props.match.params.id} />}
      />
      <Route path="/fetchdata" component={FetchData} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      {/* <Route path="/shoppingcart" component={ShoppingCart} /> */}
      <Route path="/manageproducts" component={ManageProducts} />
      <Route path="/addproduct" component={AddProduct} />
      <Route path="/manageusers" component={ManageUsers} />
    </Layout>
    );
  }
}
