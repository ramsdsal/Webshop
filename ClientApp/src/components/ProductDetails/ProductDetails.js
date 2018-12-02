import React, { Component } from "react";
import { Container } from "semantic-ui-react";

export class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container style={{ marginTop: "7em" }}>
        <h1>Movie : {this.props.id}</h1>
      </Container>
    );
  }
}
