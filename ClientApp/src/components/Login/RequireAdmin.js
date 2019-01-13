import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";

export default Composedcomponent => {
  class RequireAuth extends Component {
    render() {
      const { isAdmin } = this.props;
      if (isAdmin) return <Composedcomponent {...this.props} />;
      return (
        <Container style={{ marginTop: "7em" }}>
          <h1>JE MOET ADMIN ZIJN</h1>
        </Container>
      );
    }
  }
  function mapStateToProps(state) {
    return {
      isAdmin: state.authentication.user.role
    };
  }

  return connect(mapStateToProps)(RequireAuth);
};
