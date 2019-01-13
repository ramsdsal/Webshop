import React, { Component } from "react";
import { connect } from "react-redux";
import { history } from "../../Redux/helpers";
import { alertActions } from "../../Redux/actions";

export default Composedcomponent => {
  class RequireAuth extends Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        history.push("/login");
        this.props.dispatch(alertActions.error("Unauthorized"));
        setTimeout(() => {
          this.props.dispatch(alertActions.clear());
        }, 5000);
      }
    }

    render() {
      const { isAuthenticated } = this.props;
      if (isAuthenticated) return <Composedcomponent {...this.props} />;
      return "";
    }
  }
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.authentication.loggedIn
    };
  }

  return connect(mapStateToProps)(RequireAuth);
};
