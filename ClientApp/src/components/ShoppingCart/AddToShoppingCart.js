import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import { connect } from "react-redux";

class AddToShopingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieId: this.props.id,
      amount: 1,
      stock: this.props.stock
    };
  }
  componentWillMount() {
    this.IsAdded();
  }

  Addamount = () => {
    if (this.state.amount < this.state.stock)
      this.setState({
        ...this.state,
        amount: this.state.amount + 1
      });
    else console.log("LIMIT");
  };
  Subctractamount = () => {
    if (this.state.amount > 1)
      this.setState({
        ...this.state,
        amount: this.state.amount - 1
      });
  };

  AddToCart = () => {
    let items = [];
    let item = { id: this.state.movieId, qt: this.state.amount };

    if (!window.localStorage.getItem("cart")) {
      window.localStorage.setItem("cart", "[]");
    }
    items = JSON.parse(window.localStorage.getItem("cart") || "[]");
    let obj = items.findIndex(x => x.id === this.state.movieId);
    if (obj === -1) items.push(item);
    else items[obj] = { id: this.state.movieId, qt: this.state.amount };
    window.localStorage.setItem("cart", JSON.stringify(items));
    this.setState({ ...this.state, added: true });
    this.props.dispatch({ type: "CART_COUNTER_UPDATE" });
  };

  IsAdded = () => {
    let items = JSON.parse(window.localStorage.getItem("cart") || "[]");
    let obj = items.findIndex(x => x.id === this.state.movieId);
    if (obj !== -1) this.setState({ ...this.state, amount: items[obj].qt });
  };

  render() {
    const { amount } = this.state;

    return (
      <Form>
        <Form.Group>
          <Form.Button onClick={this.Subctractamount} size="large">
            -
          </Form.Button>

          <Form.Input width={1} value={amount} />

          <Form.Button onClick={this.Addamount} size="large">
            +
          </Form.Button>

          <Button size="large" onClick={this.AddToCart} icon="shop" />
        </Form.Group>
      </Form>
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
export default connect(mapDispatchToProps)(AddToShopingCart);
