import React, { Component } from "react";
import {
  Button,
  Container,
  List,
  Loader,
  Message,
  Segment,
  Image
} from "semantic-ui-react";
import { connect } from "react-redux";
import _ from "lodash";
import { userActions } from "../../Redux/actions";
import AddToShopingCartHome from "../ShoppingCart/AddToShoppingCartHome";

class FavoritesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: this.props.favorits,
      movies: [],
      isLoading: true
    };
  }

  removeFromFavorite = pid => {
    fetch("/api/favorit/delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        UserId: this.props.user.id,
        ProductId: pid
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ ...this.state, message: data });
        let filteredArray = this.state.movies.filter(item => item.id !== pid);
        this.setState({ ...this.state, movies: filteredArray });
        this.props.dispatch(
          userActions.refreshfavoritesList(this.props.user.id)
        );
      })
      .catch(() => {
        console.log("error");
      });
  };

  componentDidMount() {
    fetch("/api/Product/getshoppingcart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(_.map(this.state.ids, "productId"))
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ ...this.state, movies: data, isLoading: false });
      })
      .catch(() => {
        console.log("error");
      });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.favorits !== prevState.favorits)
      return { ids: nextProps.favorits };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.ids !== this.state.ids) {
      fetch("/api/Product/getshoppingcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(_.map(this.state.ids, "productId"))
      })
        .then(response => response.json())
        .then(data => {
          this.setState({ ...this.state, movies: data, isLoading: false });
        })
        .catch(() => {
          console.log("error");
        });
    }
  }

  render() {
    const { isLoading } = this.state;
    console.log(this.state);

    return (
      <Container style={{ marginTop: "7em" }}>
        <Segment size="massive">
          <List divided relaxed>
            <List.Item>
              <List.Content>
                <List.Header>Favorieten</List.Header>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
        {isLoading ? (
          <Segment>
            <Loader active>Loading</Loader>
          </Segment>
        ) : (
          <List divided verticalAlign="middle">
            {this.state.movies.length === 0 ? (
              <Message
                icon="star"
                header="Je Favorietlijst is leeg!"
                content="Klik op de ster en voeg het product toe."
              />
            ) : (
              ""
            )}
            {this.state.movies.map(item => (
              <List.Item key={item.id}>
                <List.Content floated="right">
                  <AddToShopingCartHome id={item.id} />
                  <Button
                    size="large"
                    color="red"
                    icon="times"
                    onClick={() => this.removeFromFavorite(item.id)}
                  />
                </List.Content>
                <Image avatar src={item.poster} />
                <List.Content>{item.title}</List.Content>
              </List.Item>
            ))}
          </List>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.authentication.user, favorits: state.favorits };
};

export default connect(mapStateToProps)(FavoritesList);
