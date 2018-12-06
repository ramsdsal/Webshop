import React, { Component } from "react";
import {
  Button,
  Container,
  List,
  Image,
  Form,
  Segment,
  Input,
  Message
} from "semantic-ui-react";
import _ from "lodash";

export class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      shoppingcart: [],
      index: []
    };
  }

  componentWillMount() {
    this.getShoppingCartFromLocal();
  }

  componentDidMount() {
    this.getShoppingCartFromDb();
  }

  getShoppingCartFromLocal = () => {
    let items = JSON.parse(window.localStorage.getItem("cart") || "[]");
    let result = _.map(items, "id");
    this.setState({ ...this.state, shoppingcart: items, index: result });
  };

  getQt = id => {
    let obj = this.state.shoppingcart.findIndex(x => x.id === id);
    if (obj !== -1) return this.state.shoppingcart[obj].qt;

    return;
  };

  getShoppingCartFromDb = () => {
    fetch("/api/Product/getshoppingcart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.index)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ ...this.state, movies: data });
      })
      .catch(() => {
        console.log("error");
      });
  };

  addAmount = (id, op, max) => {
    let items = this.state.shoppingcart;
    let index = items.findIndex(x => x.id === id);
    let obj = items[index];

    switch (op) {
      case "add":
        if (obj.qt < max) {
          obj.qt = obj.qt + 1;
          items[index] = obj;
          this.setState({ ...this.state, shoppingcart: items });
          localStorage.setItem("cart", JSON.stringify(items));
        }
        break;
      case "minus":
        if (obj.qt > 1) {
          obj.qt = obj.qt - 1;
          items[index] = obj;
          this.setState({ ...this.state, shoppingcart: items });
          localStorage.setItem("cart", JSON.stringify(items));
        }
        break;
      default:
        break;
    }
  };
  delete = id => {
    let items = this.state.shoppingcart;
    let items1 = this.state.movies;
    let index = items.findIndex(x => x.id === id);
    let index1 = items1.findIndex(x => x.id === id);
    items.splice(index, 1);
    items1.splice(index1, 1);
    localStorage.setItem("cart", JSON.stringify(items));
    this.setState({
      ...this.state,
      shoppingcart: items,
      index: _.map(items, "id"),
      movies: items1
    });
  };

  render() {
    return (
      <Container style={{ marginTop: "7em" }}>
        <Segment inverted>
          <List divided inverted relaxed>
            <List.Item>
              <List.Content>
                <List.Header>Winkelwagen</List.Header>
              </List.Content>
            </List.Item>
          </List>
        </Segment>

        <List divided verticalAlign="middle">
          {this.state.movies.length === 0 ? (
            <Message
              icon="shop"
              header="Je winkelwagen is leeg!"
              content="Blijven winkelen"
            />
          ) : (
            ""
          )}
          {this.state.movies.map(item => (
            <List.Item key={item.id}>
              <Image avatar src={item.poster} />
              {item.title}
              <List floated="right" horizontal divided size="big">
                <List.Item>In voorraad: {item.quantity} stuk(s).</List.Item>
                <List.Item>Prijs: {item.price}€</List.Item>
                <List.Item>
                  Totaal: {item.price * this.getQt(item.id)}€
                </List.Item>
                <List.Item>
                  <Form>
                    <Form.Group widths="equal">
                      <Form.Field
                        control={Button}
                        content="-"
                        onClick={() =>
                          this.addAmount(item.id, "minus", item.quantity)
                        }
                        disabled={this.getQt(item.id) === 1 ? true : false}
                      />
                      <Form.Field control={Input} value={this.getQt(item.id)} />
                      <Form.Field
                        control={Button}
                        content="+"
                        onClick={() =>
                          this.addAmount(item.id, "add", item.quantity)
                        }
                        disabled={
                          this.getQt(item.id) === item.quantity ? true : false
                        }
                      />
                      <Button
                        color="red"
                        icon="trash"
                        onClick={() => this.delete(item.id)}
                      />
                    </Form.Group>
                  </Form>
                </List.Item>
              </List>
            </List.Item>
          ))}
        </List>
        <Segment inverted>
          <List divided inverted relaxed>
            <List.Item>
              <List.Content floated="right">
                <List.Header>Subtotaal: €</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content floated="right">
                <List.Header>Discount: 10%</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content floated="right">Totaal: 270€</List.Content>
            </List.Item>
            <List.Item>
              <List.Content floated="right">
                <Button>Checkout</Button>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      </Container>
    );
  }
}
