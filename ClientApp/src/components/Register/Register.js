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
			firstName: "patrick",
			lastName: "kirtap",
			birthDate: "12-04-1981",
			email: "email hierzo",
			password: "skrrrrt",

			street: "straatnaam hierzo",
			city: "maassluis CITY",
			country: "nederlands COUNTRY",
			zipCode: "3113cp ZIPCODE",
			dateFrom: "09-04-1981"
		};

		console.log(this.state)
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
		console.log(JSON.stringify(jsonToSend))
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
                        {/* <Form.Group widths={2}>
                            <Form.Input
                                label='Brouwer'
                                placeholder='BrewerName'
                                name='brewerName'
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                label='Land van herkomst'
                                placeholder='CountryName'
                                name='countryName'
                                onChange={this.handleChange}
                            />
                        </Form.Group>

                        <Form.Group widths={2}>
                            <Form.Input
                                label='Alcohol %'
                                placeholder='AlcoholPercentage'
                                name='alcoholPercentage'
                                onChange={this.handleChange}
                                type='number'
                                step="0.05"
                                min="0.00"
                            />
                            <Form.Input
                                label='Inhoud'
                                placeholder='Content'
                                name='content'
                                onChange={this.handleChange}
                            />
                        </Form.Group>

                        <Form.Input
                            label='Website Link'
                            placeholder='Url'
                            name='url'
                            onChange={this.handleChange}
                            type='url'
                        />

                        <Form.Field
                            control={TextArea}
                            label='Omschrijving'
                            placeholder='Description'
                            name='description'
                            onChange={this.handleChange}
                        />

                        <Form.Checkbox label='Alle gegevens zijn gecontroleerd' /> */}
                        <Form.Button content='Submit' />
                    </Form>
			</ Container>
    );
  }
}
