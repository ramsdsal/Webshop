import React, { Component } from "react";
import { Form, Icon } from "semantic-ui-react";

class AddToShopingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieId: this.props.id,
      amount: 1,
      stock: this.props.stoc,
      added: false
    };
  }

  Addamount = () => {
    if (this.state.amount < this.state.stock)
      this.setState({ ...this.state, amount: this.state.amount + 1 });
    else console.log("LIMIT");
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

    let obj = items.findIndex(x => x.id === this.state.movieId);

    if (obj === -1) items.push(item);
    else items[obj] = { id: this.state.movieId, qt: this.state.amount };
    window.localStorage.setItem("cart", JSON.stringify(items));
    this.setState({ ...this.state, added: true });
  };

  IsAdded = () => {
    let items = JSON.parse(window.localStorage.getItem("cart") || "[]");
    let obj = items.findIndex(x => x.id === this.state.movieId);
    console.log(items);
    if (obj === -1) return false;
    return true;
  };

  render() {
    const { amount, added } = this.state;
    return (
      <div>
        {this.IsAdded() || added ? (
          "Deze film is al in de winkelwagen toegevoegd, click op winkelwagen om de hoeveelheid te kunnen aanpassen"
        ) : (
          <Form>
            <Form.Group>
              <Form.Button onClick={this.Subctractamount} size="large">
                -
              </Form.Button>

              <Form.Input width={1} value={amount} />

              <Form.Button onClick={this.Addamount} size="large">
                +
              </Form.Button>
              <Form.Button size="large" onClick={this.AddToCart}>
                <Icon name="shopping cart" />
                Toevoegen
              </Form.Button>
            </Form.Group>
          </Form>
        )}
      </div>
    );
  }
}

export default AddToShopingCart;
