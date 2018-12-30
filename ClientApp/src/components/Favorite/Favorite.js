import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { userActions } from "../../Redux/actions";

class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieId: this.props.id,
      added: false
    };
  }

  setFavorit = () => {
    var jsonToSend = {
      UserId: this.props.user.id,
      ProductId: this.state.movieId
    };

    fetch("/api/favorit/set", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonToSend)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          ...this.state,
          response: data.response,
          error: data.isError,
          added: true
        });
        this.props.dispatch(
          userActions.refreshfavoritesList(this.props.user.id)
        );
      });
  };

  render() {
    return (
      <Button
        disabled={
          this.props.favorits.some(
            item => item.productId === this.state.movieId
          ) || this.state.added
        }
        icon="star"
        size="large"
        color={
          this.props.favorits.some(
            item => item.productId === this.state.movieId
          ) || this.state.added
            ? "yellow"
            : "grey"
        }
        onClick={this.setFavorit}
      />
    );
  }
}

const mapStateToProps = state => {
  return { user: state.authentication.user, favorits: state.favorits };
};

export default connect(mapStateToProps)(Favorite);
