import * as React from "react";
import { Link } from "react-router-dom";
import "./ProductListItem.css";
import { Button, Card, Image, Grid, Label } from "semantic-ui-react";
import { AddToShopingCartHome } from "../ShoppingCart/AddToShoppingCartHome";

export default class ProductListItem extends React.Component {
  render() {
    const movie = this.props.movieToShow;
    return (
      <Grid.Column>
        <Card>
          <Link to={`/ProductDetails/${movie.id}`}>
            <Image src={movie.poster} />
          </Link>
          <Card.Content>
            <Card.Header>{movie.title}</Card.Header>
            <Card.Meta>
              {movie.year}
              <Card.Content color="black" extra textAlign="right">
                <Label color="orange" size="big">
                  {movie.price} €
                </Label>
              </Card.Content>
            </Card.Meta>
          </Card.Content>
          <Card.Content extra textAlign="right">
            <AddToShopingCartHome id={movie.id} stock={movie.quantity} />
            <Button size="large" icon="heart" />
          </Card.Content>
        </Card>
      </Grid.Column>
    );
  }
}
