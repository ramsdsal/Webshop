import React, { Component } from "react";
import { Container, Dropdown, Image, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { SearchMovie } from "./SearchMovie";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Menu fixed="top" inverted stackable>
          <Container>
            <Menu.Item as={Link} to="/fetchdata">
              <Image
                size="mini"
                src="/logo.png"
                style={{ marginRight: "1.5em" }}
              />
              Media Mania
            </Menu.Item>
            <Menu.Menu position="right" />
            <Menu.Item as="a" header position="middle">
              <SearchMovie />
            </Menu.Item>
            <Menu.Item as="a" header>
              Home
            </Menu.Item>
            <Menu.Item as="a" header>
              WINKELWAGEN(1)
            </Menu.Item>
            <Menu.Item as="a" header>
              LOGIN
            </Menu.Item>
            <Menu.Item as={Link} to="/register">
              SIGNUP
            </Menu.Item>

            <Dropdown text="Ramiro" pointing className="link item">
              <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Header Item</Dropdown.Header>
                <Dropdown.Item>
                  <i className="dropdown icon" />
                  <span className="text">Submenu</span>
                  <Dropdown.Menu>
                    <Dropdown.Item>List Item</Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Menu>
      </div>
    );
  }
}
