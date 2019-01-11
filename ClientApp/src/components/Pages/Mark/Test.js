import React, { Component } from "react";
import { connect } from "react-redux";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ""
    };
  }

  componentWillReceiveProps(prevProps) {
    console.log("YUPI");
    if (this.props.user !== prevProps.user) {
      this.setState({
        ...this.state,
        id: this.props.user.id
      });
    }
  }

  render() {
    console.log(this.state);
    return <div>{this.state.id}}</div>;
  }
}
const mapStateToProps = state => {
  return { user: state.authentication.user };
};
export default connect(mapStateToProps)(Test);
