import React, { Component } from "react";
import { Grid, Row } from "react-bootstrap";
import Header from "./Header/Header";
import { Footer } from "./Footer";

export class Layout extends Component {
  displayName = Layout.name;

  render() {
    return (
      <Grid fluid>
        <Row>
          <Header />
        </Row>
        <Row>{this.props.children}</Row>
        <Row>
          <Footer />
        </Row>
      </Grid>
    );
  }
}
