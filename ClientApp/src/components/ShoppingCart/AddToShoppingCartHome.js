import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";

class AddToShopingCartHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieId: this.props.id,
      amount: 1,
      stock: this.props.stock,
      added: false
    };
  }
  componentWillMount() {
    this.IsAdded();
  }

  AddToCart = () => {
    let items = [];
    let item = { id: this.state.movieId, qt: this.state.amount };

    if (!window.localStorage.getItem("cart")) {
      window.localStorage.setItem("cart", "[]");
    }
    items = JSON.parse(window.localStorage.getItem("cart") || "[]");
    items.push(item);
    window.localStorage.setItem("cart", JSON.stringify(items));
    this.setState({ ...this.state, added: true });
    this.props.dispatch({ type: "CART_COUNTER_UPDATE" });
  };

  IsAdded = () => {
    let items = JSON.parse(window.localStorage.getItem("cart") || "[]");
    let obj = items.findIndex(x => x.id === this.state.movieId);
    if (obj !== -1) this.setState({ ...this.state, added: true });
  };

  render() {
    const { added } = this.state;
    return (
      <Button
        disabled={added}
        onClick={this.AddToCart}
        icon="shop"
        size="large"
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCart: () => {
      dispatch({ type: "CART_COUNTER_UPDATE" });
    }
  };
};
export default connect(mapDispatchToProps)(AddToShopingCartHome);
