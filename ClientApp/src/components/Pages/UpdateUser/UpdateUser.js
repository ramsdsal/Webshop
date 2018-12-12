import React, { Component } from "react";
import { Container, Form, Table, Icon } from "semantic-ui-react";
import "./UpdateUser.css";

export class UpdateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      user: {},

      //User
      firstName: "",
      lastName: "",
      birthDate: "09-04-1981",
      email: "",

      //Birthday
      day: "",
      month: "",
      year: ""
    };
  }

  componentDidMount() {
    fetch("/api/user/GetUserById/" + this.props.userId)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const user = data[0];
        this.setState({
          ...this.state,
          isLoading: false,
          user: user,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          day: user.day,
          month: user.month,
          year: user.year
        });
      });
  }

  renderPage() {
    return (
      <Container style={{ marginTop: "7em" }}>
        <Form onSubmit={this.updateUser} id="myForm">
          <Form.Group unstackable widths={2}>
            <Form.Input
              size="massive"
              label="Voornaam *"
              placeholder="Voornaam"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            <Form.Input
              size="massive"
              label="Achternaam *"
              placeholder="Achternaam"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group unstackable widths={2}>
            <Form.Input
              size="massive"
              label="E-mail *"
              placeholder="E-mail"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group unstackable widths={3}>
            <Form.Input
              size="massive"
              label="Dag *"
              placeholder="Dag"
              name="day"
              value={this.state.day}
              onChange={this.handleChange}
            />
            <Form.Input
              size="massive"
              label="Maand"
              placeholder="Maand"
              name="month"
              value={this.state.month}
              onChange={this.handleChange}
            />
            <Form.Input
              size="massive"
              label="Jaar *"
              placeholder="Jaar"
              name="year"
              value={this.state.year}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button
            floated="right"
            icon
            labelPosition="left"
            primary
            size="big"
            content="Aanpassen"
          >
            <Icon name="write" /> Aanpassen
          </Form.Button>
        </Form>
        <br />
        <br />
        <br />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Straat</Table.HeaderCell>
              <Table.HeaderCell>Stad</Table.HeaderCell>
              <Table.HeaderCell>Land</Table.HeaderCell>
              <Table.HeaderCell>Postcode</Table.HeaderCell>
              <Table.HeaderCell width={1}>Huidig </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.user.addresses.map((address, index) => {
              return (
                <Table.Row
                  positive={index === this.state.user.addresses.length - 1}
                >
                  <Table.Cell>{address.street}</Table.Cell>
                  <Table.Cell>{address.city}</Table.Cell>
                  <Table.Cell>{address.country}</Table.Cell>
                  <Table.Cell>{address.zipCode}</Table.Cell>
                  <Table.Cell>
                    {" "}
                    {index === this.state.user.addresses.length - 1 ? (
                      <Icon color="green" name="checkmark" size="large" />
                    ) : (
                      ""
                    )}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
        <Form onSubmit={this.addAddress} id="myForm">
          <Form.Group unstackable widths={2}>
            <Form.Input
              size="massive"
              label="Straat *"
              placeholder="Straat"
              name="street"
              onChange={this.handleChange}
            />
            <Form.Input
              size="massive"
              label="Stad *"
              placeholder="Stad"
              name="city"
              onChange={this.handleChange}
            />
            <Form.Input
              size="massive"
              label="Land *"
              placeholder="Land"
              name="country"
              onChange={this.handleChange}
            />
            <Form.Input
              size="massive"
              label="Postcode *"
              placeholder="Postcode"
              name="zipCode"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button
            floated="right"
            icon
            labelPosition="left"
            primary
            size="big"
            content="Toevoegen"
          >
            <Icon name="plus" /> Toevoegen
          </Form.Button>
        </Form>
      </Container>
    );
  }

  addAddress = () => {
    var today = new Date();
    var dateFrom =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    var jsonToSend = {
      Address: {
        street: this.state.street,
        city: this.state.city,
        country: this.state.country,
        zipCode: this.state.zipCode,
        dateFrom: dateFrom
      },
      UserId: this.props.userId,
      Current: 1
    };

    console.log(jsonToSend);

    fetch("/api/user/AddUserAddress", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonToSend)
    });
  };

  updateUser = () => {
    var jsonToSend = {
      id: this.state.user.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      birthDate:
        this.state.year + "-" + this.state.month + "-" + this.state.day,
      email: this.state.email
    };

    fetch("/api/user/updateUser", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonToSend)
    });
  };

  handleChange = (e, { name, value }) =>
    this.setState({ [name]: value }, console.log(this.state));

  render() {
    const contents = this.state.isLoading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderPage()
    );

    return contents;
  }
}
