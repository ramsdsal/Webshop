import React, { Component } from "react";
import { Input, Button } from "semantic-ui-react";

class AddToShopingCart extends Component {
  constructor(props) {
    super(props);
    this.state = { movieId: this.props.id, amount: 1 };
  }

  Addamount = () => {
    this.setState({ ...this.state, amount: this.state.amount + 1 });
  };
  Subctractamount = () => {
    if (this.state.amount > 1)
      this.setState({ ...this.state, amount: this.state.amount - 1 });
  };

  AddToCart = () => {
    let items = [];
    let item = { id: this.state.movieId, qt: this.state.amount };

    if (!window.localStorage.getItem("cart")) {
      window.localStorage.setItem("cart", "[]");
    }

    items = JSON.parse(window.localStorage.getItem("cart") || "[]");
    let test = items.push(item);
    window.localStorage.setItem("cart", JSON.stringify(items));
  };

  render() {
    const { amount } = this.state;
    return (
      <div>
        <Button onClick={this.Subctractamount} size="large">
          -
        </Button>
        <Input width={1} value={amount} />
        <Button onClick={this.Addamount} size="large">
          +
        </Button>
        <Button size="large" onClick={this.AddToCart}>
          Toevoegen
        </Button>
      </div>
    );
  }
}

export default AddToShopingCart;
