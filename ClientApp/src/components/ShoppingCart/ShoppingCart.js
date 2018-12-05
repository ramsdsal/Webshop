import React, { Component } from "react";
import { Container, Label, Segment, List } from "semantic-ui-react";

export class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: {},
      shoppingcart: []
    };
  }

  componentDidMount() {
    this.getShoppingCart();
  }

  getShoppingCart = () => {
    let items = JSON.parse(window.localStorage.getItem("cart") || "[]");
    this.setState({ ...this.state, shoppingcart: items });
  };

  render() {
    return (
      <Container style={{ marginTop: "7em" }}>
        <Segment inverted>
          <List divided inverted relaxed>
            <List.Item>
              <List.Content>
                <List.Header>Snickerdoodle</List.Header>
                An excellent companion
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>Poodle</List.Header>A poodle, its pretty basic
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>Paulo</List.Header>
                He's also a dog
              </List.Content>
            </List.Item>
          </List>
        </Segment>
        hello
        <div>
          {this.state.shoppingcart.map(item => (
            <Label> {item.id} </Label>
          ))}
        </div>
        ;
      </Container>
    );
  }
}
