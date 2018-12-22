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
    window.location.reload(true);
  };
  render() {
    return (
      <div>
        <Menu fixed="top" inverted stackable>
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
              WINKELWAGEN
              <Label color="red">{this.props.counter}</Label>
            </Menu.Item>
            {this.props.user ? (
              <Menu.Item as={Link} to="/">
                <Icon name="star" />
                FAVORIETEN{" "}
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
                  <Dropdown.Item>
                    <Icon name="user circle outline" />
                    Profiel bekijken
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/shoppingcart">
                    <Icon name="shop" position="rigth" />
                    Winkelwagen <Label>{this.props.counter}</Label>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Icon name="heart" />
                    Favorieten <Label>{this.props.favorites.length}</Label>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Icon name="clipboard check" />
                    Aankoop lijst
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    <Icon name="options" />
                    <Dropdown text="Admin" direction="left">
                      <Dropdown.Menu>
                        <Dropdown.Item as={Link} to={"/manageusers"}>
                          Users manage
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to={"/manageproducts"}>
                          Products manage
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to={"/statistics"}>
                          Statistics
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Dropdown.Item>
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
