import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { Container, Form, Input, TextArea, Button, Select } from 'semantic-ui-react'


export class Register extends Component
{

	constructor(props) 
  {
    super(props);
		//this.state = {movie: {}, isLoading: true};
		
		this.state = {
			firstName: "",
			lastName: "",
			birthDate: "09-04-1981",
			email: "",
			password: "",

			street: "",
			city: "",
			country: "",
			zipCode: "",
			dateFrom: "09-04-1981"
		};
	}

  sendRegisterUser = () =>
  {
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
				dateFrom: this.state.dateFrom
			},
      };
      
    const rawResponse = fetch("/api/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonToSend)
    });

	}
	
  handleChange = (e, { name, value }) => this.setState({ [name]: value }, console.log(this.state))

  render() {

    return (
			<Container style={{ marginTop: "7em" }}>
				<Form onSubmit={this.sendRegisterUser} id="myForm">
                    <Form.Group unstackable widths={2}>
                        <Form.Input
                            label='First Name *'
                            placeholder='First Name'
                            name='firstName'
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            label='Last Name *'
                            placeholder='Last Name'
                            name='lastName'
                            onChange={this.handleChange}
                        />
                    </Form.Group>               
                    <Form.Button content='Submit' />
                </Form>
			</ Container>
    );
  }
}
