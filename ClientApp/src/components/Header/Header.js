import React, { Component } from "react";
import { Container, Dropdown, Image, Menu, Search } from "semantic-ui-react";

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
            <Menu.Item as="a" header>
              <Image
                size="mini"
                src="/logo.png"
                style={{ marginRight: "1.5em" }}
              />
              Media Mania
            </Menu.Item>
            <Menu.Menu />
            <Menu.Item as="a" header>
              <Search />
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
            <Menu.Item as="a" header>
              SIGNUP
            </Menu.Item>
            <Menu.Menu position="right">
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
            </Menu.Menu>
          </Container>
        </Menu>
      </div>
    );
  }
}
