import * as React from "react";
import { Link } from "react-router-dom";
import "./ProductListItem.css";
import { Button, Card, Icon, Image, Grid, Label } from "semantic-ui-react";

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
                <Card.Header>{movie.title} ({movie.year})</Card.Header>
              </Card.Content>
              <Card.Content extra textAlign="right">

                  <Card.Content color="black" extra textAlign="left"> 
                    <Label color="black">Price: {movie.price}</ Label>
                  </Card.Content>    

                  <Button>
                  <Icon name="cart" />
                </Button>
                <Button>
                  <Icon name="heart" />
                </Button>

              </Card.Content>
            </Card>
        </Grid.Column>
    );
  }
}
