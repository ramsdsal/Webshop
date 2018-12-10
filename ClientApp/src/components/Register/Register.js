import React, { Component } from "react";
import { Container, Form, Message } from "semantic-ui-react";

export class Register extends Component {
  constructor(props) {
    super(props);
		
		this.state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      
        //Birthday
        day: "",
        month:"", 
        year: "",

        street: "",
        city: "",
        country: "",
        zipCode: "",

        //Form validation and server response
        createUserError: false,
        emailSend: false,
        serverResponse: ""
		};
	}

  sendRegisterUser = () => {

    var today = new Date();
    var dateFrom = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    var jsonToSend = {
			"User":{
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				birthDate: this.state.year + '-' + this.state.month + '-' + this.state.day,
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
      console.log(data);
      this.setState({...this.state, serverResponse: data.response, createUserError: data.isError, emailSend: data.emailSend})
    });
  };

  handleChange = (e, { name, value }) =>this.setState({ [name]: value });

  render() {
    return (
			<Container style={{ marginTop: "7em" }}>
                <Form 
                    onSubmit={this.sendRegisterUser}
                    error={this.state.createUserError}
                    success={this.state.emailSend}
                >
                {
                    this.state.createUserError ? <Message error 
                    header="Account kon niet aangemaakt worden" 
                    content={this.state.serverResponse}/>
                    :
                    null
                }
                {
                    this.state.emailSend ? <Message success 
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
                    </Form.Group>
                    <Form.Group unstackable widths={2}>
                        <Form.Input
                            required
                            size='massive'
                            label='E-mail'
                            placeholder='E-mail'
                            name='email'
                            onChange={this.handleChange}
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
                        <Form.Input
                            required
                            size='massive'
                            label='Postcode'
                            placeholder='Postcode'
                            name='zipCode'
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group unstackable widths={3}>
                        <Form.Input
                            required
                            size='massive'
                            label='Dag'
                            placeholder='Dag'
                            name='day'
                            type='number'
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            required
                            size='massive'
                            label='Maand'
                            placeholder='Maand'
                            name='month'
                            type='number'
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            required
                            size='massive'
                            label='Jaar'
                            placeholder='Jaar'
                            name='year'
                            type='number'
                            onChange={this.handleChange}
                        />
                    </Form.Group> 			
                    <Form.Button 
                    content='Submit' 
                    color='blue'
                    type='submit'
                    disabled={
                        !this.state.email
                        || !this.state.firstName
                        || !this.state.lastName
                        || !this.state.password
                        || !this.state.day
                        || !this.state.month
                        || !this.state.year
                        || !this.state.street
                        || !this.state.city
                        || !this.state.country
                        || !this.state.zipCode
                     }
                    />
                </Form>
			</ Container>
    );
  }
}