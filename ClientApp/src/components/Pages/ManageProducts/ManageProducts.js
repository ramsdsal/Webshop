import React, { Component } from "react";

import { Link } from "react-router-dom";
import "./ManageProducts.css";

//State: movies: Product[], isLoading: string
export class ManageProducts extends Component {
  constructor() {
    super();
    this.state = { isLoading: "isLoading", movies: [] };

    fetch("/api/Product/GetAdminProducts/1/4")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          ...this.state,
          movies: data.items,
          isLoading: "Not needed"
        });
      });
  }

  renderProductTable() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Titel</th>
            <th scope="col">Prijs</th>
            <th scope="col">Voorraad</th>
          </tr>
        </thead>
        <tbody>
          {this.state.movies.map(movie => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.title}</td>
              <td>{movie.price}</td>
              <td>{movie.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.renderProductTable();
    return (
      <div className="container">
        <h1>Admin</h1>
        <Link className="nav-link" to={"/addproduct"}>
          Voeg Product
        </Link>
        {contents}
      </div>
    );
  }
}
