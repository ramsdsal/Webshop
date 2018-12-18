import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { ProductDetails } from "./components/ProductDetails";
import { Register } from "./components/Register";
import { ManageProducts } from "./components/Pages/ManageProducts";
import { AddProduct } from "./components/Pages/AddProduct";
import { ManageUsers } from "./components/Pages/ManageUsers";
import { Login } from "./components/Login";
import { ConfirmationMail } from "./components/ConfirmationMail";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import { UpdateUser } from "./components/Pages/UpdateUser";
import { Statistics } from "./components/Pages/Statistics";
import { UserProfile } from "./components/Pages/UserProfile";
import Checkout from "./components/Checkout/Checkout";

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
        <Route
          path="/confirmation/:token"
          render={props => (
            <ConfirmationMail confirmationToken={props.match.params.token} />
          )}
        />
        <Route
          path="/updateuser/:userId"
          render={props => <UpdateUser userId={props.match.params.userId} />}
        />
        <Route path="/fetchdata" component={FetchData} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/shoppingcart" component={ShoppingCart} />
        <Route path="/manageproducts" component={ManageProducts} />
        <Route path="/addproduct" component={AddProduct} />
        <Route path="/manageusers" component={ManageUsers} />
        <Route path="/userprofile" component={UserProfile} />
        <Route path="/statistics" component={Statistics} />
        <Route path="/checkout" component={Checkout} />
      </Layout>
    );
  }
}
