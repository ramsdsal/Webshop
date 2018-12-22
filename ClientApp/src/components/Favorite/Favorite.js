import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";

class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieId: this.props.id
    };
  }

  render() {
    return (
      <Button
        disabled={this.props.favorits.some(
          item => item.productId === this.state.movieId
        )}
        icon="star"
        size="large"
      />
    );
  }
}

const mapStateToProps = state => {
  return { user: state.authentication.user, favorits: state.favorits };
};

export default connect(mapStateToProps)(Favorite);
