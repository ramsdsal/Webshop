import React, { Component } from "react";
import {
  Container,
  Dropdown,
  Image,
  Menu,
  Label,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { SearchMovie } from "./SearchMovie";
import { connect } from "react-redux";
import { userActions } from "../../Redux/actions";
import { history } from "../../Redux/helpers";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.props.dispatch(userActions.remenber(user));
    }
  }
  logout = () => {
    this.props.dispatch(userActions.logout());
    history.push("/");
  };
  render() {
    return (
      <div>
        <Menu size="massive" fixed="top" inverted stackable>
          <Container>
            <Menu.Item as={Link} to="/">
              <Image
                size="mini"
                src="MM-logo.png"
                style={{ marginRight: "1.5em" }}
              />
              Media Mania
            </Menu.Item>
            <Menu.Menu position="right" />
            <Menu.Item as="a" header>
              <SearchMovie />
            </Menu.Item>
            <Menu.Item as={Link} to="/">
              Home
            </Menu.Item>
            <Menu.Item as={Link} to="/shoppingcart">
              <Icon name="shop" />
              Winkelwagen
              <Label color="red">{this.props.counter}</Label>
            </Menu.Item>
            {this.props.user ? (
              <Menu.Item as={Link} to="/favoriteslist">
                <Icon name="star" />
                Favorieten{" "}
                <Label color="red">{this.props.favorites.length}</Label>
              </Menu.Item>
            ) : (
              ""
            )}

            {!this.props.user ? (
              <Menu.Item as={Link} to="/login">
                LOGIN
              </Menu.Item>
            ) : (
              ""
            )}
            {!this.props.user ? (
              <Menu.Item as={Link} to="/register">
                SIGNUP
              </Menu.Item>
            ) : (
              ""
            )}

            {this.props.user ? (
              <Dropdown
                text={this.props.user.firstName}
                pointing
                className="link item"
              >
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/userprofile">
                    <Icon name="user circle outline" />
                    Profiel bekijken
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  {this.props.user.role === "admin" ? (
                    <Dropdown.Item>
                      <Icon name="options" />
                      <Dropdown text="Admin" direction="left">
                        <Dropdown.Menu>
                          <Dropdown.Item as={Link} to={"/manageusers"}>
                            Gebruiker beheer
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to={"/manageproducts"}>
                            Product beheer
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to={"/manageorders"}>
                            Bestelling beheer
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to={"/managediscounts"}>
                            Korting beheer
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to={"/statistics"}>
                            Statistieken
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Dropdown.Item>
                  ) : (
                    ""
                  )}
                  <Dropdown.Item as={Link} onClick={this.logout} to={"/"}>
                    <Icon name="sign out alternate" />
                    Uitloggen
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              ""
            )}
          </Container>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authentication.user,
    counter: state.cart.counter,
    favorites: state.favorits
  };
};

export default connect(mapStateToProps)(Header);
