import React, { Component } from "react";
import { Container, Icon, Item, Label } from "semantic-ui-react";
import AddToShopingCart from "../ShoppingCart/AddToShoppingCart";

export class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { movie: {}, isLoading: true, id: this.props.id };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      this.setState({
        ...this.state,
        id: nextProps.id,
        movie: {}
      });
      this.getMovie(nextProps.id);
    }
  }
  getMovie(id) {
    fetch("/api/Product/" + id)
      .then(response => response.json())
      .then(data => {
        this.setState({
          ...this.state,
          movie: data[0],
          isLoading: false
        });
      });
  }

  componentDidMount() {
    this.getMovie(this.state.id);
  }

  renderMovie(movie) {
    return (
      <Container style={{ marginTop: "7em" }}>
        {console.log(this.state.id)}
        <Item.Group>
          <Item>
            <Item.Image size="medium" src={movie.poster} />
            <Item.Content>
              <Item.Header as="a" size="big">
                {movie.title}
              </Item.Header>{" "}
              [{movie.year}]<Item.Meta>{movie.categories}</Item.Meta>
              <Item.Description>{movie.description}</Item.Description>
              <Item.Extra>
                {movie.runTime} minuten. PG: {movie.ageRating}
              </Item.Extra>
              <Item.Extra>
                <Label
                  color={movie.quantity < 1 ? "red" : "green"}
                  size="large"
                >
                  <Icon color="black" name="shopping basket" />
                  {movie.quantity} {movie.quantity < 1 ? "Niet in " : "In "}
                  voorraad
                </Label>
              </Item.Extra>
              <Item.Description position="right">
                <AddToShopingCart id={movie.id} stock={movie.quantity} />
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
        <h1>Movie : {movie.title}</h1>
      </Container>
    );
  }

  render() {
    const contents = this.state.isLoading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderMovie(this.state.movie)
    );

    return contents;
  }
}
