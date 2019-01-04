import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./ManageUsers.css";


//State: users: User[], isLoading: string
export class ManageUsers extends Component {
  constructor() {
    super();
    this.state = { isLoading: "isLoading", users: [] };

    fetch("/api/User")
      .then(response => response.json())
      .then(data => {
        this.setState({ ...this.state, users: data, isLoading: "Not needed" });
      });
  }

  renderUserTable(users) {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Naam</th>
            <th scope="col">Achternaam</th>
            <th scope="col">E-mail</th>
          </tr>
        </thead>
        <tbody>
          {this.state.users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-primary" type="button">
                  Block
                </button>
              </td>
              <td>
                <Link to={`/updateuser/${user.id}`}>
                  <button className="btn btn-primary" type="button">
                    Update
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.renderUserTable(this.state.users);

    return (
      <Container style={{ marginTop: "7em" }}>
        <div className="row">
          <h1>Admin</h1>

          <Link className="nav-link" to={"/register"}>
            <button className="btn btn-primary" type="button">
              Voeg gebruiker toe
            </button>
          </Link>
          {contents}
        </div>
      </Container>
    );
  }
}
