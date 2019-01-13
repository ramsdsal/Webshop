import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { ProductDetails } from "./components/ProductDetails";
import { Register } from "./components/Register";
import { ManageProducts } from "./components/Pages/ManageProducts";
import { AddProduct } from "./components/Pages/AddProduct";
import { ManageUsers } from "./components/Pages/ManageUsers"; //ManageOrders
import { ManageOrders } from "./components/Pages/ManageOrders";
import { Login } from "./components/Login";
import { ConfirmationMail } from "./components/ConfirmationMail";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import { UpdateUser } from "./components/Pages/UpdateUser";
import { UpdateOrder } from "./components/Pages/UpdateOrder";
import { Statistics } from "./components/Pages/Statistics";
import { UpdateProduct } from "./components/Pages/UpdateProduct/UpdateProduct";
import Checkout from "./components/Checkout/Checkout";
import FavoritesList from "./components/Favorite/FavoritesList";
import UserProfile from "./components/Pages/UserProfile/UserProfile";
import { ManageDiscounts } from "./components/Pages/ManageDiscounts/ManageDiscounts";
import RequireAuth from "./components/Login/RequireAuth";
import RequireAdmin from "./components/Login/RequireAdmin";

export default class App extends Component {
  displayName = App.name;

  render() {
    return (
      <Layout>
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
        <Route
          path="/updateproduct/:productId"
          render={props =>
            RequireAuth(
              <UpdateProduct productId={props.match.params.productId} />
            )
          }
        />
        <Route
          path="/updateOrder/:orderId"
          render={props => <UpdateOrder orderId={props.match.params.orderId} />}
        />
        <Route
          path="/manageOrders"
          component={RequireAuth(RequireAdmin(ManageOrders))}
        />
        <Route path="/favoriteslist" component={RequireAuth(FavoritesList)} />

        <Route path="/manageproducts" component={ManageProducts} />
        <Route path="/addproduct" component={AddProduct} />
        <Route path="/manageusers" component={ManageUsers} />
        <Route path="/userprofile" component={RequireAuth(UserProfile)} />
        <Route path="/statistics" component={Statistics} />
        <Route path="/checkout" component={RequireAuth(Checkout)} />
        <Route path="/manageDiscounts" component={ManageDiscounts} />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/shoppingcart" component={ShoppingCart} />
        <Route path="/register" component={Register} />
      </Layout>
    );
  }
}
