import React, { Component } from "react";
import { Container, Form, Message, Segment, Header } from "semantic-ui-react";

const zipcodeRegex = RegExp(/^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i);

export class Register extends Component {
  constructor(props) {
    super(props);
		
		this.state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      
        //Birthday
        birthDate: "",

        street: "",
        city: "",
        country: "",
        zipCode: "",

        //Form validation and server response
        createUserError: false,
        emailSend: false,
        serverResponse: "",
        formIsLoading: false,

        zipcodeError: ""
		};
	}

  sendRegisterUser = () => {
    this.setState({...this.state, formIsLoading: true})

    var today = new Date();
    var dateFrom = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    var jsonToSend = {
			"User":{
				firstName: this.state.firstName,
                lastName: this.state.lastName,
                birthDate: this.state.birthDate,
				email: this.state.email,
				password: this.state.password,
			},
			"Address":{
				street: this.state.street,
				city: this.state.city,
				country: this.state.country,
				zipCode: this.state.zipCode,
				dateFrom: dateFrom
			},
    };

    fetch("/api/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonToSend)
    })
    .then(response => response.json())
    .then(data => {
      this.setState({...this.state, serverResponse: data.response, createUserError: data.isError, emailSend: data.emailSend, formIsLoading: false})
    });
  };

  handleChange = (e, { name, value }) =>
  {
    this.setState({ [name]: value });
  }

  
  handleZipCodeChange = (e, { name, value }) =>
  {
    var zipcode = zipcodeRegex.test(value)
    ? ""
    : "invalid postcode, voorbeeld: 2133AA";
    this.setState({ [name]: value, zipcodeError: zipcode });
  }

  render() {
    var errorStyle = {
        color: 'red',
        fontSize: 13
      };

    var today = new Date();

    var monthToday = today.getUTCMonth() + 1;
    if (monthToday < 10) {
      monthToday = "0" + monthToday;
    }
    var dayToday = today.getDate();
    if (dayToday < 10) {
      dayToday = "0" + dayToday;
    }

    var currentDate = today.getFullYear() + '-' + monthToday + '-' + dayToday;

    return (
			<Container style={{ marginTop: "7em" }}>
                <Header as="h2" attached="top">
                     Registreren
                </Header>
                <Segment>
                <Form
                    loading = {this.state.formIsLoading}
                    onSubmit={this.sendRegisterUser}
                    error={this.state.createUserError}
                    success={this.state.emailSend}
                >
                {
                    this.state.createUserError ? <Message size='large' error 
                    header="Account kon niet aangemaakt worden" 
                    content={this.state.serverResponse}/>
                    :
                    null
                }
                {
                    this.state.emailSend ? <Message size='large' success 
                    header="Validatie email verstuurd!" 
                    content={this.state.serverResponse}/>
                    : 
                    null
                }
                    <Form.Group unstackable widths={2}>
                        <Form.Input
                            required
                            size='massive'
                            label='Voornaam'
                            placeholder='Voornaam'
                            name='firstName'
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            required
                            size='massive'
                            label='Achternaam'
                            placeholder='Achternaam'
                            name='lastName'
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
                            onChange={this.handleChange} 
                        />
                    </Form.Group>
                    <Form.Group unstackable widths={2}>
                        <Form.Input
                            required
                            size='massive'
                            label='E-mail'
                            placeholder='E-mail'
                            name='email'
                            onChange={this.handleChange}
                            type="email"
                        />
                        <Form.Input
                            required
                            size='massive'
                            label='Wachtwoord'
                            placeholder='Wachtwoord'
                            name='password'
                            type='password'
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group unstackable widths={2}>
                        <Form.Input
                            required
                            size='massive'
                            label='Straat'
                            placeholder='Straat'
                            name='street'
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            required
                            size='massive'
                            label='Stad'
                            placeholder='Stad'
                            name='city'
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            required
                            size='massive'
                            label='Land'
                            placeholder='Land'
                            name='country'
                            onChange={this.handleChange}
                        />
                        <Form.Input error={this.state.zipcodeError.length > 0}
                            required
                            label='Postcode'
                            placeholder="3244PC"
                            onChange={this.handleZipCodeChange}
                            size="massive"
                            name='zipCode'
                        />
                    </Form.Group>
                    {this.state.zipcodeError.length > 0 ? (
                        <span style={errorStyle}>
                            {"Verkeerde postcode ingevuld voorbeeld: 1432AD"}
                        </span>
                        ) : (
                        ""
                        )}		
                    <Form.Button 
                    content='Submit' 
                    color='blue'
                    type='submit'
                    disabled={
                        !this.state.email
                        || !this.state.firstName
                        || !this.state.lastName
                        || !this.state.password
                        || !this.state.street
                        || !this.state.city
                        || !this.state.country
                        || !this.state.zipCode
                        || !this.state.birthDate
                        || this.formIsLoading
                        || this.state.zipcodeError !== ""
                     }
                    />
                </Form>
                </ Segment>
			</ Container>
    );
  }
}