import * as React from "react";
import { Link } from "react-router-dom";
// import { Product } from "ClientApp/Models/Product";
import "./ProductListItem.css";
import { Button, Card, Icon, Image, Grid, Label } from "semantic-ui-react";

export default class ProductListItem extends React.Component
{
  constructor(props) 
  {
    super(props);
  }

 render() {
    const movie = this.props.movieToShow;
    function addToCart(item) 
    {

      let items = [];

      if (!window.localStorage.getItem("cart")) {
        window.localStorage.setItem("cart", "[]");
      }

      items = JSON.parse(window.localStorage.getItem("cart") || '[]');
      let test = items.push(item);
      window.localStorage.setItem("cart", JSON.stringify(items));

    }

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
