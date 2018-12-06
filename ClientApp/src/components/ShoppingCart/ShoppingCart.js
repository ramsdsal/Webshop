import React, { Component } from "react";
import {
  Button,
  Container,
  List,
  Image,
  Form,
  Segment,
  Input
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
    return this.state.shoppingcart[obj].qt;
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

  render() {
    console.log(this.state);
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
          {this.state.movies.map(item => (
            <List.Item key={item.id}>
              <List.Content floated="right">
                <Form>
                  <Form.Group widths="equal">
                    <Form.Field control={Button} content="-" />
                    <Form.Field control={Input} value={this.getQt(item.id)} />
                    <Form.Field control={Button} content="+" />
                    <Button color="red" icon="trash" />
                  </Form.Group>
                </Form>
              </List.Content>
              <Image avatar src={item.poster} />
              <List.Content>{item.title}</List.Content>
            </List.Item>
          ))}
        </List>
      </Container>
    );
  }
}
