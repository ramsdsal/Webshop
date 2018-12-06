import React, { Component } from "react";
import { Container, Form } from "semantic-ui-react";

export class Register extends Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD
		//this.state = {movie: {}, isLoading: true};
		
		this.state = {
			firstName: "dgdfgdfgwadwad",
			lastName: "dawfdfsfdad",
			birthDate: "09-04-1981",
			email: "dwadafesfefsgd",
      password: "dsffdsfsfdsf",
      
      //Birthday
      day: "12",
      month: "10",
      year: "2012",

			street: "dfsdf",
			city: "dwadsfsdfsdfad",
			country: "wdfsdfsdfadad",
			zipCode: "fsfs",
		};
	}
=======
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
>>>>>>> 41da53823f6c9692a536db0508cbf0031861943b

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

    console.log(jsonToSend)
      
    const rawResponse = fetch("/api/user", {
      method: "POST",
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
    return (
<<<<<<< HEAD
			<Container style={{ marginTop: "7em" }}>
				<Form onSubmit={this.sendRegisterUser} id="myForm">
                    <Form.Group unstackable widths={2}>
                        <Form.Input
                            size='massive'
                            label='Voornaam *'
                            placeholder='Voornaam'
                            name='firstName'
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            size='massive'
                            label='Achternaam *'
                            placeholder='Achternaam'
                            name='lastName'
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group unstackable widths={2}>
                        <Form.Input
                            size='massive'
                            label='E-mail *'
                            placeholder='E-mail'
                            name='email'
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            size='massive'
                            label='Wachtwoord *'
                            placeholder='Wachtwoord'
                            name='password'
                            onChange={this.handleChange}
                        />
                    </Form.Group> 			
                    {/* street: "dfsdf",
			city: "dwadsfsdfsdfad",
			country: "wdfsdfsdfadad",
      zipCode: "fsfs",                  */}
                    <Form.Group unstackable widths={2}>
                        <Form.Input
                            size='massive'
                            label='Straat *'
                            placeholder='Straat'
                            name='street'
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            size='massive'
                            label='Stad *'
                            placeholder='Stad'
                            name='city'
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            size='massive'
                            label='Land *'
                            placeholder='Land'
                            name='country'
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            size='massive'
                            label='Postcode *'
                            placeholder='Postcode'
                            name='zipCode'
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group unstackable widths={3}>
                        <Form.Input
                            size='massive'
                            label='Dag *'
                            placeholder='Dag'
                            name='day'
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            size='massive'
                            label='Maand'
                            placeholder='Maand'
                            name='month'
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            size='massive'
                            label='Jaar *'
                            placeholder='Jaar'
                            name='year'
                            onChange={this.handleChange}
                        />
                    </Form.Group> 			
                    <Form.Button content='Submit' />
                </Form>
			</ Container>
=======
      <Container style={{ marginTop: "7em" }}>
        <Form onSubmit={this.sendRegisterUser} id="myForm">
          <Form.Group unstackable widths={2}>
            <Form.Input
              label="First Name *"
              placeholder="First Name"
              name="firstName"
              onChange={this.handleChange}
            />
            <Form.Input
              label="Last Name *"
              placeholder="Last Name"
              name="lastName"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button content="Submit" />
        </Form>
      </Container>
>>>>>>> 41da53823f6c9692a536db0508cbf0031861943b
    );
  }
}
