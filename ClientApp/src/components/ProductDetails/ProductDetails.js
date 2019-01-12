import React, { Component } from "react";
import {
  Button,
  Container,
  Header,
  Icon,
  Item,
  Label,
  List,
  Modal
} from "semantic-ui-react";
import AddToShopingCart from "../ShoppingCart/AddToShoppingCart";
import YouTube from "react-youtube";
import Favorite from "../Favorite/Favorite";
import "./ProductDetails.css";

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
    const YoutubeOpts = {
      height: "495",
      width: "880",
      playerVars: {
        autoplay: 1
      }
    };

    return (
      <Container style={{ marginTop: "7em" }}>
        <Item.Group>
          <Item>
            <Item.Image size="medium" src={movie.poster} />
            <Item.Content>
              <Item.Header as="a" size="big">
                {movie.title} ({movie.year})
              </Item.Header>
              <Item.Meta>
                <List horizontal size="large">
                  <List.Item>{movie.categories}</List.Item>
                  <List.Item>{movie.runTime} minuten.</List.Item>
                  <List.Item>
                    <Label>{movie.ageRating}</Label>
                    <Label>HD</Label>
                    <Label>5.1</Label>
                  </List.Item>
                  <List.Item>
                    <Modal
                      trigger={
                        <Button
                          icon
                          labelPosition="right"
                          onClick={this.watchTrailer}
                        >
                          <Icon name="video" />
                          Bekijk de trailer
                        </Button>
                      }
                      closeIcon
                      centered
                    >
                      <Header icon="video" content={movie.title} />
                      <Modal.Content>
                        <YouTube
                          videoId={movie.trailerUrl}
                          opts={YoutubeOpts}
                        />
                      </Modal.Content>
                    </Modal>
                  </List.Item>
                  <List.Item>
                    <Favorite id={movie.id} />
                  </List.Item>
                </List>
              </Item.Meta>
              <Item.Description>{movie.description}</Item.Description>
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
