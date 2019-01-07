import React, { Component } from "react";
import "./UserProfile.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Grid,
  Segment,
  Header,
  Menu,
  Form,
  Input
} from "semantic-ui-react";

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      activeItem: "Gegevens",

      userId: 0,
      userName: "",
      userLastName: "",
      userMail: "",
      userBirthDate: ""
    };
  }

  componentDidMount() {
    fetch("/api/User/2")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const user = data[0];
        console.log(user);
        this.setState({
          ...this.state,
          isLoading: false,
          userId: user.id,
          userName: user.firstName,
          userLastName: user.lastName,
          userMail: user.email,
          userBirthDate: user.birthDate
        });
      });
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const PassLink = "/password/" + this.state.userId;
    console.log("id", this.props.user.id);
    return (
      <Container style={{ marginTop: "7em" }}>
        <Grid>
          <Grid.Column width={4}>
            <Header as="h2" attached="top">
              Instellingen
            </Header>
            <Menu fluid vertical>
              <Segment attached>
                <Menu.Item
                  name="Gegevens"
                  active={activeItem === "Gegevens"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="Wachtwoord wijzigen"
                  as={Link}
                  to={PassLink}
                  active={activeItem === "Wachtwoord wijzigen"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="Bestellingen"
                  as={Link}
                  to="/orderhistory"
                  active={activeItem === "Bestellingen"}
                  onClick={this.handleItemClick}
                />
              </Segment>
            </Menu>
          </Grid.Column>
          <Grid.Column stretched width={12}>
            <Header as="h2" attached="top">
              {this.state.activeItem}
            </Header>
            <Segment attached>
              <Form>
                <Form.Group>
                  <Form.Field>
                    <h6>Voornaam</h6>
                    <Input placeholder={this.state.userName} readOnly />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field>
                    <h6>Achternaam</h6>
                    <Input placeholder={this.state.userLastName} readOnly />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field>
                    <h6>Geboortedatum</h6>
                    <Input
                      type="text"
                      onFocus={this._onFocus}
                      placeholder={this.state.userBirthDate}
                      readOnly
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field>
                    <h6>E-mail</h6>
                    <Input placeholder={this.state.userMail} readOnly />
                  </Form.Field>
                </Form.Group>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authentication.user
  };
};

export default connect(mapStateToProps)(UserProfile);
