import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";

class test extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container style={{ marginTop: "7em" }}>
        {" "}
        <h1>{this.props.user.id}</h1>;
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authentication.user
  };
};

export default connect(mapStateToProps)(test);
