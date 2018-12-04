import React, { Component } from "react";
import { Container, Form } from "semantic-ui-react";
import "./Login.css";

//State: username: string && password: string
export class Login extends Component
{
  constructor()
  {
    super();
    this.state = { username: "", password: "" };
  }
  
  render() {
    return (
      <div className="container">
        <h3>Log in op je account</h3>
        <form>
          <div className="form-group">
            <h5>Email address</h5>
            <input
              type="Email"
              className="form-control"
              id="email"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <h5>Wachtwoord</h5>
            <div className="logintextbox">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Wachtwoord"
              />
            </div>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Inloggen
            </button>
            <a type="link" href="#">
              Wachtwoord vergeten?
            </a>
          </div>
        </form>
      </div>
    );
  }
}
