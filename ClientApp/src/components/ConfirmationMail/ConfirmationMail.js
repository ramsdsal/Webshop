import React, { Component } from "react";
import { Container, Label } from "semantic-ui-react";

export class ConfirmationMail extends Component {
  constructor(props) 
  {
	super(props);
	
	fetch("/api/user/confirmation/" + this.props.confirmationToken).then(response => response.json()).then(data => {
	  console.log(data)
	  this.setState({ ...this.state})
	});

  }

  render() {
    return (
			<Container style={{ marginTop: "7em" }}>
				<Label>Confirmation mail</Label>
			</ Container>
    );
  }
}
