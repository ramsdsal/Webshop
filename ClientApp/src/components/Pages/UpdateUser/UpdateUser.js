import React, { Component } from "react";
import { Container, Form, Message, Segment, Header, Table, Icon } from "semantic-ui-react";
import "./UpdateUser.css";

export class UpdateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      addresses: {},

      //User
      firstName: "",
      lastName: "",
      birthDate: "",
      email: "",

      //Adres
      street: "",
      city: "",
      country: "",
      zipCode: "",

      //Form validation and server response, Update user
      updateUserError: false,
      userUpdated: false,
      serverUpdateUserResponse: "",
      userFormIsLoading: false,

      //Form validation and server response, Add address
      addAddressError: false,
      addresAdded: false,
      serverAddressResponse: "",
      addressFormIsLoading: false
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
          addresses: user.addresses,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          birthDate: user.birthDate, 
        });
      });
  }

  renderPage() {

    var today = new Date();
    var monthToday = today.getUTCMonth() + 1;
    if (monthToday < 10) {
      monthToday = "0" + monthToday;
    }
    var dayToday = today.getDate();
    if (dayToday < 10) {
      dayToday = "0" + dayToday;
    }

    var currentDate = today.getFullYear() + '-' + (monthToday) + '-' + dayToday;

    return (
      <Container style={{ marginTop: "7em" }}>
        <Header as="h2" attached="top">
          Gebruiker aanpassen
        </Header>
        <Segment>
        <Form 
          onSubmit={this.updateUser}
          loading = {this.state.userFormIsLoading}
          error={this.state.updateUserError}
          success={this.state.userUpdated}
        >
        {
            this.state.updateUserError ? <Message size='large' error 
            header="Gebruiker kon niet geupdate worden" 
            content={this.state.serverUpdateUserResponse}/>
            :
            null
        }
        {
            this.state.userUpdated ? <Message size='large' success 
            header="Gebruiker succesvol aangepast" 
            content={this.state.serverUpdateUserResponse}/>
            : 
            null
        }
          <Form.Group unstackable widths={2}>
            <Form.Input
              required 
              size="massive"
              label="Voornaam"
              placeholder="Voornaam"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            <Form.Input
              required
              size="massive"
              label="Achternaam"
              placeholder="Achternaam"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group unstackable widths={2}>
            <Form.Input
              required
              size="massive"
              label="E-mail"
              placeholder="E-mail"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <Form.Input 
              required 
              label='Geboortedatum' 
              type='date' 
              size='massive' 
              name="birthDate" 
              max= {currentDate}
              min= "1800-07-27"
              value={this.state.dateFrom}
              // value= {"1800-07-06"} //"2011-09-29"
              onChange={this.handleChange} 
            />
          </Form.Group>
          <Form.Button
            color='blue'
            type='submit'
            disabled={
              !this.state.firstName
              || !this.state.lastName
              || !this.state.birthDate
              || !this.state.email
            }
          >
            <Icon name="write" /> Aanpassen
          </Form.Button>
        </Form>
        </ Segment>
        <br />
        <br />
        <br />
        <Header as="h2" attached="top">
          Adres toevoegen
        </Header>
        <Segment>
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
            {this.state.addresses.map((address, index) => {
              return (
                <Table.Row key= {index}
                  positive={index === this.state.addresses.length - 1}
                >
                  <Table.Cell>{address.street}</Table.Cell>
                  <Table.Cell>{address.city}</Table.Cell>
                  <Table.Cell>{address.country}</Table.Cell>
                  <Table.Cell>{address.zipCode}</Table.Cell>
                  <Table.Cell>
                    {" "}
                    {index === this.state.addresses.length - 1 ? (
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
        <Form 
          onSubmit={this.addAddress}
          loading = {this.state.addressFormIsLoading}
          error={this.state.addAddressError}
          success={this.state.addresAdded}
        >
        {
            this.state.addAddressError ? <Message size='large' error 
            header="Adres kon niet toegevoegd worden." 
            content={this.state.serverAddressResponse}/>
            :
            null
        }
        {
            this.state.addresAdded ? <Message size='large' success 
            header="Adres succesvol toegevoegd" 
            content={this.state.serverAddressResponse}/>
            : 
            null
        }
          <Form.Group unstackable widths={2}>
            <Form.Input
              required
              size="massive"
              label="Straat"
              placeholder="Straat"
              name="street"
              onChange={this.handleChange}
            />
            <Form.Input
              required
              size="massive"
              label="Stad"
              placeholder="Stad"
              name="city"
              onChange={this.handleChange}
            />
            <Form.Input
              required
              size="massive"
              label="Land"
              placeholder="Land"
              name="country"
              onChange={this.handleChange}
            />
            <Form.Input
              required
              size="massive"
              label="Postcode"
              placeholder="Postcode"
              name="zipCode"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button
            color='blue'
            type='submit'
            disabled={
              !this.state.street
              || !this.state.city
              || !this.state.country
              || !this.state.zipCode
            }
          >
            <Icon name="plus" /> Toevoegen
          </Form.Button>
        </Form>
        </ Segment>
      </Container>
    );
  }

  addAddress = () => {
    this.setState({...this.state, addressFormIsLoading: true})
    
    var today = new Date();
    var dateFrom =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() + " " + today.getHours()  + ":" + today.getMinutes() + ":" + today.getSeconds();

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
    
    fetch("/api/user/AddUserAddress", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonToSend)
    })
    .then(response => response.json())
    .then(data => {
      
      if (data.addresAdded) {
        var newAddress = {street: this.state.street,
          city: this.state.city,
          country: this.state.country,
          zipCode: this.state.zipCode,
          dateFrom: dateFrom};
        
        var addressesInState = this.state.addresses;
        addressesInState.push(newAddress); 
      }
      
      this.setState({...this.state, serverAddressResponse: data.response, addAddressError: data.isError, addresAdded: data.addresAdded, addressFormIsLoading: false})
    });
  };

  updateUser = () => {
    this.setState({...this.state, userFormIsLoading: true})
    console.log(this.state.birthDate)
    var jsonToSend = {
      id: this.props.userId,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      birthDate: this.state.birthDate,
      email: this.state.email
    };

    fetch("/api/user/updateUser", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonToSend)
    })
    .then(response => response.json())
    .then(data => {
      this.setState({...this.state, serverUpdateUserResponse: data.response, updateUserError: data.isError, userUpdated: data.userUpdated, userFormIsLoading: false})
    });
  };

  handleChange = (e, { name, value }) =>
    this.setState({ [name]: value });

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
